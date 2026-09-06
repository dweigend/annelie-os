# Design system and visual decision

Version 1.0.0 · 2026-09-06. David supplied eight design-reference images and
requested a complete, unified system based on them. Those references supersede
the earlier exploratory options below.

## Decision

The selected direction combines the lake setting from source 4, the tactile
app family from source 5 and the analog clock from source 6. The cat from
source 7 is retained as a reference asset but removed from the home scene. The consolidated design defines day/evening colors, local Nunito typography,
spacing, controls, a shared window, editor patterns, recovery states and app
integration. The exact v1 refinements are the result of the design task and
remain reviewable; do not describe them as separately user-approved details.

The official identity is now the surfacing whale. The ten additional startup
references define seven selectable home backgrounds. OS startup is already
configured; the kiosk opens home directly without a second splash. See [startup rules](startup.md) and [the gallery](startup.html).

Start here:

- [Interactive catalogue](catalogue.html)
- [Complete specification](system.md)
- [Canonical CSS](../../src/app.css) and [token export](../../design/tokens.json)
- [Assets, sources and full generation prompts](assets.md)
- [Contrast results](contrast.md) and [verification](verification.md)

Latest UI refinement: David restored the ring-bound reference as an explicit
exception to the minimal system. The editor uses the existing notebook artwork,
Courier Prime and a tiny document icon,
inside a slim window with an always-visible X. All programs use this window
pattern. Desktop icons are movable; the visible desktop heading is removed. The resting editor has no
sidebar, title field or permanent status row. Target the old MacBook Air only;
mobile layouts are outside scope. Open [the ring-notebook preview](editor.html) or
[the minimal home preview](home.html) for direct mockup comparison.

The product labels are Annelies Computer / Texten / Rechnen / Schreibspiel.
The project remains Annelie OS and the game remains `letter-lerner` internally.
Rich text, quick notes, extra apps and shutdown behavior visible in source
images are not automatically approved functionality. See the scope decisions
in the specification before implementation.

## Historical exploration

The initial chat display order was:

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

These three original files are retained for history and are no longer the
current visual target. Use the consolidated v1 system above.
