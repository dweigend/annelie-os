# Design system verification

Date: 2026-09-06. Scope: design-system delivery for the old MacBook Air.

## Visual review

The latest notebook view was compared with source 8 at 1440 × 900. It retains
the ring binding, warm paper, lake backdrop, typewriter text, live caret and
one small circular menu button. The former sidebar, title input, permanent
header, toolbar and character count have been removed from the resting view.

The home view follows the supplied lake/app/clock references. Its greeting box,
subtitle and label pills were removed in response to David's minimalism feedback.
App artwork preserves its original aspect ratios and transparency.

The notebook uses a generated blank asset derived from the source, rather than
a screenshot containing baked text or controls. The wider laptop composition
fits the same design into the actual landscape target. Paper and ring geometry
are not claimed to be a pixel-identical extraction from the source image.

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
