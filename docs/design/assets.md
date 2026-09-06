# Assets and provenance

All paths below are relative to the repository root. The eight initial source
images and ten startup references were preserved unchanged. New artwork was made with the built-in GPT
Image tool using those images as explicit references. No source screenshot was
used as a production UI background or cropped into a sprite.

## User references

| Image | Preserved file | Role |
| --- | --- | --- |
| 1 | `docs/design/references/01-desktop-exploration.png` | Initial desktop/window study |
| 2 | `docs/design/references/02-home-and-apps.png` | Home, clock, editor and game composition |
| 3 | `docs/design/references/03-states-and-personality.png` | Evening, states and character behavior ideas |
| 4 | `docs/design/references/04-system-board.png` | Primary landscape and visual-system source |
| 5 | `docs/design/references/05-app-icon-family.png` | Sculpted app icon family |
| 6 | `docs/design/references/06-clock-study.png` | Clock material, colors and geometry study |
| 7 | `docs/design/references/07-cat-character.png` | Character identity and poses |
| 8 | `docs/design/references/08-notebook-editor.png` | Selected ring-notebook exception; restored by explicit feedback |

Text inside supplied pictures is reference content, not an independent feature
request. Preserve these files as evidence; later corrections get new filenames.

## Reusable artwork

| File in `static/design/` | Intended use | Reference / prompt |
| --- | --- | --- |
| `wallpaper-day.png` | Historical day landscape | Source 4 / [prompt](prompts/wallpaper-day.txt) |
| `wallpaper-evening.png` | Historical evening landscape | Day master / [prompt](prompts/wallpaper-evening.txt) |
| `icon-text.png` | Texten launcher, blue typewriter | Source 5 / [prompt](prompts/icon-text.txt) |
| `icon-math.png` | Rechnen launcher, counting discs | Source 5 and text icon / [prompt](prompts/icon-math.txt) |
| `icon-letters.png` | Schreibspiel launcher, ABC | Source 5 and text icon / [prompt](prompts/icon-letters.txt) |
| `cat-peek.png` | Unused character reference | Source 7 / [prompt](prompts/cat-peek.txt) |
| `notebook-paper.png` | Active ring-bound editor surface | Source 8 / [prompt](prompts/notebook-paper.txt) |

The official whale and seven current startup backgrounds are documented in
[startup.md](startup.md), with every source and prompt mapped in
[boot-sources.json](../../design/boot-sources.json). The current home uses
`background-day.png` and `background-night.png`; the older wallpapers are
retained for history. The standalone whale master has genuine transparency.

Use original aspect ratios. Backgrounds use cover with bottom-center anchoring;
allow the outer plants to crop, not the important interface. Place real text on
opaque surfaces. App icons use contain, preserve their full transparent margin,
and never stretch. Masters support 112–152 px launcher canvases and 24–48 px
identity thumbnails, but utility controls use Lucide instead.

The PNG icons and cat have actual alpha channels. A black preview background
does not imply a baked black rectangle. Soft edge shadows are intentional;
check them on both day/evening surfaces. The cat has a broad soft shadow and
is retained only as a source asset; the cat is not displayed in the current UI.

The day and evening backgrounds are companion illustrations, not a perfectly
registered animation pair. Do not crossfade them as if the geometry were
pixel-identical. Load the selected theme before presenting the scene.

The supplied clock pictures remain references. The catalogue's actual clock
renders numerals and hands at current local time with accessible text. A future
clock implementation must retain that behavior rather than reusing a static
raster time.

See [asset-manifest.json](../../design/asset-manifest.json) for dimensions,
sizes, transparency metadata and SHA-256 hashes of the delivered masters.
Original master resolutions are the tool's output, not the dimensions requested
in the prompts; do not claim a higher-resolution export than the actual file.

## Fonts and utility icons

Courier Prime Regular is bundled at
`static/design/fonts/courier-prime-regular.ttf`, with `COURIER-OFL.txt`. Source:
Google Fonts commit `5e35378e6bda803962ee6fd257e444a7d459660d`,
`ofl/courierprime/CourierPrime-Regular.ttf`. It is used only for the notebook
text to match the explicit typewriter reference.

Nunito Variable is bundled at `static/design/fonts/nunito-variable.ttf` with
`OFL.txt`. Source: Google Fonts commit
`5e35378e6bda803962ee6fd257e444a7d459660d`, `ofl/nunito/Nunito[wght].ttf`.
Use this local file without a Google Fonts request during runtime.

Seventeen Lucide SVGs are bundled unchanged at `static/design/icons/`, with their
upstream `LICENSE`. Source: `lucide-icons/lucide` tag `0.468.0`. This pins the
specimen assets; it is not a request to downgrade any future app dependency.
The catalogue uses them as CSS masks to inherit semantic colors. Production
Svelte code may use the existing installed Lucide package for the same symbols.
Keep 24 px viewboxes and a 2-unit stroke, preserving accessible button labels.

User-supplied and newly created artwork does not acquire an open-source license
merely because the repository is public. No new artwork license is asserted by
this task. Retain the supplied references, generation provenance and upstream
font/icon licenses; decide a broader project/artwork license separately.
