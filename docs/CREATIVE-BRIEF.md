# Creative brief: the Wilson's Lawn Maintenance site (version 03)

<img src="../assets/icons/map-pin.svg" width="16" height="16" alt=""> **You are here:** `wilson-lawn-ai-assist` › `docs/` › `CREATIVE-BRIEF.md` · public · short on purpose; the plan is [`MERGE-PLAN.md`](./MERGE-PLAN.md)

## <img src="../assets/icons/compass.svg" width="24" height="24" alt=""> TL;DR

A one-man lawn and landscape business in southern Pennsylvania needs a website that gets the phone to ring. The site should feel like Jeff's truck pulling up on time: plain, capable, local, no gloss. Everything on it must be true.

## The business

- **Who:** Jeffrey Wilson, owner of Wilson's Lawn Maintenance. Phone (717) 825-8432, Wilsonj84321@gmail.com, [the Facebook page](https://www.facebook.com/WilsonslawnmaintenancePA/). Based in Glen Rock, PA 17327 (the full address is in the app's welcome modal, `src/components/WelcomeModal.tsx`).
- **The trade** (as his 2024 site lists it, [`versions/01-gohighlevel/`](../versions/01-gohighlevel/README.md)): garden and lawn care (mowing, edging, planting, fertilizing, seasonal clean-ups), landscape design and upkeep, irrigation, hardscaping, snow removal, firewood, and a tree and plant nursery. Tagline he already uses: *"Consistent service yielding high quality outcomes."*
- **The region:** Glen Rock and the hills of southern York County, Pennsylvania, near the Maryland line. Four real seasons, so the work is seasonal: mowing and beds in spring and summer, clean-ups and firewood in autumn, snow in winter. The site should know what month it is.

## The material

- **His photographs.** Thirty pictures came over with the 2024 capture (`versions/01-gohighlevel/assets/ghl/`): real lawns, real beds, real work. Use them before any stock image, and ask Jeff for more phone photos; a before-and-after pair of a real yard beats a rendered hero every time.
- **His words.** The service descriptions and the FAQ answers on the 2024 site are the business's voice. Tidy them; do not replace them.
- **The prototype's machinery** (version 02, this repository): an AI chat assistant, a voice agent, a quote request form, service pages. Keep what helps a customer book a job; drop what only impressed a developer.

## What the fleet has freedom to make special

The brief leaves room for one or two things no template lawn-care site has, so long as each one is honest and costs Jeff nothing to maintain:

1. **A season-aware front page.** The hero and the first call to action change with the calendar (mowing in May, leaf clean-up in October, snow in January, firewood when it is cold). One data file, no back end.
2. **An assistant that books, not chats.** The AI assistant's only job is to collect the four things Jeff needs to quote (address, yard size, which service, when) and hand them to him by email or text. No small talk, no promises on price.
3. **A quiet nod to crypto.** Jeff is interested in it, and the fleet builds in Web3. The right touch is small and optional: a "we also accept crypto" line on the payment page if and when Jeff wants one, or a photo-provenance hash on his before-and-after pictures in the manner of the Carport's Wrap Origin certificates. Nothing custodial, nothing speculative, nothing a customer has to understand to hire him.
4. **Bilingual when it is wanted.** The Carport boilerplate carries English and Spanish; switch it on only if Jeff's customers need it.

## What it must not do

- Invent reviews, service areas, licences or guarantees. The 2024 site's testimonial block is build-time filler; version 03 uses real customer words or none.
- Collect payments or hold data. The site ends in a phone call, a text or an email.
- Carry anything about Jeff beyond the business facts above.

<sub>Suggest a change: open an issue or a pull request against `main`. Christopher reads them and a person with the role merges.</sub>
