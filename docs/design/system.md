# Annelie OS design system

Version 1.0.0 · 2026-09-06 · Derived from David's eight supplied references.

This specification replaces the earlier three exploratory concepts as the
implementation baseline. David selected the supplied reference family as the
direction; the precise consolidation below is the design work delivered from
that request, not a claim that every detail has received separate approval.

## Deliverables and authority

1. This specification defines product patterns and decisions.
2. `src/app.css` is the canonical implementation of tokens and specimen styles.
3. `design/tokens.json` is a reproducible, versioned export for independent apps.
4. [The interactive catalogue](catalogue.html) demonstrates the visual result.
5. [Assets and provenance](assets.md) identifies reusable files and references.
6. [Verification](verification.md) records checks and their limits.

The catalogue is a design document with interactive specimens. It is not the
finished shell, editor, game, installer or kiosk session.

## Visual identity

**A familiar little place to learn.** Use a quiet illustrated lakeside world,
warm paper, rounded legible typography and tactile objects that are easy to
recognize. The character is curious and gentle, never a reward dispenser or
an authority that evaluates the child.

Project/repository name: **Annelie OS**. The desktop has no visible heading. Stable app labels: **Texten**, **Rechnen**,
**Schreibspiel**. `Schreibspiel` is the child-facing name for the independently
maintained `letter-lerner` app; it does not narrow that app's practice modes.
Keep internal app IDs and repository names unchanged.

### Reference reconciliation

| Source | Adopt | Resolve consistently |
| --- | --- | --- |
| 01 Desktop exploration | Window softness and familiar app objects | Do not carry over Apple branding, Finder, generic menus or extra installed apps |
| 02 Home and apps | Three launchers, large analog clock, calm paper workspace | Choose the lake setting as the default, not alternating room and lake styles |
| 03 States and personality | Evening mood, discreet cat, launch and farewell patterns | No fabricated progress percentages, automatic shutdown, compulsory mascot interaction or scope expansion |
| 04 System board | Main composition, lake palette, generous space | Replace promotional paragraphs with a small number of real controls |
| 05 App family | Ivory tiles, blue typewriter, arithmetic discs, colored ABC | Typewriter identifies Texten; pencil remains the future quick-note symbol |
| 06 Clock study | Cream dial, red/blue hands, yellow center | Short red = hours; long blue = minutes, consistently and mathematically correct |
| 07 Character sheet | Existing charcoal/cream cat identity | Retained as an unused reference; no mascot in the current home scene |
| 08 Notebook editor | Ring-bound paper, typewriter face, one menu control | Supersedes the earlier sidebar and framed-editor design |

Visible images are evidence of style, not instructions to add every depicted
feature. No Apple logo, browser address bar, desktop escape, nonfunctional
traffic lights, redundant settings, store, music or photos app is introduced.

## Foundations

### Color

Primitive decorative palette: sky `#A1D3E9`, cream `#FFF1D2`, sage `#A6C598`,
lake `#548D7D`, blue `#8FC7FA`, yellow `#FFCE62`, coral `#FF7B80`, teal
`#31BEC1`. These values are a coherent interpretation of the references, not
claimed pixel-exact extraction. Raster artwork contains a wider natural range.

| Semantic role | Day | Evening |
| --- | --- | --- |
| Canvas | `#F6F4EE` | `#172238` |
| Surface | `#FFFCF7` | `#24324A` |
| Writing paper | `#FFFFFF` | `#1C2940` |
| Primary text | `#202C3B` | `#F9F4E9` |
| Secondary text | `#546173` | `#BDCADB` |
| Action | `#17689E` | `#96CEF5` |
| Text on action | `#FFFFFF` | `#172238` |
| Selection fill | `#DCEEFA` | `#334E69` |
| Keyboard focus | `#075DBE` | `#FFD46C` |
| Success text | `#226743` | `#A9DFB5` |
| Warning text | `#805413` | `#FFDC94` |
| Error text | `#AD303E` | `#FFB4BC` |

Use semantic tokens in components, never a decorative color as a substitute for
an action or error token. Pair feedback text with its corresponding soft fill.
Use real text and/or an icon as well as color. Keep control boundaries distinct;
the lower-contrast divider token is only for decorative separation.

Keep text on quiet, high-contrast areas. Leave the open sky free of greeting text,
cards and subtitles. Program launchers show only their icons, without captions or
label pills. Their accessible names remain available to assistive technology. Editor text sits on quiet, almost-white notebook paper. Do not add
containers to solve visual hierarchy that the mockups already resolve with
space. See [measured semantic pairs](contrast.md); raster surfaces still need
a direct visual comparison at the actual laptop size.

