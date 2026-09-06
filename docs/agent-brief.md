# Local implementation agent brief

David supplied eight images as the visual direction. Use the consolidated v1
system in `docs/design/system.md`, `src/app.css`, `design/tokens.json`, and the
interactive `docs/design/catalogue.html`. No application implementation agent
has been launched during design-system preparation.

## Task

Complete the locally runnable Annelie OS shell and simple text editor in this
repository. Follow `AGENTS.md`, `docs/implementation-plan.md`, and
`docs/app-contract.md`. Communicate in German. Inspect the current checkout,
preserve concurrent changes, and make a checkpoint before substantial work.

Target the old MacBook Air only. Prioritize David's supplied mockups and
explicit UI feedback over generic interface conventions. Do not run mobile
test matrices. Texten must follow the latest feedback: a blank white page, Courier Prime,
only text/caret and one small document icon that directly opens old texts.
Remove ring binding, paper texture, wallpaper, rounded page corners and shadows. Remove permanent sidebar, title field,
toolbar, status counter and window header from the resting editor.

First read the recorded visual decision and reproduce it consistently across
home, editor, app frame and error states. Reuse the supplied local font, artwork,
semantic tokens and component patterns. Treat the catalogue as a design specimen,
not finished application code. Confirm editor scope proposals still left open;
formatting buttons in source images alone do not approve a rich-text editor.

Prove integration with the real Letter-Lerner on a separate loopback port early.
Keep game code and game-specific integration changes in its own repository;
preserve its standalone operation. Build the shell independently of sibling
checkouts. Prepare the same installation/registration contract for a future
arithmetic game and test it with an explicitly labeled fixture. Do not build
the arithmetic game as part of this task.

Implement the agreed editor operations with reliable local persistence,
acknowledged autosave and recovery of pending drafts. Use a plain textarea and
small separated storage/state modules. Keep all application styling in
`src/app.css`, use existing platform/component patterns, and avoid unnecessary
dependencies. Read version-appropriate official documentation before coding.

Work through every local acceptance criterion in the plan. Run mandatory lint,
type checks, relevant behavioral tests and the production build. Verify the
actual UI in a browser at the MacBook Air target size, including game failure and document
recovery. Review and simplify after each implementation pass.

Deliver the working local preview, reproducible setup and startup commands,
program integration documentation, test results and committed meaningful units.
State any unverified behavior explicitly. Leave device-specific Ubuntu setup
and deployment to the separate device repository and follow-up milestone.
