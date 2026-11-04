# Merge plan: how 01 and 02 fold into 03

<img src="../assets/icons/map-pin.svg" width="16" height="16" alt=""> **You are here:** `wilson-lawn-ai-assist` › `docs/` › `MERGE-PLAN.md` · public · the brief is [`CREATIVE-BRIEF.md`](./CREATIVE-BRIEF.md); the renditions are [`versions/`](../versions/README.md)

## <img src="../assets/icons/compass.svg" width="24" height="24" alt=""> TL;DR

Version 03 is a **Next.js static export on the fleet's boilerplate**, the shape [`taylordwraps-nextjs-preview`](https://github.com/drasticstatic/taylordwraps-nextjs-preview) (source: the private `taylordwraps/carport`) already runs: Next 16 app router, React 19, Tailwind 4, TypeScript, `output: "export"` to `out/`, a base-path helper for GitHub Pages, a build-time tripwire, Playwright smoke tests. **01 supplies the content, 02 supplies the structure, the boilerplate supplies the engine.**

## <img src="../assets/icons/git-merge.svg" width="24" height="24" alt=""> What comes from where

| Layer | From | How it travels |
|---|---|---|
| Words: services, FAQ, taglines, footer | **01** (`versions/01-gohighlevel/pages/*.txt`) | Into `src/data/*.ts` (services, faq, business) as typed records; one file per concern, as the Carport keeps `films.ts`, `levels.ts`, `eras.ts` |
| Photographs | **01** (`versions/01-gohighlevel/assets/ghl/`) | Copied to `public/photos/` with readable names and real `alt` text; the Carport's `scripts/check-assets.mjs` pattern refuses a build that references a picture that is not there |
| Pages and navigation | **02** (`src/pages/*.tsx`, `src/components/Navigation.tsx`, `Footer.tsx`) | Home, Services, About, Contact, Quote become `src/app/<route>/page.tsx`; the quote form's fields are the spec for the booking flow |
| AI assistant and voice agent | **02** (`ChatWidget.tsx`, `VoiceAgent.tsx`, `@11labs/react`) | Kept behind a feature flag; rewired so the only outcome is a quote request handed to Jeff (see the brief). Keys stay out of the repository; a static site calls a hosted endpoint or nothing |
| Real contact block | **02** (`src/components/WelcomeModal.tsx`) | Becomes `src/data/business.ts`, the one source for phone, email, address and the Facebook page everywhere on the site |
| Engine, theming, a11y, i18n scaffold, tripwire, smoke tests | **the Carport boilerplate** | Copied, not forked: `next.config.ts`, `src/lib/basePath.ts`, `src/lib/headScript.ts` (theme before first paint), `src/lib/useFocusTrap.ts`, `scripts/tripwire.mjs`, `playwright.config.ts` |

## <img src="../assets/icons/layers.svg" width="24" height="24" alt=""> Order of work

1. **Freeze 02.** `npm run build` of this app, the `dist/` copied into `versions/02-lovable/` with a `README.md` (date, commit, what it was). The source stays in history; nothing is deleted.
2. **Scaffold 03** in `versions/03-merged/` from the Carport's shape (`package.json` scripts, `next.config.ts`, `src/app/layout.tsx`, `globals.css`, `lib/`). Strip what is the wrap shop's (three.js, the visualizer, the lab) and keep what is everyone's.
3. **Pour in 01's content** as data files, with the two leftovers corrected (no sandbox block, the real email).
4. **Rebuild 02's pages** on top of that data. The welcome modal goes away: the site is live, so the real contact is in the footer.
5. **The special pieces**, one at a time and each optional: season-aware hero, the booking assistant, the crypto line or photo hash, Spanish.
6. **Publish** through the public twin as now (`sync-public.yml`), with the deploy workflow building `out/` instead of `dist/`. The public-lane tripwire reads every file first; pictures live under `public/` or a folder in `PUBLIC-LANE-MEDIA.txt`.
7. **Point the domain.** Jeff's call, Jeff's registrar, written as a "! " block for him when the time comes.

## <img src="../assets/icons/triangle-alert.svg" width="24" height="24" alt=""> Decisions still open

- Does the AI assistant survive at all in a static site, or does a plain form that emails Jeff do the whole job?
- Where the three JavaScript-drawn forms of 01 are captured (browser pass, after 2026-11-12 for Firecrawl) and whether their fields change the booking flow.
- Whether 03 lives in `versions/03-merged/` of this repository or in a sibling repository that this one points to. The Carport is a folder inside `taylordwraps/`; the same shape fits here.

<sub>Suggest a change: open an issue or a pull request against `main`. Christopher reads them and a person with the role merges.</sub>
