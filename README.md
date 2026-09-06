# Annelie OS

A calm, local-first desktop for learning and writing, designed for a Chrome
kiosk. The interface is German; source code and documentation are English.

This repository will contain the system shell and text editor. Letter-Lerner
and the future arithmetic game remain independent applications in separate
repositories, each served by its own local process.

Status: planning and visual exploration. No application has been implemented
or deployed yet.

## Start here

- [Implementation plan](docs/implementation-plan.md)
- [Independent app contract](docs/app-contract.md)
- [Visual concepts and pending decision](docs/design/README.md)
- [Implementation agent brief](docs/agent-brief.md)

Device installation and Ubuntu kiosk configuration remain in
[`annelies_computer`](https://github.com/dweigend/annelies_computer).
The existing literacy app is
[`letter-lerner`](https://github.com/dweigend/letter-lerner).

## Documentation checks

```bash
bunx markdownlint-cli2@0.22.0 '**/*.md'
git diff --check
```

Application lint, type, build and test commands will be added with the initial
implementation. The current repository contains documentation and design assets.
