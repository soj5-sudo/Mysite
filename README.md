# Soham Jariwala — founder profile

A single self-contained static site. No build step, no dependencies. Dark cinematic
theme with a particle hero, built to hand an investor a link.

## What needs your input (two small things)

1. **Instagram and X handles.** The footer has all three social icons. LinkedIn points at
   your real profile. Instagram and X are placeholders that point at the platform home pages
   until you give me the handles. Send them and I will wire the exact profiles, or edit
   `index.html` yourself: search for `data-social="x"` and `data-social="instagram"` and
   replace the `href`.
2. **Your photo (optional).** The About section has a portrait slot showing an "SJ"
   placeholder. Drop a headshot as `assets/portrait.jpg` (tall 4:5 crop, about 800 x 1000)
   and it appears automatically.

## Things I framed carefully or reconciled, correct me if needed

- **Forbes 30 Under 30** is attributed to 504 Found with your role as CXO. Confirmed correct.
- **Jewellabs Fortune 500 clients** confirmed real, so it now says so in the Jewellabs card
  and appears as a headline signal.
- **Cornell major.** Your notes had two versions. I used College of Engineering, B.S.
  Computer Science, minor in Economics (matches your concentration, minor, and coursework).
  One note said College of Agriculture and Life Sciences, Information Science. Tell me if that
  is the right one.
- **Fifth language.** One version said Urdu, another said Farsi. I used Urdu. Say the word if
  it is Farsi.
- **Interests** were trimmed to cricket, football, chess, and watches. You also listed
  cryptocurrency, casino games, diamonds, gym, and travel. Tell me which to show.
- I left off the "best resume ever, needs to be selected" line, since that is a resume-parser
  trick, not profile content.

## Run it locally

```
python3 -m http.server 4820
```

Then open http://localhost:4820, or double-click `index.html`.

## Deploy it (all free, pick one)

- **Netlify Drop** — https://app.netlify.com/drop, drag the whole `MySite` folder on. Live in
  about ten seconds.
- **Vercel** — run `npx vercel` in this folder, or drag the folder in at vercel.com/new.
- **Cloudflare Pages / GitHub Pages** — both work with these plain files.

After you have a live URL, update the domain in `index.html` (search `sohamjariwala.com`) in
the `canonical` and `og:url` tags, or tell me the URL and I will set it.

## Files

```
index.html    the page and all content
styles.css    the dark design system and layout
particles.js  the hero particle field (converge, then drift; fails open)
head.js       one line, sets a flag before paint so reveals do not flash
main.js       hero wipe reveal, scroll reveal, header state, portrait fallback
assets/
  favicon.svg            the SJ tab icon
  og.png                 the dark social-share card
  Soham-Jariwala-CV.pdf  your CV, linked from Contact
  portrait.jpg           add this yourself (optional, see above)
```

## Notes

- Book a demo points at your Cal.com 15-minute link. Phone, email, LinkedIn, and CV are in
  Contact.
- The particle hero respects reduced-motion, lets a click or key skip it, and never blocks
  content. It renders as pure decoration.
- No analytics, no cookies, no forms. Nothing about a visitor is collected, so no cookie
  banner or privacy policy is required as-is.
