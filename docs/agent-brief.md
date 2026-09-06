# Local implementation agent brief

> Historical planning baseline. For the implemented release, current scope and
> remaining device acceptance, read [the release report](release-report.md).

David supplied eight initial images and ten startup references as the visual direction. Use the consolidated v1
system in `docs/design/system.md`, `src/app.css`, `design/tokens.json`, and the
interactive `docs/design/catalogue.html`. No application implementation agent
has been launched during design-system preparation.

## Task

Complete the locally runnable Annelie OS shell and simple text editor in this
repository. Start with `docs/readiness-report.md`. Follow `AGENTS.md`,
`docs/implementation-plan.md`, and
`docs/app-contract.md`. Communicate in German. Inspect the current checkout,
preserve concurrent changes, and make a checkpoint before substantial work.

Target the old MacBook Air only. Prioritize David's supplied mockups and
explicit UI feedback over generic interface conventions. Do not run mobile
test matrices. Texten must follow the latest feedback: a ring-bound notebook with almost-white paper, Courier Prime,
and one small document icon that directly opens old texts.
Every program, including Texten, must open in a window with a slim title bar
and an always-visible X to close it and return to desktop.
Restore the supplied notebook-paper.png as the explicit decorative exception,
including its ring binding, subtle texture, corners and shadow. Keep the binding
height stable while resizing. Remove permanent sidebar, title field,
toolbar and status counter from the writing area. Keep the shared title bar
and X. Remove the desktop heading and support freely draggable icons with
remembered positions; dragging must not launch a program.

First read the recorded visual decision and reproduce it consistently across
home, editor, app frame and error states. Reuse the supplied local font, artwork,
semantic tokens and component patterns. Treat the catalogue as a design specimen,
not finished application code. Confirm editor scope proposals still left open;
formatting buttons in source images alone do not approve a rich-text editor.

The operating-system startup and blinking-dot screen are already configured.
Annelie OS starts at the Chrome kiosk stage and must open home directly. Do not
add a second splash, loading-dot sequence, welcome click or timed delay; preserve
the existing OS setup. Use the seven selectable backgrounds and official whale
identity described in `docs/design/startup.md`. The static `boot.html` reference
is not the kiosk entry point. Do not wait for optional games before showing home.

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

## Independent-app window ownership

Follow docs/app-contract.md: the shell owns the 32 px title bar, always-visible X
and resize handles; games from separate loopback ports occupy only the iframe
below. X closes without waiting for game cooperation, stops the embedded session
and returns to desktop; it does not stop the separate server. Preserve progress
during play and keep iframe identity stable while resizing. The latest source
review and concrete Letter-Lerner companion work are recorded in that contract.