### Typography

Use locally bundled **Nunito Variable** for system controls, with `ui-rounded,
system-ui, sans-serif` as fallback. It matches the friendly rounded source
family without relying on a Mac-only font. Default weight 500; labels 750–800;
headings 750. No thin weights, all-caps child instructions or handwriting for
functional reading content. Use live text rather than text embedded in artwork. The editor is the deliberate
exception: locally bundled **Courier Prime Regular** creates the typewriter
look explicitly requested in the new notebook reference.

| Role | Desktop size | Line height | Use |
| --- | --- | --- | --- |
| Metadata | 14 px | 1.5 | Secondary save state and catalogue annotations |
| Body | 18 px | 1.5 | Short explanations, document list |
| Label | 20 px | 1.25 | App names and window title |
| Section | 28 px | 1.2 | Dialog/empty-state headings |
| Writing | 36 px | 1.6 | Courier Prime on the notebook page |
| Display | 48 px | 1.2 | Main home heading |
| Learning task | 56 px | 1.2 | Prominent arithmetic/letter task |

A single-story letterform is not a promise of pedagogical suitability. The
Letter-Lerner owner retains control of instructional glyph choices and must
test `a`, `g`, `I`, `l`, `1`, `O`, `0`, umlauts and ß with its real content.
Keep long text around 45–65 characters per line; the editor may naturally wrap
earlier with its larger type. Respect browser zoom and text enlargement.

### Space, shape and layers

Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96 px. Use 8–12 px within a
control, 16–24 px within a group, 32–48 px between groups, and 48–64 px around
a desktop scene. Radius: 8 px small details, 14 px controls, 24 px windows,
fully rounded label pills. The sculpted icon tile radius is part of the art.

Interactive hit targets are at least **48 × 48 px**, and learning keys at
least **56 × 56 px**, with 8 px minimum separation where adjacent targets
could be confused. This project deliberately exceeds the baseline WCAG target
size criterion. Shadows have three roles only: small control lift, broad
window separation, modal elevation. No nested raised panels.

Layers: wallpaper 0, active window 10, in-window notice 20, modal 30. Native
dialog top-layer behavior takes precedence over CSS stacking. Do not place
mascots, game overlays or app fullscreen controls above the home navigation.

### Motion, sound and themes

120 ms control feedback; 180 ms panel transition; 240 ms scene transition;
ease `cubic-bezier(0.2, 0, 0, 1)`. Launcher hover may rise 4 px; pressing
settles 1 px. Never loop decorative animation or shake errors. Honor
`prefers-reduced-motion` by removing movement and animation. App loading uses
four blue dots in a horizontal row below the app icon, blinking gently in
sequence (1.8 s cycle, 300 ms stagger; 18 px dots, 14 px gaps). No visible loading text or progress bar.
Keep a screen-reader-only status; reduced motion shows four static dots.
This applies to program loading, not an additional OS startup screen.

Day is the default. Evening changes semantic tokens and the landscape
wallpaper while keeping layout, app icon identity and control positions stable.
Do not infer a sleep schedule or auto-switch while a child is typing. The
catalogue toggle is a review control; where/how a parent selects a theme is a
later implementation decision. Keep the clock face ivory in both themes.

No UI sounds are required for the shell. Game audio follows explicit user
activation and the app's volume preference. Never use sound alone for feedback.
The mascot does not speak or interrupt writing.

## Official identity and kiosk entry

The surfacing whale is the official logo. The operating-system startup and its
blinking dots are already configured, as confirmed by David. Annelie OS opens
home directly when the kiosk starts, with no second splash or welcome screen.
The static logo reference is documentation only, never an app entry point.
Use the seven selectable landscapes described in [startup.md](startup.md) and
[the background chooser](startup.html). Preserve the existing OS startup setup.

## Layout and navigation

### Home

One full-viewport scene with no visible desktop heading, an analog clock upper
right and three icon-only launchers. A click or Enter/Space opens a program;
never require double-click. Initial order is Texten / Rechnen / Schreibspiel,
but icons can be freely dragged within the desktop work area.
Remember positions locally and clamp them to the visible work area on reopen
or viewport changes. A drag must not also launch the app. Alt+Arrow keys offer
a keyboard alternative for placement. Preserve the 152 px artwork proportions
and accessible program names; no visible text below the icons.

