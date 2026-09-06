#!/usr/bin/env bash
# Package the adapter-node output; no source checkout or package install is needed at runtime.
set -euo pipefail
cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.."
test -f build/index.js
revision=$(git rev-parse --short=12 HEAD)
if [[ -n $(git status --porcelain --untracked-files=no) ]]; then
    echo 'Commit tracked changes before packaging a release.' >&2
    exit 1
fi
stage=$(mktemp -d)
trap 'rm -rf -- "$stage"' EXIT
mkdir -p "$stage/annelie-os/scripts" dist
cp -R build "$stage/annelie-os/build"
cp scripts/start.mjs "$stage/annelie-os/scripts/"
printf '{"type":"module","name":"annelie-os","version":"1.0.0"}\n' > "$stage/annelie-os/package.json"
printf '%s\n' "$revision" > "$stage/annelie-os/REVISION"
tar -czf "dist/annelie-os-$revision.tar.gz" -C "$stage" annelie-os
printf 'dist/annelie-os-%s.tar.gz\n' "$revision"
