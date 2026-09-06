# Design system verification

Date: 2026-09-06. Scope: design-system delivery for the old MacBook Air.

## Visual review

The current editor follows David's latest explicit simplification: a blank white
page, Courier Prime and one small document icon. Rings, textured paper, wallpaper,
page shadows and rounded page corners were removed. Document selection opens
directly from the icon. New documents contain no example text.

The home view retains the supplied lake/app/clock direction with icon-only
launchers. No mobile layouts were added.

## Relevant checks

- Markdown lint and Biome checks cover the delivered documentation, HTML,
  JavaScript, CSS and JSON.
- The token export matches the canonical stylesheet; local asset/link checks
  and solid-color contrast calculations pass.
- The preview displays local fonts and generated artwork. The notebook is an
  actual editable textarea, with document actions behind its menu.
- The earlier general component specimens demonstrated theme switching,
  app failure, dialog opening/cancellation and focus return. These are design
  examples, not proof of runtime app integration.

Phone layouts and broad mobile verification are explicitly outside scope.
Earlier exploratory small-viewport checks are superseded by David's request
to optimize and compare against the old MacBook Air and supplied mockups.

## Boundaries

Preview documents exist only in memory. Production saving, crash recovery,
Letter-Lerner embedding, installation and kiosk behavior are not implemented
or certified by this design-system task. The actual hardware viewport and
rendering remain part of the device-integration task.

The related task **Mockups fürs Lernbetriebssystem** confirmed the minimal
typewriter/ring-notebook direction. The task **Kiosk-Modus absichern** could
not be read through the task tool during this update; local device-operation
documentation was available. No additional hidden queue entries were exposed
by the available tools, so this update handles the visible UI instructions.

## Whale startup update

Ten supplied originals are preserved. The reusable whale has actual alpha;
seven backgrounds are separate 1672 × 941 images with no baked wordmark or
progress UI. The day/night home backgrounds use the new family. Home
selects only allowlisted backgrounds and remembers the choice in this browser.
The web loading dots were removed. David confirmed that OS startup is already
configured; this update does not modify or re-audit that setup. Kiosk entry
must go directly to home.

## Desktop interaction update

Program icons are freely movable within the desktop work area and positions
are stored as normalized coordinates. Every program opens in a native dialog
with one slim header and an X. The editor iframe is retained while hidden so
closing/reopening does not discard its in-memory drafts. The standalone editor
has the same close affordance. The desktop heading is removed.

Implementation references: [pointer capture](https://developer.mozilla.org/en-US/docs/Web/API/Element/setPointerCapture),
[native dialogs](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal)
and [CSS rule updates](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleRule/style).
Dynamic icon geometry updates rules declared in app.css; no inline styles or
runtime style elements are added. No new framework or dependency was introduced.

At the MacBook Air comparison size, dragging changed the icon position without
opening a window; reloading retained that position. Writing Hallo Welt,
closing Texten with X and reopening retained the text. The window has a single
header and no duplicate editor chrome. These checks cover the local design
preview, not installed learning games or production document persistence.

## Window resizing update

The shared window and standalone editor now resize from eight edge/corner
handles using pointer capture. The bottom-right grip also supports arrow keys.
Sizing reuses existing app.css rules, with no inline styles, dependency or
iframe reload. Geometry lasts for the current page visit.

At 1440 × 900, direct dragging verified diagonal shrinking, left-edge and
top-edge resizing with the opposite edge fixed, and the 480 × 320 minimum.
The single title bar, close X and document control remain visible. Repository
design checks and lint pass; the stylesheet retains six pre-existing specificity
warnings from unrelated selectors. No mobile or target-device checks were run.
