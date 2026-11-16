# SOBOK hero asset

Generated with the built-in image generation tool.
Asset: `public/brand/bojagi-diptych.png`

## Final generation prompt

Use case: product-mockup. Create a photorealistic luxury Korean wrapping studio diptych, wide landscape 1536x1024. Two equal side-by-side panels with identical pale warm grey seamless studio background and same camera angle and scale. Left panel: a single unbranded ivory rectangular rigid gift box, subtle lid seam, centered with lots of negative space. Right panel: the same size box beautifully wrapped in ivory silk Korean bojagi cloth with a sculptural traditional knotted pair of upright fabric ears and natural delicate folds. Objects centered in their respective half, bottom edges aligned, soft directional daylight and realistic soft shadows. Restrained near monochrome, editorial still life, exquisite real fabric texture. No text, no logos, no borders, no props. Both objects fully sharp; blur will be added interactively in code. This is a website photographic asset, not a website screenshot.

## Future studio generation

`src/lib/bojagiPrompt.ts` builds a separate provider-independent prompt showing a flat square cloth alongside a gift wrapped in the same fabric. The current studio uses a clearly labelled static sample; it does not call a generation API. The selected concept and fabric direction are passed into the existing inquiry form. Existing inquiry submission still requires its backend endpoint.

## Studio unfolded / wrapped sample

Generated with the built-in image generation tool.
Asset: `public/brand/bojagi-flat-wrapped.png`

Prompt: Product mockup photographic diptych for Korean bojagi wrapping studio. Wide landscape image, two equal panels side by side, no divider or text. LEFT: one ivory square Korean bojagi cloth fully unfolded and laid flat, all four corners clearly visible, seen from above, delicate natural slub woven texture and neat hem. RIGHT: a rectangular gift box fully wrapped in the EXACT SAME ivory slub cloth tied with elegant traditional Korean bojagi knot, two fabric ears, realistic folds, three-quarter front view. Each object fully contained within its own half with generous margin. Consistent ivory textile color and weave across both views. Warm light grey seamless studio backgrounds, soft daylight, restrained monochrome luxury editorial product photography. No bare box, no extra props, no text, no logos, no watermark. Output 1536x1024. This image will show fabric design and finished packaging together.

## Hero v2 — sculptural silk wrapping

Built-in image generation tool. Asset: `public/brand/bojagi-hero-v2.png`.

Prompt: Luxury Korean bojagi packaging before-after diptych, photorealistic editorial campaign photograph, landscape 1536x1024. Exactly two equal-width panels. LEFT: a plain matte ivory rigid rectangular gift box with lid, understated and simple. RIGHT: same size gift box transformed by exquisite PEARL WHITE silk Korean bojagi wrapping, generous sculptural petal-like knot with graceful asymmetrical upright fabric loops, flowing diagonal pleats, subtle luminous satin highlights, fine textile grain, refined haute couture wrapping craftsmanship. Add a tiny elegant black cord and small ivory blank gift tag at the knot, no writing. Dramatic difference between mundane bare box and precious artfully wrapped gift. Both objects completely within own half with at least 12 percent margin, same baseline, same camera three-quarter angle, same scale, lots of breathing room. Consistent warm stone-grey seamless studio backdrop, soft directional light, elegant realistic shadows. Strict neutral monochrome palette. No flowers, no ornaments, no extra products, no text, no watermark. Never crop fabric knot or box. Image asset, not website.

## Sobok printed hang tag

Built-in image generation edit. Saved asset: `public/brand/bojagi-hero-logo.png`.
References: hero v2 photograph and the existing `public/Sobok_black.svg` logo rendered as a PNG.

Prompt: Edit image 1 only. Image 2 is the exact Sobok logo reference (ignore surrounding white space). On the small blank ivory paper hang tag attached to the right-hand silk wrapped gift, add this exact black Sobok wordmark, tastefully centered with generous blank margins. Realistic charcoal ink letterpress on textured thick ivory paper, subtle impression depth. Perspective warp the logo to follow the tilted tag surface, preserve paper grain, lighting, existing shadow, hole and black string. Logo should be recognizable, not oversized, approximately 65 percent of tag width, centered vertically below the hole. No extra words or decorative marks. Preserve the entire original diptych, dimensions 1536x1024, camera, gift box, silk, knot, background, colors, composition and all details outside the small paper tag. Do not add logo anywhere else. Output the full edited diptych, not a closeup.
