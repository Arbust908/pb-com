# Visual Storytelling Reference

Use this reference after establishing the page's audience, outcome, and visual thesis. These patterns are options, not a mandatory page template.

## Composition Patterns

| Section | Pattern | Purpose |
| --- | --- | --- |
| Hero | Central message protected by whitespace, with contextual objects or media around the perimeter | Establish the domain without obscuring the proposition |
| Social proof | Restrained logo ribbon or concise proof line | Build credibility early without dominating the story |
| How it works | Large contextual media with minimal step copy | Show the product inside a recognizable workflow |
| Features | Dominant image with interactive colored tabs | Replace repetitive feature cards and reduce copy |
| Testimonials | Typographic quotes with minimal borders | Keep attention on credible customer language |
| CTA and footer | Bold, left-aligned proposition over contrasting contextual imagery | End with a clear, high-contrast decision point |

Do not include a section unless it advances the visitor from recognition to trust to action. Adapt patterns to the content instead of inventing content to fill a pattern.

## Layout Physics

### Safety margin

Treat the hero message as a protected region. Floating objects, screenshots, badges, and decorative media must not cross it at supported viewport sizes. Remove peripheral elements on small screens when preserving them would weaken the message.

### Depth hierarchy

Use scale and contrast to communicate layers:

1. Atmospheric image, color field, or texture establishes environment.
2. Product or contextual media carries the narrative.
3. Small objects, labels, or controls provide detail.
4. Primary copy and action remain legible above the composition.

### Spacing hierarchy

The gap from supporting copy to the primary action should generally be about twice the gap from heading to supporting copy. Treat this as an optical hierarchy check, not rigid pixel arithmetic.

## Identity Guidance

### Imagery

- Prefer supplied or licensed photography, product captures, process visuals, and recognizable industry objects.
- Avoid unrelated stock imagery, fake interfaces, and abstract art presented as product proof.
- Crop for the story's focal point and provide meaningful alt text when the image conveys content.
- Reserve empty image regions for copy rather than covering important subjects.

### Color and texture

- Sample ambient neutrals and secondary colors from the anchor visual.
- Select accents for contrast and brand meaning, not novelty.
- Use fine grain or atmospheric overlays to break flat planes only when they fit the medium.
- Verify contrast after all blending, overlays, and image treatments are applied.

### Typography

- Use a high-personality display face where it reinforces the domain's tactile or editorial character.
- Pair it with a highly readable sans-serif for body, navigation, controls, and metadata.
- Avoid adding a second family when the existing brand type system already provides sufficient contrast.

## Motion Guidance

- Section transitions may slide, soften, or blur outgoing material while introducing the next visual layer.
- Automatically rotating media must not move so quickly that users cannot read it; pause on hover, focus, interaction, and when offscreen.
- Scale interactive media internally by approximately `1.03` to `1.05` on hover when it communicates clickability.
- Keep text stable enough to read and avoid scroll-jacking.
- Under `prefers-reduced-motion: reduce`, remove parallax, blur travel, automatic rotation, and nonessential transforms.

## Visual Review

- Squint test: one focal point dominates each viewport.
- Five-second test: audience, outcome, and next action are evident.
- Authenticity test: visuals could not be swapped into an unrelated SaaS page unchanged.
- Repetition test: sections do not all use the same card grid, alignment, or surface treatment.
- Proof test: visuals and claims reflect real supplied material.
- Mobile test: peripheral composition simplifies without losing meaning.
- Accessibility test: keyboard, focus, contrast, semantics, alternatives, controls, and reduced motion work.

## Source Notes

Adapted from Kole Jain's video, ["The one thing vibe coding CAN'T fix about your website"](https://www.youtube.com/watch?v=RCneB_MQ7qs):

- Generic AI layouts and domain-specific imagery: [01:00](https://www.youtube.com/watch?v=RCneB_MQ7qs&t=60), [01:10](https://www.youtube.com/watch?v=RCneB_MQ7qs&t=70), [01:24](https://www.youtube.com/watch?v=RCneB_MQ7qs&t=84)
- Image-derived color, texture, and typography: [01:53](https://www.youtube.com/watch?v=RCneB_MQ7qs&t=113), [02:03](https://www.youtube.com/watch?v=RCneB_MQ7qs&t=123), [02:35](https://www.youtube.com/watch?v=RCneB_MQ7qs&t=155), [02:56](https://www.youtube.com/watch?v=RCneB_MQ7qs&t=176)
- Composite wireframing and section patterns: [03:14](https://www.youtube.com/watch?v=RCneB_MQ7qs&t=194), [03:20](https://www.youtube.com/watch?v=RCneB_MQ7qs&t=200), [03:32](https://www.youtube.com/watch?v=RCneB_MQ7qs&t=212), [03:45](https://www.youtube.com/watch?v=RCneB_MQ7qs&t=225), [04:05](https://www.youtube.com/watch?v=RCneB_MQ7qs&t=245), [04:10](https://www.youtube.com/watch?v=RCneB_MQ7qs&t=250)
- Spacing and layered hero composition: [05:43](https://www.youtube.com/watch?v=RCneB_MQ7qs&t=343), [06:02](https://www.youtube.com/watch?v=RCneB_MQ7qs&t=362)
- Transitions, rotation, and hover interactions: [07:40](https://www.youtube.com/watch?v=RCneB_MQ7qs&t=460), [07:51](https://www.youtube.com/watch?v=RCneB_MQ7qs&t=471), [08:15](https://www.youtube.com/watch?v=RCneB_MQ7qs&t=495), [08:21](https://www.youtube.com/watch?v=RCneB_MQ7qs&t=501)
