# Ring notebook refinement

Date: 2026-09-06. Scope: restore the editor's explicitly requested ring-book exception.

## Visual evidence

- Source: [notebook reference](docs/design/references/08-notebook-editor.png), 1378 × 1124 pixels.
- Implementation: [writing](docs/design/references/ring-notebook-preview.jpg), 1440 × 900 pixels, 1440 × 900 CSS viewport.
- Additional states: [document menu](docs/design/references/ring-notebook-menu.jpg), [resized window](docs/design/references/ring-notebook-resized.jpg).
- Compared the source and implementation together, focusing on the notebook content rather than differing outer wallpaper and frame proportions. Both show the same short writing sample. No pixel-perfect full-screen equivalence is claimed: the later requested title bar, X, resizing and selected space background take precedence.
- Density: the implementation capture is one image pixel per CSS pixel. The source is artwork rather than a browser capture; compare paper-relative composition, not its unknown CSS density.

## Findings and resolution

- The existing notebook asset restores the reference's muted brass binding, almost-white paper, rounded paper corners and restrained shadow. Reused the supplied raster artwork; no replacement drawing or new asset was needed.
- Typography: local Courier Prime Regular, 36 px, line height 1.6, charcoal text. The source's typewriter character remains recognizable; text stays editable.
- Layout: binding occupies a stable 96 px upper border-image slice. Writing starts below it at 128 px with 8% side margins. The 32 px header and X remain reachable at the verified smaller window size. The document icon remains below the rings.
- Color: paper and menu remain light with readable dark text even with evening appearance. During review the existing menu selection and note inherited unsuitable evening colors; corrected those two colors and recaptured the readable menu.
- Image quality: no clipped rings, missing paper edges or visible seams in full and resized captures. Subtle texture remains behind the text. Full-view images are sufficiently clear to assess binding, text, corners and icon; the menu capture supplies the focused functional comparison.
- Content: no new resting instructions, toolbar or sidebar. The writing sample was removed after verification; new documents remain empty.

## Verification and limits

Writing, opening/closing the document menu and corner resizing were exercised in the local browser. Lint, design asset/token checks and diff validation passed. These are preview checks, not production persistence or device acceptance. No mobile checks were added.

## Implementation checklist

- [x] Restore existing notebook artwork in central CSS.
- [x] Retain writing, document control, window header and resize behavior.
- [x] Correct the menu contrast issue observed during review.
- [x] Update design rules and implementation handover to preserve this exception.

No actionable P0/P1/P2 visual findings remain within this refinement's scope.

final result: passed
