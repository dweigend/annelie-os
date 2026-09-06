# Visual exploration

Date: 2026-09-06. Method: built-in GPT Image tool. These are concept images,
not screenshots of working software. Full prompts are stored beside each image.

## Decision

Pending David's feedback. No direction is approved yet. Record the selected
image(s), refinements and agreed editor scope here before implementation.
Do not infer approval from the order of images or a preselected chat answer.

The visible chat display order is the authoritative selection numbering:

| Chat number | Concept | Image | Full prompt |
| --- | --- | --- | --- |
| 1 | Clear program shelf | [Image](clear-program-shelf.png) | [Prompt](clear-program-shelf.prompt.txt) |
| 2 | Warm learning desk | [Image](warm-learning-desk.png) | [Prompt](warm-learning-desk.prompt.txt) |
| 3 | Quiet writing notebook | [Image](quiet-writing-notebook.png) | [Prompt](quiet-writing-notebook.prompt.txt) |

The first two explore home-screen directions; the third explores the editor
and can be combined with a chosen home direction. Each image is an independent
design reference. The planned viewport was 1440 x 900; actual image files are
1586 x 992, so implementation must reflow at the real viewport rather than
stretching the raster or treating every pixel as an approved token.

## Visual review

All three show legible German labels, calm spacing and the intended workflow.
The editor shows a home control, document list, title, body and saved state.
Its large text and long line need adjustment against actual window sizes and
the desired writing size. The blue home direction adds a decorative pale wave;
the warm direction uses tactile illustrations. These are style proposals.

Before building, refine the selected home/editor combination into one shared
navigation, palette, typography and icon treatment. Generate reusable artwork
separately if selected; the concept screenshot itself is not an application
background. Failure, empty-document and narrow-window states will need matching
UI treatment during implementation.
