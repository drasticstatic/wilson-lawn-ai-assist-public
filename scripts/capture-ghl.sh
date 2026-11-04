#!/bin/sh
# capture-ghl.sh — copy the GoHighLevel site build (the original Wilson's Lawn Maintenance site) into a folder,
# with no Firecrawl and no browser: the preview is server-rendered, so a plain fetch carries the whole page.
#
#     sh scripts/capture-ghl.sh [--images] [--scan] [--start URL] <output-directory>
#
#   <output-directory>  where the capture lands. It is created if missing. Nothing in this repository is touched:
#                       where the capture lives (private, public, or gitignored) is Christopher's call, so the
#                       default is to point this somewhere outside the tree and move it in afterwards.
#   --images            also download every picture the pages reference (originals from the asset CDN, not the
#                       resized webp copies), into <output-directory>/assets/ghl/. Without it only a manifest of
#                       picture URLs is written.
#   --scan              after the capture, run the public-lane tripwire (scripts/scan-public-lane.sh) over the
#                       output, so a refusal is known before anything is committed. Pictures pass only because the
#                       media list passed with --media names assets/ghl; a folder named assets/ passes anyway.
#   --start URL         the first page (default: the GoHighLevel preview link in README.md).
#
# What it writes:
#   pages/<id>.html      the page exactly as served (the first page is also pages/index.html)
#   pages/<id>.txt       its visible text (scripts and styles removed), one paragraph per block
#   pages/<id>.meta      title, final URL, fetch time, byte count, sha256 of the html
#   images.txt           every picture the pages reference, deduplicated, one URL per line
#   links.txt            every sibling preview page found and whether it was fetched
#   CAPTURE.md           an index a person can read: when, from where, which pages, which pictures, the hashes
#
# Pages are discovered by following /preview/<id> links from the start page, one hop at a time, until no new id
# appears (the site is small: a home page, a contact page and a thank-you page as of 2026-11-04). Nothing else is
# followed: no external links, no scripts, no CDN beyond pictures when --images is given.
#
# Why no Firecrawl: the fleet's Firecrawl plan was at 0 credits on 2026-11-04 (resets 2026-11-12). The probe that
# day showed the preview answers a plain HTTPS GET with the full server-rendered HTML (1052 visible words, every
# heading, 133 picture references), so a crawler is not needed for the text. If GoHighLevel later moves the preview
# behind a JavaScript shell, the .txt files will come back nearly empty and the browser route (Claude in Chrome, or
# Firecrawl once credits return) is the fallback; CAPTURE.md records the visible word count so that is visible at once.
#
# Needs: curl, python3 (standard library only), sha256sum or shasum. POSIX sh.

set -eu

START="https://app.gohighlevel.com/v2/preview/4eNJavgKGMm6OpZoVw7k"
IMAGES=0; SCAN=0; OUT=""
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) wilson-lawn-ai-assist capture-ghl.sh"

usage() { sed -n '2,28p' "$0" | sed 's/^# \{0,1\}//'; exit "${1:-0}"; }

while [ $# -gt 0 ]; do
  case "$1" in
    --images) IMAGES=1 ;;
    --scan) SCAN=1 ;;
    --start) START="$2"; shift ;;
    -h|--help) usage 0 ;;
    -*) echo "✗ unknown option: $1" >&2; usage 2 ;;
    *) OUT="$1" ;;
  esac
  shift
done
[ -n "$OUT" ] || { echo "✗ an output directory is required" >&2; usage 2; }
command -v curl >/dev/null || { echo "✗ curl not found" >&2; exit 2; }
command -v python3 >/dev/null || { echo "✗ python3 not found" >&2; exit 2; }
if command -v sha256sum >/dev/null; then SHA="sha256sum"; else SHA="shasum -a 256"; fi

HERE=$(cd "$(dirname "$0")" && pwd)
mkdir -p "$OUT/pages"
OUT=$(cd "$OUT" && pwd)
NOW=$(date -u +%Y-%m-%dT%H:%M:%SZ)

# The preview redirects app.gohighlevel.com/v2/preview/<id> -> sites.leadconnectorhq.com/preview/<id>; sibling
# links inside the HTML are relative (/preview/<id>), so they resolve against the final host.
BASE="https://sites.leadconnectorhq.com"

fetch_page() {  # $1 = id, $2 = url
  id=$1; url=$2
  html="$OUT/pages/$id.html"
  final=$(curl -sSL -m 60 -A "$UA" -o "$html" -w '%{url_effective}' "$url") || { echo "  ✗ fetch failed: $url" >&2; return 1; }
  bytes=$(wc -c < "$html" | tr -d ' ')
  sum=$($SHA "$html" | awk '{print $1}')
  python3 -I - "$html" "$OUT/pages/$id.txt" <<'PY'
import re, sys, html
src, dst = sys.argv[1], sys.argv[2]
s = open(src, encoding='utf-8', errors='replace').read()
s = re.sub(r'<(script|style|noscript|svg)[^>]*>.*?</\1>', ' ', s, flags=re.S | re.I)
s = re.sub(r'<(br|/p|/div|/h[1-6]|/li|/section|/tr)[^>]*>', '\n', s, flags=re.I)
t = html.unescape(re.sub(r'<[^>]+>', ' ', s))
lines = [re.sub(r'[ \t]+', ' ', l).strip() for l in t.splitlines()]
out = []
for l in lines:
    if l and (not out or out[-1] != l):
        out.append(l)
open(dst, 'w', encoding='utf-8').write('\n'.join(out) + '\n')
PY
  title=$(python3 -I -c 'import re,sys,html; s=open(sys.argv[1],encoding="utf-8",errors="replace").read(); m=re.search(r"<title[^>]*>(.*?)</title>",s,re.S|re.I); print(html.unescape(m.group(1)).strip() if m else "")' "$html")
  words=$(wc -w < "$OUT/pages/$id.txt" | tr -d ' ')
  printf 'id: %s\ntitle: %s\nrequested: %s\nfinal: %s\nfetched: %s\nbytes: %s\nvisible-words: %s\nsha256: %s\n' \
    "$id" "$title" "$url" "$final" "$NOW" "$bytes" "$words" "$sum" > "$OUT/pages/$id.meta"
  echo "  ✓ $id — \"$title\" — $bytes bytes, $words visible words"
}

