# Startup identity and backgrounds

David explicitly selected the surfacing whale as the official Annelie OS logo
and asked to adopt the supplied startup backgrounds on 2026-09-06.

## Identity

Use `static/design/logo-whale.png`: dark blue whale, closed white eye, pink
cheek, two blue water droplets, yellow heart and a blue-white wave. Preserve
the silhouette, colors and proportions. No cat or substitute mascot.

The transparent emblem was prepared with the built-in GPT Image tool from
`references/boot/01-day.png`. It is a derived reusable master, not a pixel-exact
crop or a new approved redesign. The unchanged source remains the authority
if a future rendition drifts. The runtime wordmark uses local Nunito, weight
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
Day is the default startup and home background. The existing evening theme now
uses the night landscape. Other scenes are explicit preview options, with no
random wallpaper rotation or automatic time-based switching.

The gallery in [startup.html](startup.html) links to all seven scenes and the
ten unchanged originals. [boot.html](boot.html) composes the live logo, wordmark
and an indeterminate loading indicator; `?scene=night` selects another scene.

## Composition and behavior

Use one full-viewport background and one centered logo/wordmark group, slightly
above the vertical midpoint. No card, window frame, title bar or shadow behind
the identity. Use a dark wordmark on light scenes and white on dark scenes.
The whale master stays unchanged. Use contain for the logo and cover for the
background; compare at the MacBook Air landscape viewport.

Three small dots may gently change opacity while startup is pending; they are
an indeterminate activity signal, never a fabricated percentage or stage count.
Honor reduced motion with static dots. Do not rotate or bounce the whale, add
continuous scene animation, or impose an artificial minimum startup delay.

In the finished shell, leave startup as soon as the shell and its local document
store are ready. Learning services start independently: one unavailable game
must not prevent entry to the home screen or editor. On a genuine shell startup
failure, stop loading and offer one concise recovery action. Do not silently
loop a broken startup indefinitely.

The small navigation links in the preview are review conveniences only. They
must not appear in the installed startup screen. This task supplies design and
assets, not a working Ubuntu boot splash or service-readiness implementation.
Ubuntu boot/session integration belongs to the device repository. Reuse these
assets there, validate the real boot sequence and avoid flashing a second logo
or adding a mandatory welcome click.

## Provenance

[boot-sources.json](../../design/boot-sources.json) maps each master to its source
and full prompt. [asset-manifest.json](../../design/asset-manifest.json) records
dimensions, transparency, sizes and hashes. Originals and prompts remain local
to the repository. The image tool is not a runtime dependency.
