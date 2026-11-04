# 01 · The GoHighLevel site (2024), captured

<img src="../../assets/icons/map-pin.svg" width="16" height="16" alt=""> **You are here:** `wilson-lawn-ai-assist` › [`versions/`](../README.md) › `01-gohighlevel/` · public (travels to the public twin) · a copy, not a build

## <img src="../../assets/icons/compass.svg" width="24" height="24" alt=""> TL;DR

- **What:** the original Wilson's Lawn Maintenance website, built on GoHighLevel in 2024, copied here page by page so the next site can be built from it rather than from memory.
- **Source:** <https://app.gohighlevel.com/v2/preview/4eNJavgKGMm6OpZoVw7k> (redirects to `sites.leadconnectorhq.com/preview/<id>`).
- **When:** 2026-11-04, by `scripts/capture-ghl.sh --images --scan` (a plain HTTPS fetch; the preview is server-rendered). The exact hashes are in [`CAPTURE.md`](./CAPTURE.md).
- **Read first:** `pages/<id>.txt` is each page as a visitor reads it; `pages/<id>.html` is the page exactly as served; `assets/ghl/` holds the 30 pictures.

## <img src="../../assets/icons/file-text.svg" width="24" height="24" alt=""> What was captured

| Page | id | What it is | Visible words |
|---|---|---|---|
| Home | `4eNJavgKGMm6OpZoVw7k` (also `pages/index.html`) | Hero, Who We Are, services (garden and lawn care, snow removal, firewood, tree and plant nursery), FAQ, testimonials, footer | 1,036 |
| Free consultation / newsletter | `Ov2TqKmggMorOdCs46Ab` | "Join the ... Yielding High Quality Outcomes", the newsletter and consultation-call sign-ups, footer | 78 |
| Thank you | `2jTYIxzxthn0cjcBAGil` | "Someone will be calling you in 2 minutes", back-to-home link, footer | 69 |

Each page is kept three ways: `.html` as served, `.txt` as visible text, `.meta` as the record (title, URLs, time, bytes, sha256). `images.txt` lists every picture the pages reference; `links.txt` records which sibling pages were found and fetched. The pictures in `assets/ghl/` are the originals from GoHighLevel's asset CDN (not the resized copies the pages display); one photo over 2 MB was resized to fit the house limit, nothing else was touched.

## <img src="../../assets/icons/triangle-alert.svg" width="24" height="24" alt=""> What is missing

- **The three forms.** GoHighLevel draws the forms with JavaScript after the page loads: the contact section on the home page and the two sign-ups (newsletter, consultation call) on the consultation page. The served HTML holds only their scaffolding, so field labels, placeholder text, validation and button wiring are not here. Capture them once with a browser (Claude in Chrome, or Firecrawl after its credits reset on 2026-11-12) and keep that beside this folder. Tracked in [`PENDING-TASKS.md`](../../PENDING-TASKS.md).
- **Nothing dynamic.** No chat widget state, no analytics, no GoHighLevel back end. The capture is the public face only.

## <img src="../../assets/icons/notebook-pen.svg" width="24" height="24" alt=""> For Jeff: two leftovers on the live site

Noticed while copying, so they can be fixed in GoHighLevel or simply left behind when version 03 replaces the site:

1. The consultation page still carries a template block above the footer: **"Chase HighLevel Sandbox"** with the tagline *"Your Gateway to Global Adventures Await Here."* It is from GoHighLevel's sample site, not from the business.
2. The footer's email address on every page is a **placeholder** (Cloudflare shows it as `[email protected]`); the real business email is Wilsonj84321@gmail.com.

## <img src="../../assets/icons/door-open.svg" width="24" height="24" alt=""> Where this goes next

Version 03, the merged site, takes the words and the photos from here and the structure from version 02. [`docs/MERGE-PLAN.md`](../../docs/MERGE-PLAN.md) says how; [`docs/CREATIVE-BRIEF.md`](../../docs/CREATIVE-BRIEF.md) says what it should feel like.

<sub>Every file in this folder was read by the public-lane tripwire (`scripts/scan-public-lane.sh`) before it travelled. Re-run the capture with `sh scripts/capture-ghl.sh --images --scan versions/01-gohighlevel` from the repository root; a changed sha256 in `CAPTURE.md` means the live site moved.</sub>
