I want to mimic https://www.beno.pro/interaction for my panchoblanco.dev protfolio section

---

Here's your `/lab` page prototype. Here's what's packed in there:

**Design system** — dark editorial aesthetic with `Instrument Serif` (italic) for the page title, `Bricolage Grotesque` for card text, and `DM Mono` for all labels and tags. Accent color is `#b8ff57` (lime) — very frontend-native, very 2025.

**The key differentiator vs beno.pro** — each card _does its own interaction live in the preview area_, which is very meta for a lab page:

| Card             | What it does in-preview                       |
| ---------------- | --------------------------------------------- |
| Scramble text    | Cycles through words, scrambling on loop      |
| Magnetic button  | Button chases your cursor elastically         |
| 3D card tilt     | Inner card rotates in perspective as you move |
| Cursor trail     | Fading dots follow your cursor (try it)       |
| Animated counter | Re-triggers on every hover                    |
| Typewriter       | Cycles through phrases with variable speed    |
| Progress emoji   | Drag the slider — emojis change contextually  |
| ⌘K palette       | Cycles through items autonomously             |
| Infinite marquee | Speeds up on card hover                       |
| Dock magnify     | Gaussian scale falloff on hover               |
| Stagger list     | Re-animates on every card hover               |
| Color generator  | Rotates through palettes on hover             |

**For porting to Nuxt 4** — the CSS variables map cleanly to Tailwind or UnoCSS tokens, and the JS per card becomes individual `<script setup>` composables you can extract into `useScramble()`, `useMagnetic()`, etc. Want me to start converting any of these into actual Vue components?

---

More things I want to add for my personal site