The home scene has no cat or decorative mascot. Keep attention on the three
program icons and the calm landscape. Retain the character artwork as an unused
reference asset; do not place it elsewhere automatically.

The analog clock is a real rendered component, not one of the supplied raster
clock poses. Hour angle = `(hours % 12) * 30 + minutes * 0.5`; minute angle =
`minutes * 6`, measured clockwise from twelve. No second hand or ticking. A
screen-reader label states the current local time; do not announce every tick.

### Application window

Every program, including Texten, opens inside a window above the desktop.
Use one active window at a time. Initially center it at at most 1200 px wide
with 48 px desktop margins and 12 px corners. Resize from all four edges and
four corners, keeping the opposite edge stationary. Use a discreet diagonal
grip at the bottom right and directional resize cursors. Keep at least 480 × 320 px
and 16 px clearance inside the desktop; retain geometry while closing/reopening
during the current visit. The corner grip also accepts arrow keys in 16 px steps.
Resizing must not remount the editor or reload an embedded game. The header stays 32 px high: centered 13 px program title,
an always-visible 16 px X in a 28 px button at the upper right. Give the button
a program-specific accessible name, such as Texten schließen. Closing returns
to the same desktop and restores focus to the launching icon. Browser history
buttons are never required for app navigation. Do not add fake traffic lights.

The shell owns one shared header; embedded programs render only their content.
The standalone editor preview supplies its own identical header, while embedded
mode hides that header. Keep editor drafts alive when the window is closed and
reopened. The current preview retains its iframe for this purpose; persistent
production document storage remains a separate implementation milestone.

### Texten — a ring-bound writing page

David explicitly restored the ring notebook as the editor's decorative exception.
Reuse `static/design/notebook-paper.png`: muted brass rings across the top,
almost-white textured paper, rounded corners and its modest baked shadow.
The notebook sits inside the shared resizable program window. Start with an empty document, without example
text or placeholder copy. Use locally bundled Courier Prime Regular at 36 px,
line height 1.6, dark charcoal text and a normal live caret. The typewriter
character comes from the typography alone.

The page fills the window below its slim title bar. Keep the binding in a fixed-height
upper image slice so vertical resizing does not elongate the rings. Give writing
8% horizontal margins, 128 px above
and 48 px below. Show one small 20 px document icon at the upper right, within
an invisible 48 px click target, with the accessible name Meine Texte.
It directly opens the document list; do not require another menu step.
New text stays inside that temporary panel; the always-visible title-bar X
closes the editor and returns to desktop. Use a flat white
panel, fine gray border, minimal rounding and no shadow.

Apart from the program title and X, no permanent sidebar, document list,
home button, toolbar, save label,
character count or explanatory UI copy. Close the document panel after selection,
when returning to writing or on Escape. Keep visible keyboard focus on controls.
Normal saved status stays quiet; a genuine save failure may surface a concise
recovery notice without clearing the draft or falsely claiming success.

The standalone design preview is [editor.html](editor.html). Its text is live
but held in memory only. It demonstrates appearance and document selection,
not production persistence. Plain text is the selected interaction style.

### Target hardware and layout

Optimize for the existing old MacBook Air in landscape Chrome kiosk mode. Use
1440 × 900 as the current design/comparison viewport; confirm the actual running
kiosk viewport during device integration. There is no mobile product scope.
Do not spend implementation time on phone layouts or mobile test matrices.

Let the white writing surface fill the laptop display and retain comfortable
text margins. Keep functional elements flat and free of extra decoration.
Avoid WebGL, animated blur, a full window manager or continuous effects. Use
static art, one active application, local fonts and restrained interaction.
The clock updates at minute-level frequency, without a ticking second hand.

## Component and behavior catalogue

