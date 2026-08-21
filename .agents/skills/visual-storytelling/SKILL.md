---
name: visual-storytelling
description: Design distinctive, conversion-oriented landing pages by grounding visual identity, composition, imagery, and motion in a specific audience and domain. Use when building or redesigning landing pages, marketing sites, hero sections, product launches, or other public-facing web experiences that must avoid generic AI-generated UI.
---

# Visual Storytelling

Create a coherent visual story, not a collection of polished components. Domain fit takes precedence over any particular aesthetic.

## Workflow

### 1. Anchor the domain

Before proposing layout or styling, establish:

- Target audience and the outcome they want
- Industry objects, environments, rituals, and visual references they recognize
- Available brand assets, photography, product media, and proof
- Desired mood and any aesthetics that would undermine trust

If these are unclear, inspect the project first and ask only for unresolved essentials. Never default to generic SaaS dashboards, abstract gradients, floating cards, or decorative code snippets.

### 2. Write the visual thesis

State one sentence connecting audience, outcome, imagery, and mood. Use it to reject elements that look attractive but do not belong.

Write an outcome-led heading for the specific persona. Prefer real product, customer, environment, process, or industry imagery over abstract decoration. Do not fabricate customers, metrics, testimonials, or product capabilities.

### 3. Build the identity from the anchor

Choose a hero image or equivalent visual anchor first. Derive background, surface, text, and accent colors from its lighting and dominant tones. Dark, earthy, warm, or textured treatments are options only when the source material supports them.

Pair an expressive display face, often an editorial serif, with a readable sans-serif for body and UI text. Use grain, image overlays, or tactile texture sparingly to create depth without reducing legibility or performance.

### 4. Compose before coding

Create a compact section wireframe by combining only the patterns needed for the conversion story. See [REFERENCE.md](REFERENCE.md) for pattern options.

- Give the primary message a protected safety margin
- Put large atmospheric visuals behind smaller contextual details
- Keep heading-to-CTA spacing roughly twice heading-to-supporting-copy spacing
- Prefer dominant media and concise copy over grids of bordered feature cards
- Vary section rhythm while preserving one visual system

### 5. Add purposeful motion

Use motion to direct focus, show relationships, or soften transitions. Prefer subtle media scaling, staged reveals, and restrained parallax or blur. Never add motion solely to make the page feel expensive.

Autoplay must pause on interaction or when not visible, expose controls when content changes meaningfully, and avoid blocking comprehension. Respect `prefers-reduced-motion` with a complete static experience.

### 6. Implement and verify

Match the project's framework and design-system conventions. Reuse genuine assets and established tokens when they support the visual thesis; do not overwrite brand identity to satisfy this skill.

Verify desktop and mobile layouts, keyboard use, focus visibility, semantic structure, image alt text, contrast, loading behavior, and reduced motion. Visually inspect the running page when browser tooling is available.

## Output Standard

Before finishing, confirm:

- A visitor can identify the audience, product outcome, and primary action immediately
- Imagery provides domain proof rather than generic decoration
- Typography, palette, texture, and motion tell the same visual story
- The page does not repeat one card treatment or section layout throughout
- Every claim and proof point is supported by supplied content

Detailed patterns, source notes, and review criteria are in [REFERENCE.md](REFERENCE.md).
