# Repository guidelines

- Communicate with David in German. Write code, comments, documentation, file
  names, commits and pull requests in English. Product UI is German.
- Read `docs/implementation-plan.md`, `docs/app-contract.md`, and
  `docs/design/README.md` and `docs/design/system.md` before implementation.
  David's supplied reference family is the selected direction. Use the v1
  design system; the earlier three mockups are historical exploration.
- Inspect Git status and existing patterns before changes. Preserve concurrent
  work. Commit a checkpoint before substantial changes and completed units
  promptly. Use concise conventional commits without assistant attribution.
- Prefer SvelteKit, Svelte 5, TypeScript, Bun, Biome, bits-ui/shadcn-svelte and
  Lucide. Check current official documentation, using Context7 first. Inspect
  the actual installed versions before applying examples.
- Reuse code and platform capabilities before adding dependencies. Keep UI,
  application state, persistence, configuration and process operations separate.
- Keep all styling in `src/app.css`, using semantic classes and shared tokens.
  No component styles, inline styles, or Tailwind utility classes in markup.
- Favor short UI labels, large targets, visible keyboard focus and calm layouts.
- Own the shell and built-in editor here. Do not vendor learning-game sources,
  add Git submodules, build a plugin SDK, or move game logic into this repo.
- Bind local servers to loopback. Keep runtime files, authored documents,
  browser profiles, credentials and device-specific configuration out of Git.
- Run repository checks first. Lint is mandatory. Run type checks, build and
  relevant behavior tests for implementation; review and simplify each pass.
  Report unverified behavior accurately.
- This is a local application project. Ubuntu session configuration, Chrome
  policies and device installation belong to the separate device repository.
  Do not change the target machine as part of local UI development.

## Existing startup boundary

David confirmed that OS startup and its blinking-dot screen are already set up.
Annelie OS begins at Chrome kiosk launch and opens home directly. Never add a
second splash or boot animation. `docs/design/boot.html` is a static identity
reference only. Preserve the existing system startup; use the supplied seven
backgrounds as appearance options in the application.

## Desktop interaction

No visible desktop heading. Program icons must be freely movable and remember
positions. Every program, including the plain white text editor, opens in a
window with a slim title bar and an always-visible X to close it. Closing must
return to desktop without browser navigation and preserve editor drafts.
