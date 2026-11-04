# versions/ — the three renditions of the Wilson's Lawn Maintenance site

<img src="../assets/icons/map-pin.svg" width="16" height="16" alt=""> **You are here:** `wilson-lawn-ai-assist` › `versions/` · public (travels to the public twin) · `main` is the working branch

## <img src="../assets/icons/compass.svg" width="24" height="24" alt=""> TL;DR

The business has had one website and is getting a second one built from two drafts. This folder keeps each rendition where it can be read, compared and borrowed from, so nothing that was once good is lost on the way to the merged site.

| # | Rendition | Where it lives | State |
|---|---|---|---|
| **01** | **The GoHighLevel concept (2024)**: the original site, server-rendered by GoHighLevel, with the business's real words, photos and footer | [`01-gohighlevel/`](./01-gohighlevel/README.md) | **Captured** 2026-11-04 as served: three pages, 30 pictures, hashes recorded. The three JavaScript-drawn forms are still to be captured with a browser |
| **02** | **The Lovable rendition**: this repository's Vite + React + shadcn app (`src/`), built on Lovable in 2026; the AI chat and voice-agent prototype, the quote form, the service pages | the repository root (`src/`, `index.html`, `public/`) | **Live as source.** When 03 replaces it, `npm run build` freezes it as a static build into `02-lovable/` and the source stays in history |
| **03** | **The merged site**: 01's words and photos folded into 02's structure, rebuilt on Next.js on the fleet's boilerplate (the shape `taylordwraps-nextjs-preview` uses) | `03-merged/` (not yet) | **Next.** [`docs/MERGE-PLAN.md`](../docs/MERGE-PLAN.md) is the how; [`docs/CREATIVE-BRIEF.md`](../docs/CREATIVE-BRIEF.md) is the why |

## <img src="../assets/icons/history.svg" width="24" height="24" alt=""> Why keep all three

- **01 is the business's voice.** Jeff's services, his FAQ answers, his photographs. A rebuild that loses them is a different business's site.
- **02 is the experiment.** It proved the AI assistant and the voice agent, and it wears placeholder contact details on purpose (see the welcome modal in the app for the real ones). It is a prototype, not a replacement for 01.
- **03 is both at once,** and it can only be judged against the two it came from.

## <img src="../assets/icons/layers.svg" width="24" height="24" alt=""> House rules for this folder

- Nothing in `versions/` is deleted; a rendition is superseded, never removed (`git mv` if it must move).
- Every file here travels to the public twin, so the public-lane tripwire reads it first. Pictures live under an `assets/` folder or a folder named in `PUBLIC-LANE-MEDIA.txt`.
- A rendition's `README.md` names its source, its date, what it holds and what it lacks.

<sub>Suggest a change: open an issue or a pull request against `main`; Christopher reads them and a person with the role merges.</sub>