echo "capture-ghl: $START -> $OUT"
start_id=$(printf '%s' "$START" | sed 's|.*/preview/||; s|[?#].*||')
: > "$OUT/links.txt"
queue="$start_id"; done_ids=""
while [ -n "$queue" ]; do
  id=${queue%% *}; rest=${queue#"$id"}; queue=${rest# }
  case " $done_ids " in *" $id "*) continue ;; esac
  if [ "$id" = "$start_id" ]; then url=$START; else url="$BASE/preview/$id"; fi
  if fetch_page "$id" "$url"; then
    echo "$id fetched $url" >> "$OUT/links.txt"
  else
    echo "$id FAILED $url" >> "$OUT/links.txt"
    done_ids="$done_ids $id"; continue
  fi
  done_ids="$done_ids $id"
  for n in $(grep -oE 'href="/preview/[A-Za-z0-9_-]+' "$OUT/pages/$id.html" | sed 's|.*/preview/||' | sort -u); do
    case " $done_ids $queue " in *" $n "*) ;; *) queue="$queue $n" ;; esac
  done
  queue=$(printf '%s' "$queue" | sed 's/^ *//')
done
cp "$OUT/pages/$start_id.html" "$OUT/pages/index.html"

# Pictures: the pages reference resized copies through images.leadconnectorhq.com/.../u_<original>; keep the originals.
cat "$OUT"/pages/*.html \
  | grep -oE 'https://[A-Za-z0-9./_-]*filesafe\.space/[A-Za-z0-9./_-]+\.(jpe?g|png|gif|webp|svg)' \
  | sort -u > "$OUT/images.txt"
echo "  pictures referenced: $(wc -l < "$OUT/images.txt" | tr -d ' ') (images.txt)"

if [ "$IMAGES" = 1 ]; then
  mkdir -p "$OUT/assets/ghl"
  n=0
  while IFS= read -r u; do
    [ -n "$u" ] || continue
    f="$OUT/assets/ghl/$(basename "$u")"
    [ -s "$f" ] || curl -sSL -m 60 -A "$UA" -o "$f" "$u" || echo "  ✗ picture failed: $u" >&2
    n=$((n + 1))
  done < "$OUT/images.txt"
  echo "  pictures downloaded: $n -> assets/ghl/"
fi

{
  echo "# GoHighLevel capture — Wilson's Lawn Maintenance"
  echo
  echo "Captured $NOW by \`scripts/capture-ghl.sh\` from <$START> (a plain HTTPS fetch; the preview is server-rendered)."
  echo "Pages are discovered by following \`/preview/<id>\` links from the first page. Nothing else is followed."
  echo
  echo "## Pages"
  echo
  echo "| id | title | visible words | bytes | sha256 |"
  echo "|----|-------|---------------|-------|--------|"
  for m in "$OUT"/pages/*.meta; do
    awk -F': ' '{a[$1]=$2} END {printf "| `%s` | %s | %s | %s | `%s` |\n", a["id"], a["title"], a["visible-words"], a["bytes"], a["sha256"]}' "$m"
  done
  echo
  echo "Each page is kept three ways: \`pages/<id>.html\` as served, \`pages/<id>.txt\` as visible text, \`pages/<id>.meta\` as the record."
  echo
  echo "## Pictures"
  echo
  echo "$(wc -l < "$OUT/images.txt" | tr -d ' ') pictures referenced (\`images.txt\`)."
  if [ "$IMAGES" = 1 ]; then echo "Downloaded into \`assets/ghl/\`."; else echo "Not downloaded (run with \`--images\`)."; fi
  echo
  echo "## Reading it"
  echo
  echo "A low visible-word count on a page means GoHighLevel served a JavaScript shell rather than the page: fall back to a browser capture."
  echo "The public-lane tripwire (\`scripts/scan-public-lane.sh\`) reads every file here before any of it may travel to the public twin."
} > "$OUT/CAPTURE.md"
echo "  index: $OUT/CAPTURE.md"

if [ "$SCAN" = 1 ]; then
  media=$(mktemp "${TMPDIR:-/tmp}/ghl-media.XXXXXX")
  printf 'approved by capture-ghl.sh (scan only; the lane keeps its own list) | %s\nassets/ghl\n' "$(date +%Y-%m-%d)" > "$media"
  echo "  tripwire: scripts/scan-public-lane.sh --media <assets/ghl> $OUT"
  sh "$HERE/scan-public-lane.sh" --media "$media" "$OUT" || echo "  ✗ the tripwire refused something above; it stays out of the public twin until read or fixed"
  rm -f "$media"
fi
