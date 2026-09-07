# Current screenshots

Captured on 2026-09-07, at a 1440 × 900 desktop viewport. Files retain the
browser capture tool's native JPEG format. Product images are 1440 × 900; the
scrollable design-board exports are 1425 × 891. Product captures use
local production builds: Annelie OS `8271e56340c2`, Letter-Lerner `6d426e5e088e`,
and Arithmetic Trainer `777d0be85f1b`. The same revisions were confirmed running
on the MacBook by SSH. These are local browser captures, not hardware screenshots.

| View | Source / interaction |
| --- | --- |
| [Desktop](desktop-day.jpg) | Day scene; icons and clock arranged through normal drag controls |
| [Notebook](notebook.jpg) | Actual floating editor with purpose-written demonstration text |
| [Schreibspiel](letter-lerner.jpg) | Independent game inside the shell; writing practice |
| [Rechnen](arithmetic.jpg) | Independent arithmetic app; points enabled for the current task |
| [Design foundations](design-foundations.jpg) | `docs/design/overview.html#foundations` |
| [Landscape family](design-landscapes.jpg) | `docs/design/overview.html#scenes` |

The two design boards render existing artwork and the canonical `src/app.css`.
They explain the system rather than adding another product screen. Their controls
are visual specimens. Original image prompts and licensing remain in
[asset provenance](../design/assets.md).

## Capture again

1. Build the three applications and run them on ports 3000, 3001 and 3002.
2. Set both games' `ANNELIE_OS_ORIGIN` to `http://127.0.0.1:3000`; use the shell's
   `ANNELIE_OS_APPS_FILE` with [the example registry](../apps.example.json).
3. Use isolated data directories for the editor, game catalogue and arithmetic
   progress. Keep personal documents and real learning history out of screenshots.
4. Use the normal UI to select the day scene, arrange the desktop, write a sample
   text, open writing practice and enable the points aid in arithmetic.
5. Capture the browser viewport at 1440 × 900 after artwork and local fonts load.
6. Serve this repository on port 4174 and capture both sections of
   `docs/design/overview.html` at the same viewport. Check the images before replacing them.

No real child's writing, learning history or credentials are included.
