# Annelie OS

A minimal Svelte 5 / SvelteKit desktop and ring-notebook text editor for the
existing Ubuntu Chrome kiosk on a MacBook Air. German interface, English code.

Version 1.0 provides movable desktop icons, seven local wallpapers, a CSS-depth
analog clock, resizable application windows with an independent X, and a plain
text editor with autosave and recovery. Letter-Lerner runs in its own repository
and server inside the shell's window. The arithmetic game remains a separate
future project; its icon currently shows the minimal retry state.

## Run locally

Prerequisites: Bun 1.3.14 and Node 24 LTS. All dependencies are pinned in the lockfile.

```sh
bun install --frozen-lockfile
bun run dev
```

Open `http://127.0.0.1:3000`. For the production server:

```sh
bun run build
bun run start
```

Letter-Lerner is optional for writing. Run its Annelie OS integration release
separately on port 3001 with `ANNELIE_OS_ORIGIN=http://127.0.0.1:3000`,
`LETTER_LERNER_KIOSK=1` and `OPENAI_AI_DISABLED=true`. Its own README documents
catalogue initialization and asset requirements. See [the app contract](docs/app-contract.md).

## Install on the MacBook

Use the complete offline Linux x64 bundle and installer maintained in the
[device repository](https://github.com/dweigend/annelies_computer/blob/main/docs/annelie-os-installation.md).
The installed shell keeps the existing kiosk address `http://127.0.0.1:8765/`.
Letter-Lerner stays at port 3001. No second splash screen or OS reinstall.

[Release report](docs/release-report.md) records completed work, verification
and remaining on-device acceptance. A local preview is not a deployment.

## Structure

| Directory | Responsibility |
| --- | --- |
| `src/lib/components` | Desktop controls, notebook and application window |
| `src/lib/client` | Editor autosave/recovery and pointer geometry |
| `src/lib/server` | Atomic document persistence and validated app registry |
| `src/lib/shared` | Small shared records and validation rules |
| `src/routes/api` | Local document and application endpoints |
| `src/app.css` | Canonical design system and all styling |
| `static/design` | Local illustrations, masks and licensed fonts |
| `tests` | Persistence, recovery, concurrent editing and registry boundaries |
| `docs/design` | Original interactive design specimens |

SvelteKit uses adapter-node. The server has no external runtime dependencies;
only Node's built-in filesystem and HTTP facilities are needed. The approved
plain-text interaction uses a native textarea. There is no rich-text editor,
plugin SDK, window-manager library, cloud storage or game source vendoring.

## Storage and configuration

`ANNELIE_OS_DATA_DIR` selects the external data root; the default is
`$XDG_DATA_HOME/annelie-os` or `~/.local/share/annelie-os`. Documents are UUID-named
JSON records in `documents/`, with revisions, timestamps and a last-good `.bak`.
Writes are serialized per document, synced and atomically replaced. Damaged
primary files are retained before recovery overwrites them. Run one server per
data directory; process-level multiwriter coordination is outside this release.

A browser draft journal protects edits before server acknowledgement. Conflicting
edits create another document instead of overwriting either version. Preserve
both server data and the browser profile when backing up. A saved text's first
line becomes its list label; there is no separate title field. No deletion,
printing, import/export or formatting tools are included in this version.

`ANNELIE_OS_APPS_FILE` selects an external JSON manifest array. With no file,
Letter-Lerner at 127.0.0.1:3001 is the default. Missing games cannot block writing.
`HOST`, `PORT`, `ORIGIN` configure the production listener. Use a stable origin:
browser drafts, desktop preferences and game progress are origin-bound.

## Checks and release archive

```sh
bun run lint
bun run check
bun run test
bun run check:design
bun run build
bash scripts/package-release.sh
```

The app archive contains the production output, minimal package metadata and
startup script. Device services, the pinned Linux Node runtime and repeatable
installation/rollback live in the separate device repository.

## Design references

The surfacing whale is the official identity. Styles and local assets reuse
[the selected design system](docs/design/system.md). The editor's ring binding
is the explicit decorative exception. The target viewport is 1440 × 900;
mobile product work is outside scope.

To inspect the original static catalogue:

```sh
python3 -m http.server 4174 --bind 127.0.0.1
```

Open `http://127.0.0.1:4174/docs/design/catalogue.html`. These older specimens
retain in-memory text only; use the actual application for persistent writing.
The production stylesheet build rebases static asset paths while preserving
one canonical CSS source for both surfaces.