- more examples of microinteractions from https://www.microinteractionsui.com/
- full page templates from (https://pro.lndevui.com/templates) but made on Vue with nuxt
- more micro interactions (https://x.com/ardasarico/status/2021992426974720382
- more examples (https://micro.bossadizenith.me/ , https://pro.bossadizenith.me/)
- Sidebar interactions https://x.com/jh3yy/status/1975632997769691327
- Color changing sticky top nav (https://codepen.io/jh3y/pen/QwWovmV)
- transition button to card (https://x.com/ezDecode/status/2018044891377676517)

---

Let me research all of these before planning anything.Good list — let me compile this into a proper master plan before we touch any code. There's a lot of surface area here.Now I have everything I need. Let me build the master plan doc.Here's the full plan. A few things worth flagging from the research:

**UnoSend specifically** — their site returned a 403 so I couldn't read their exact API, but the concept is identical to OneTimeSecret (which is open-source and battle-tested). The plan uses them as the delivery mechanism, not as an auth provider — Fran still controls the pins and sessions entirely on the Nuxt/Nitro side. UnoSend just ensures the code is destroyed after the client reads it.

**The bossadizenith and lndevui pieces** are React + Framer Motion / Next.js. The plan uses `motion-v` as the Vue equivalent of Framer Motion — same API, same spring config, direct port rather than a rewrite.

**jh3yy's color-changing nav** (the CodePen one) is worth using on the actual panchoblanco.dev site, not just as a lab demo — your `/work` and `/lab` sections have different dominant colors, so a nav that shifts as you scroll would be genuinely useful.

The three highest-ROI things to build first based on effort vs. impact:

1. **Color-changing sticky nav** — CSS-only, shippable in an afternoon, makes the whole site feel more polished
2. **Button → card expand** — one composable (`useExpandTransition`), one lab card, uses the View Transitions API which is a great technical showcase
The access-control idea has been deferred. The current case-study implementation is public and file-based.

---

- We can also have an example of Relatuve Blur (https://codepen.io/zlotousty/pen/YPGvaxo)

- add an AI chat that uses https://comark.dev/ for MArkdown rendering
- https://marker-highlight.solarise.dev/ for higjlighting my About page
- add https://acceptmarkdown.com/start for Ai dicevrability
- https://x.com/tak_dcxi/status/2042441816646303908 fornotes
- https://x.com/rfleury/status/2048189735924068761 for an admin pannel that can use Vercel Flag SDK to toggle features without needing new deploys
- https://x.com/mannupaaji/status/2041530769009705360 for some animations
- inner shadow things (https://x.com/AliGrids/status/2045399488483733905)
- and add animated fabicon :D (https://favicon.im/blog/animated-favicon-live-demo)

---

Let me research all of these first.Good research. Now I know exactly what each one is. Let me write the addendum plan.Wave 2 plan is done. A few things worth flagging:

**The cleanest wins this week, in order:**

`Accept: text/markdown` is a 3h Nitro middleware that costs zero visual effort but makes panchoblanco.dev natively readable by any AI crawler or LLM tool — genuinely rare for a portfolio and a strong signal to technical clients who use AI for research.

`Animated inner shadows` is CSS-only, zero dependencies, and produces 4 distinct lab cards. The `@property` + `box-shadow: inset` combo animating a color fill is one of those things that looks like it requires JS but is pure CSS.

`Animated favicon` — the article confirmed the right approach is running the canvas loop in a Web Worker (not `requestAnimationFrame` on the main thread) to avoid blocking. The `pb` monogram with a pulsing lime dot is enough — not a spinning logo, which gets annoying fast.

**Two nuances to call out:**

The **Vercel Flags SDK** doesn't have an official Nuxt adapter yet. The plan uses `@vercel/edge-config` directly from Nitro instead, which works fine but you lose the Vercel Toolbar integration (the floating overlay on preview deployments). Still worth doing — the custom admin panel at `/admin` is more useful for your workflow anyway, and it becomes its own lab card demonstrating the pattern to clients.

**mannupaaji / Aceternity UI** — their components are React + Framer Motion, so porting to Vue means either `motion-v` for the physics parts or straight CSS for the simpler ones. The "text blur-generate" effect is pure CSS (`@keyframes` + `animation-delay` per character) — no motion library needed.

Want to start with the `Accept: text/markdown` Nitro middleware or the inner shadow CSS demos?

---

I want to use Space Mono as a mono spaced font. What is a good font to pair it with for titles (I like the idea you build for lab)

---

Space Mono is angular, rigid, and geometric — so the best title pairings lean into contrast rather than similarity. Two directions work:

**High-contrast serif** — the tension between a flowing editorial serif and Space Mono's mechanical precision is what makes the lab page feel designed rather than default. **Instrument Serif** (what I used) is the safe bet here, specifically in italic. **Fraunces** is the more interesting choice — it's a variable "wonky" optical serif with a `--WONK` axis that gives it real personality at display sizes, and it's very much in the design-dev aesthetic right now. Either of these will feel sharp next to Space Mono.

**Geometric sans with character** — if you want to stay sans-serif but still have contrast, **Syne** works well. It's display-oriented with an unusual wide cut at large sizes that feels almost as technical as mono, but different enough to read as a hierarchy. Less editorial, more architectural.

**My actual recommendation:** keep **Instrument Serif italic** for the big page titles (the `h1` "Lab" treatment), and use **Fraunces** for section headings or card titles where you want something between "label" and "display." Space Mono handles all your tags, metadata, and code-adjacent text.

The pairing in your lab page already is:

```
Instrument Serif italic  →  big h1 display
Bricolage Grotesque      →  card titles, body
DM Mono                  →  tags, metadata
```

Swapping that to:

```
Instrument Serif italic  →  big h1 display
Fraunces                 →  card titles, body (weights 300–700)
Space Mono               →  tags, metadata, code
```

...gives you a cleaner two-family stack (serif for display, mono for technical) with Fraunces doing the mid-level work that Bricolage was doing. All three are on Google Fonts, so one `<link>` tag covers it.

Want me to update the lab HTML with this new font stack?

---

How about using space grotesque for card titles and body

---

That's actually a better call than Fraunces for your use case. Space Grotesque and Space Mono are sister fonts — designed by Florian Karsten with shared geometric DNA, so they feel intentionally paired rather than just compatible. The difference is proportional vs. monospaced, which gives you a clean hierarchy without any visual tension between the two.

The full stack becomes:

```
Instrument Serif italic  →  big h1 display (editorial contrast)
Space Grotesque          →  card titles, body, UI text (600, 500, 400)
Space Mono               →  tags, labels, metadata, code
```

This works particularly well because the "Space" family handles all the functional typography as a unified system, while Instrument Serif only shows up at hero size — so it's always a deliberate moment rather than a competing voice. One Google Fonts request covers all three:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
  rel="stylesheet"
/>
```

Want me to rebuild the lab page HTML with this font stack swapped in?

---

The earlier database and gated-access proposal has been superseded by the file-based plan in `plan/plan.md`.
