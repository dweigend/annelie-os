# System identity and kiosk backgrounds

David explicitly selected the surfacing whale as the official Annelie OS logo
and asked to adopt the supplied startup backgrounds on 2026-09-06.

## Existing system startup

David confirmed that the operating-system startup, including its blinking dots,
is already configured. Annelie OS begins where the Chrome kiosk starts and
opens the home screen with its three program icons directly. Do not implement
another splash, logo sequence, loading-dot screen or mandatory welcome step.
Preserve the existing operating-system setup; no boot installation is required
by this design task. This is user-confirmed state, not a new hardware audit.

## Identity

Use `static/design/logo-whale.png`: dark blue whale, closed white eye, pink
cheek, two blue water droplets, yellow heart and a blue-white wave. Preserve
the silhouette, colors and proportions. No cat or substitute mascot.

The transparent emblem was prepared with the built-in GPT Image tool from
`references/boot/01-day.png`. It is a derived reusable master, not a pixel-exact
crop or a new approved redesign. The unchanged source remains the authority
if a future rendition drifts. The static identity specimen uses local Nunito, weight
800 for Annelie and 300 for OS, separately from the emblem. This is live text,
not an exact reproduction of the illustrated source lettering.

## Background family

| Key | Supplied source | Reusable file in `static/design/` |
| --- | --- | --- |
| day | 01-day | `background-day.png` |
| sunrise | 02-sunrise | `background-sunrise.png` |
| night | 03-night | `background-night.png` |
| cream | 04-cream | `background-cream.png` |
| muted-night | 05-muted-night | `background-muted-night.png` |
| evening | 07-evening | `background-evening.png` |
| space | 10-space | `background-space.png` |

Sources 06 and 08 explore welcome/progress UI on the day family; source 09 is
an evening variation with a cat. They are preserved with all ten originals,
but do not add duplicate wallpapers or restore the removed cat. Screenshot
button labels and greetings are not independent feature instructions.

All backgrounds are 1672 × 941. Lettering, emblem and loading UI were removed
with GPT Image edits to prepare reusable backgrounds. Preserve the supplied
composition, colors and painted texture; minor generated variations are possible.
Day is the initial home background. All seven landscapes are available through
[startup.html](startup.html), which opens `home.html?scene=<key>`. The selection
is stored in this browser under `annelie-os.preview.background` and reapplied
before the next home paint. If storage is unavailable, the explicit selection
still works for the current visit. Unknown scene keys fall back to a valid saved
preference or day. No random rotation or automatic time-based switching.

A small sun icon on home opens the background chooser. The chooser belongs to
the design preview; the production app should store the same seven choices in
its normal appearance preferences. Dark scenes use light system text. The
editor remains a plain white page with typewriter typography in every scene.

[boot.html](boot.html) is retained only as a static logo/background reference.
It has no loading animation and is not a kiosk entry route. Its small navigation
links are preview conveniences. The original screenshots preserve the supplied
OS boot motifs for reference without recreating that process in the web app.

The official whale master remains separate from the backgrounds. Preserve its
proportions and use contain for identity previews. Backgrounds use cover and
are compared at the MacBook Air landscape viewport. Learning services remain
independent: an unavailable game must not prevent opening home or the editor.

## Provenance

[boot-sources.json](../../design/boot-sources.json) maps each master to its source
and full prompt. [asset-manifest.json](../../design/asset-manifest.json) records
dimensions, transparency, sizes and hashes. Originals and prompts remain local
to the repository. The image tool is not a runtime dependency.