| Component | Variants / states | Accessibility and behavior |
| --- | --- | --- |
| AppLauncher | Rest, hover, pressed, focus, unavailable | Button with visible app name; unavailable reason remains discoverable |
| SystemWindow | Editor, game, loading, failure | One slim header with title and always-visible X |
| Button | Primary, secondary, quiet, destructive; disabled | Native button, one primary action per decision, visible focus |
| IconButton | Back, home, audio, retry | 48 px target, accessible action name, 24 px Lucide icon |
| SegmentedChoice | Day/evening, selected/unselected | Pressed buttons for independent specimen toggles; use proper radio/tabs pattern in product as appropriate |
| TextField | Empty, filled, focused, invalid, disabled | Persistent label, associated error, no placeholder-only labels |
| NotebookEditor | Empty, writing, menu open, recovery | Native textarea, Courier Prime, one menu; no resting chrome |
| DocumentRow | Selected, unselected, long title | Appears only inside the editor menu; never a permanent shelf |
| LearningKey | Available, selected, pressed | At least 56 px; selection uses shape/outline as well as color |
| LetterSlot | Empty, filled, active, retry | Dashed outline for empty; text input/select alternative to dragging |
| SaveStatus | Draft, saving, saved, failed | Polite announcements for meaningful changes, never every keystroke |
| Notice | Info/warning, error, success, recovery | Short reason and next action; error persists until resolved |
| Dialog | Trash confirmation, conflict/recovery | Labeled dialog, focus contained, Escape cancels, focus returns |
| LoadingView | Indeterminate, bounded timeout | Real readiness only; no invented percentage; home remains active |
| EmptyView | No documents, unavailable app | One explanation and a clear primary next action |
| AnalogClock | Day/evening, local time | Consistent hand mapping and accessible time, not an image |
| Companion | Optional peeking pose | Decorative, no focus, no blocked task or forced interaction |

### State copy and recovery

| Condition | German copy | Available action / rule |
| --- | --- | --- |
| No documents | No illustration or explanatory text | Only Neuer Text with a small plus icon |
| App starting | Four blinking dots; no visible text | Window X remains active |
| App unavailable / timed out | No illustration or explanatory text | Only Noch einmal with retry icon; window X remains active |
| App absent | Dieses Spiel ist noch nicht eingerichtet. | Zuhause; no installer shown to child |
| Saving | Wird gespeichert … | Writing continues |
| Durable save | Gespeichert | Check icon plus text |
| Save failed | Dein Text wartet noch aufs Speichern. | Noch einmal; draft retained |
| Recovered draft | Dein Text ist wieder da. | Weiter |
| Conflicting revisions | Es gibt zwei Fassungen. | Ansehen; preserve both |
| Move to trash | Text in den Papierkorb? | Behalten first; In den Papierkorb second |
| Retry learning answer | Versuch es noch einmal. | No shame, negative score or shaking UI |
| Future shutdown | Auf Wiedersehen! | Only after a real acknowledged device action |

Do not use emergency red for an incorrect learning answer; error colors belong
to data/process failures. Do not announce success or show progress without
evidence. Add concise explanatory adult diagnostics outside the child surface.

## Independent app integration

Keep the app/runtime contract in [app-contract.md](../app-contract.md). Share
tokens as a pinned design version, not runtime CSS fetched from GitHub. Each
app bundles local fonts, required art and its own styles. The shell cannot
inject styling into the separate-origin iframe.

`src/app.css` includes catalogue styles and must not be blindly copied into a
game. Consume `design/tokens.json` or extract its base/theme custom properties
into that app's existing central stylesheet. Keep reusable names prefixed
`--aos-`; application-specific tokens stay in the app's own namespace.

Extend the proposed bridge only when both peers support it: shell sends
`appearance` after the app's validated `ready` message, with protocol version,
design version `1.0.0`, theme `day` or `evening`, and reduced-motion preference.
The app accepts only known enums and its allowlisted parent origin. Do not send
arbitrary CSS or URLs. An older app retains its own supported appearance; the
shell records the mismatch for administration. No existing Letter-Lerner
support for this bridge is claimed.

Changing a semantic token's meaning or removing it requires a major design
version. Additions are minor; corrected values/assets without contract changes
are patches. Record a visual comparison whenever a consuming app updates.

## Scope and release acceptance

This system fully defines the first shell/editor design and integration-facing
components. Game mechanics remain in their own projects. Notes, rich text,
photos/music, parent settings UI and shutdown controls are extension patterns
only, not part of the committed application scope.

Before shipping an implementation, verify the actual laptop composition against the supplied mockups, typing,
menu navigation, relevant save/app behavior and real app embedding. Keep
verification proportional to the change; phone layouts and broad mobile tests
are outside this project. This design catalogue does not certify kiosk
restrictions, data persistence or complete WCAG conformance.

## Sources

- [User references and asset provenance](assets.md)
- [W3C text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [W3C target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- [MDN reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)
- [Nunito source and license](https://github.com/google/fonts/tree/5e35378e6bda803962ee6fd257e444a7d459660d/ofl/nunito)
- [Lucide icon guidance](https://lucide.dev/guide/)
