# Annelie OS

A calm, local-first desktop for learning and writing, designed for a Chrome
kiosk. The interface is German; source code and documentation are English.

This repository will contain the system shell and text editor. Letter-Lerner
and the future arithmetic game remain independent applications in separate
repositories, each served by its own local process.

Status: design system v1, implementation plan and interactive component catalogue.
The production shell/editor have not been implemented or deployed yet.

## Start here

- [Implementation plan](docs/implementation-plan.md)
- [Independent app contract](docs/app-contract.md)
- [Design system and visual decision](docs/design/README.md)
- [Interactive design catalogue](docs/design/catalogue.html)
- [Implementation agent brief](docs/agent-brief.md)

Device installation and Ubuntu kiosk configuration remain in
[`annelies_computer`](https://github.com/dweigend/annelies_computer).
The existing literacy app is
[`letter-lerner`](https://github.com/dweigend/letter-lerner).

## Documentation checks

```bash
bunx markdownlint-cli2@0.22.0 '**/*.md'
bunx @biomejs/biome@2.5.3 check src/app.css docs/design/*.js docs/design/*.html scripts/check-design.mjs design/*.json
node scripts/check-design.mjs
git diff --check
```

## Preview the design system

```bash
python3 -m http.server 4174 --bind 127.0.0.1
```

Open `http://127.0.0.1:4174/docs/design/editor.html` for the minimal notebook,
`http://127.0.0.1:4174/docs/design/home.html` for the home screen, or
`http://127.0.0.1:4174/docs/design/catalogue.html` for the complete design catalogue. No package install or
internet connection is needed for the preview. It supports theme switching,
notebook and app-state samples, keyboard focus and dialogs; document edits
exist only in memory. It does not install or start the learning apps.

Canonical styles and tokens live in `src/app.css`. After editing tokens, run
`node scripts/check-design.mjs --write` and the checks above. See
[the specification](docs/design/system.md) for using tokens in separate apps.

Application type, build and persistence-test commands will be added with the
production implementation.
