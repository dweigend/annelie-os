# Annelie OS: design handover and build plan

Date: 2026-09-06. Reviewed application revision: `67b9930`.

## Current outcome

Design preparation is complete for the feedback supplied in this task. The
public repository, reusable artwork, design system, interactive preview and
implementation contract are available. The next milestone is a production
application, not further generic visual exploration.

Repository: [dweigend/annelie-os](https://github.com/dweigend/annelie-os).
The current preview consists of HTML, CSS and JavaScript served locally.
It is not a packaged production shell and does not yet provide durable document
storage, a running game integration or an Ubuntu application deployment.

## Delivered and retained decisions

| Area | Delivered behavior or design |
| --- | --- |
| Identity | Official surfacing whale; seven local backgrounds |
| Kiosk entry | Open desktop directly; existing OS boot screen is outside this application |
| Desktop | Three icon-only launchers, no visible heading, no decorative cat |
| Placement | Freely draggable icons; positions remembered in this browser |
| Clock | Live analog time, static CSS depth, raised rim and shadows; no ticking second hand |
| Windows | One active program window, 32 px title bar, app name and always-visible X |
| Window sizing | Drag edges/corners; bottom-right grip; keep controls visible; sizes retained during the page visit |
| Editor | Ring-bound paper is the explicit decorative exception; Courier Prime; initially empty writing area |
| Documents | One small document icon opens the list; preview can create and switch in-memory texts |
| Closing editor | Returning to desktop and reopening retains drafts within the current page visit |
| Loading specimen | App icon and four gently blinking blue dots; no visible loading copy or progress bar |
| Empty specimen | Only the Neuer Text button with plus icon |
| Failure specimen | Only the Noch einmal button with retry icon |
| App boundaries | Independent repositories and loopback servers; shell owns the window outside the embedded game |

The catalogue contains developer documentation and explanatory specimen labels.
That surrounding text is not intended for the child's production desktop.
The game slots on the desktop are explicitly placeholders, not completed games.
The learning-state examples in the catalogue are not connected to real services.

## What is not finished

- There is no production application scaffold, server, build or installable release
  in this repository yet. The preview server is a development convenience.
- Editor texts are memory-only. A page reload or browser restart loses them.
  Do not use this preview for writing that must be kept.
- Letter-Lerner has been reviewed in source, not run and verified inside the shell.
  Its own repository needs the agreed embedded-mode integration.
- The arithmetic game has not been built. Its mechanics and separate repository
  are a companion project, not hidden work inside the OS shell.
- Window dragging by the title bar and simultaneous multiple windows are not
  implemented. The current confirmed interactions are icon dragging and window
  resizing, with one active application. These are not silently expanded here.
- The application has not been installed or accepted on the actual MacBook Air.
  Existing Ubuntu startup and kiosk work belongs to the device repository.

## Recommended implementation order

### 1. Establish the production shell

Owner: Annelie OS implementation agent, repository `annelie-os`.

Inspect the current repository and version-appropriate official documentation.
Create the SvelteKit/Svelte application using the existing project conventions,
local assets, fonts and central app.css. Select and pin the supported production
Node runtime and adapter. Preserve the approved appearance rather than using a
fresh starter design. Keep preview-only styles and content out of child routes.

Port the desktop, appearance preference, clock, icon positions and shared
resizable window. Make window state, app registry, document state and storage
separate small modules. The shell must run without sibling checkouts or games.

Done when: one documented local startup command opens the real desktop; Texten
opens/closes/resizes; missing games cannot prevent writing; no second boot screen.

### 2. Prove real Letter-Lerner integration early

Owners: shell integration in `annelie-os`; companion changes in `letter-lerner`.

Use the current Letter-Lerner revision rather than assuming the local
`feat/nixos-kiosk-runtime` branch equals main. The last inspected GitHub main was
`2f81836`; inspect again when implementation starts. See the source review and
companion checklist in [app contract](app-contract.md).

Run shell and game on separate stable loopback origins, proposed ports 3000 and
3001. Register the game in shell configuration. Use one iframe inside the shared
window. Keep the X and resize handles outside that iframe. Embedded mode must
persist across internal game navigation and retain standalone operation.

Permit the exact shell origin in response embedding policy. Verify real readiness,
progress persistence and audio rather than treating iframe load as success.
Resize without reload. Closing removes the game view and stops its audio while
the independent game server stays running. X never waits for a game callback.

Done when: a real learning activity opens, resizes and closes; progress survives
reopening; a stopped server leads to the minimal retry state while X still works.

### 3. Complete durable text editing

Owner: Annelie OS implementation agent.

Keep the ring-notebook appearance and native textarea. Implement new document,
list/open document, editing and automatic local saving. Use a stable document ID,
body, timestamps and revision. Derive the list label from the first non-empty
line; this is a recommended implementation default consistent with the preview,
not a reason to add a permanent title input.

Store acknowledged documents outside the application release directory. Use
validated records, atomic writes and a last-good recovery copy. Keep pending
edits in a browser draft journal and recover them after interruption. Closing a
window must preserve unsaved work; errors must not pretend that saving succeeded.
Show concise recovery controls only when needed, not a permanent status row.

Recommended first-release scope: plain text, multiple documents, autosave,
reopening and recovery. No formatting toolbar, cloud account or import/export.
Deletion/trash/restore is still a scope proposal; keep it separate from the
minimum writing-and-recovery milestone and settle it before adding destructive UI.

Done when: a real text survives window closure, page reload, browser/server
restart and a release update. A failed write retains the draft and can recover.

### 4. Make independent applications installable

Owner: Annelie OS agent for registry/runtime contract; device task for services.

Ship a small validated app manifest and installation example: stable app ID,
label, icon, origin, entry path, health/readiness information and pinned release.
Use allowlisted loopback origins. Keep game source and data in their own projects.
Do not introduce a package store, source imports, submodules or plugin framework.

Provide reproducible production build/start commands, configuration examples,
external data directories and backup/restore notes. An absent arithmetic app
must have an explicit unavailable state. A clearly labeled development fixture
may prove the registration contract but never counts as a completed math game.

Done when: a game can be registered, updated or removed independently without
rebuilding the shell or deleting documents/progress.

### 5. Accept the local release at the laptop size

Owner: implementation agent together with David's visual feedback.

Compare the running application with the approved references at 1440 × 900,
then confirm the actual device viewport at deployment. Focus on the paths that
matter: move icons, resize/close windows, write/reopen texts, start/leave a game,
and recover from a stopped service or failed save. Check long writing and the
smallest permitted application window so controls remain reachable.

Run mandatory lint, type validation and the production build. Add focused tests
for persistence/recovery and app lifecycle where they prevent real data loss or
broken navigation. No mobile matrix or broad unrelated checks. Use the actual
old hardware for performance acceptance; do not infer performance from this Mac.

Done when: shell, editor and real Letter-Lerner work locally with the agreed
appearance, documented limitations and an identifiable release revision.

### 6. Install through the existing Ubuntu workflow

Owner: device task, repository `annelies_computer`.

Inspect the current MacBook Air state over the existing SSH connection. Reuse
its working Chrome kiosk, boot artwork and session configuration. Keep Wi-Fi,
SSH and the adult-unlock path intact. Do not reinstall Ubuntu or NixOS.

Install pinned releases and independent loopback services incrementally, keeping
persistent data outside releases. Back up replaced files and prepare rollback.
Verify each app service before changing the kiosk entry URL. Privileged work
still requires checking the actual available sudo authorization at that time.

Done when: the actual MacBook Air boots into the real desktop; writing survives
restart; games open and close with X; sound stops on close; recovery and rollback
are documented. A local preview or GitHub push alone is not deployment acceptance.

### 7. Complete the separate arithmetic project

Owner: a separate game implementation task and repository.

Define learning rules, number range, input and feedback, then build the arithmetic
game against the same app contract. Its visual controls should reuse the selected
Annelie OS tokens without moving game logic into the shell. Register it on its own
service, proposed port 3002, and repeat the short real-game integration acceptance.

This can follow or run alongside shell/editor delivery when its scope is ready.
The complete three-program system is finished only when this is a real game;
shell/editor plus Letter-Lerner is the earlier usable release.

## Handover for the next task

Start one implementation task with [the agent brief](agent-brief.md), this report,
[the detailed plan](implementation-plan.md), [app contract](app-contract.md) and
[design specification](design/system.md). These documents capture the visual
feedback; do not restart the mockup exploration or ask again about settled UI.

Recommended task outcome: finish and demonstrate the production shell, ring-book
editor with durable local texts, and real Letter-Lerner integration locally;
prepare a release for the separate Ubuntu installation milestone. Keep arithmetic
implementation as its own project and report it as outstanding until delivered.

No implementation task was started by this report. No target device changes were
made by this design handover.
