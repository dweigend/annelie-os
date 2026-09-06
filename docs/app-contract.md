# Independent local application contract

Status: proposed v1, to be validated against real Letter-Lerner before freezing.

## Ownership and installation

Each external app owns its source repository, dependency lockfile, production
build, startup command, assets, persistent data and release version. The shell
registers installed apps by configuration, never by importing their source.

Installation means an administrator installs a pinned release, configures its
loopback port and external data directory, starts its independent process,
checks health, and registers its manifest. Ubuntu service orchestration belongs
to the device repository. Do not build an in-app package store or allow manifests
to execute shell commands.

Update an app independently: back up data, stage the new version, stop only that
service, switch release, start and check readiness, then record the revision.
Keep a previous release and account for data-schema compatibility in rollback.
Removing registration or uninstalling binaries must not delete authored data.

## Manifest proposal

The following is illustrative configuration, not an implemented or currently
supported Letter-Lerner endpoint:

```json
{
  "schemaVersion": 1,
  "id": "letter-lerner",
  "label": "Letter-Lerner",
  "icon": "book-open",
  "origin": "http://127.0.0.1:3001",
  "entryPath": "/?embedded=1",
  "healthPath": "/healthz",
  "bridgeVersion": 1,
  "release": "pinned-release-or-commit"
}
```

Validate schemas, unique IDs/ports, supported bridge versions, local origins,
relative paths and a finite icon allowlist. Keep user-editable runtime manifests
outside the app bundle; ship examples only. An app can run standalone without
Annelie OS. Installation registers the actual release, not the illustrative
string above. The editor is a built-in route, not an extra server.

## Embedding and navigation

Annelie OS owns the entire outer window: a 32 px title bar with the app name,
an always-visible X, resize handles and a content area. The X is a shell button
above the iframe, never part of the game DOM. Do not replace it with a home icon
or a preview label. Embedded mode suppresses
redundant app-level framing and adult links but keeps the game fully usable.
Each app applies agreed visual tokens in its own stylesheet; the shell must not
attempt cross-origin CSS injection. Only the active game is mounted initially;
its persistent learning state survives leaving and reopening it.

Verify app response headers permit the configured shell origin in
`frame-ancestors`; remove conflicting `X-Frame-Options` only as a deliberate
app-specific configuration. Shell CSP allows only registered frame origins.
Start with `sandbox="allow-scripts allow-same-origin"` for separately originated
apps; add only capabilities proven necessary, such as forms. Do not grant top
navigation, popups or full-screen access that could cover the window X.
Test audio activation and storage with actual Chrome settings. Different ports
do not isolate cookies, so any future cookies need deliberate scoping.

An embedded view is not an Ubuntu or browser security boundary. Child/adult
access must be enforced server-side where needed; merely hiding a link or
checking for a loopback address is insufficient for the kiosk user.

## Window behavior across independent servers

Production address defaults remain shell `http://127.0.0.1:3000`, Letter-Lerner
`http://127.0.0.1:3001`, and arithmetic `http://127.0.0.1:3002`. These are
independent processes and origins; the shell's resize and close controls do not
require CORS access to the game's DOM or cooperation from its JavaScript.

The shell renders this ownership structure using its existing window component:

```text
Annelie OS window
┌────────────────── Schreibspiel ─────────────── X ┐
│ iframe: http://127.0.0.1:3001/?embedded=1          │
│ Letter-Lerner owns only this content area        │
└─────────────────────────────────────────────────┘
```

- Launch opens the shell window; only its content loads from the registered
  game origin. Never navigate the top-level kiosk page to the game URL.
- Resize changes the iframe's available width and height without changing its
  src or remounting it. The game adapts to its own viewport using normal layout.
- X immediately returns focus to the original desktop icon. It must not wait
  for a game's message, save acknowledgement, ready event or healthy server.
- Closing an external game removes its iframe, stopping its audio and timers.
  Its independently managed local server stays running. An app must persist
  progress during play, not solely on unload; reopening restores that progress.
- The built-in editor retains its draft model across window closure. The current
  design preview retains the editor iframe; production storage remains separate.
- The parent window stays usable during loading, embedding rejection or server
  failure. The retry action reloads only the game content. Use bounded readiness
  handling; iframe load alone is not proof that a game is ready.
- Do not grant fullscreen or top-navigation permissions to the game. Hiding its
  internal chrome requires a supported embedded mode inside its own repository;
  the shell cannot reach across origins to remove a duplicate title bar.

### Letter-Lerner source review, 2026-09-06

Reviewed GitHub main at
[`2f81836`](https://github.com/dweigend/letter-lerner/tree/2f81836f39c78952b7785a8ad23ef632593d0b11).
The inspected root layout simply renders app content. The level layout connects
its practice-session store to window.localStorage and renders children when
ready. Its invalid-state view can link to the admin area. The inspected server
hook restricts admin access by loopback address but does not set embedding
response headers. Production response headers still need direct verification.

The sibling local checkout is on `feat/nixos-kiosk-runtime` with a different
runtime setup; it is not evidence of current main. Neither checkout nor Ubuntu
was modified for this source review. No live Letter-Lerner iframe was verified.

For the integration milestone in Letter-Lerner's own repository:

1. Add or confirm an embedded child entry mode that remains effective through
   internal navigation; a query parameter on the first page alone is insufficient
   if later navigation drops it. Preserve standalone operation.
2. Hide duplicate outer chrome and adult navigation in embedded child mode,
   while keeping server-side adult access separate from this visual treatment.
3. Permit the exact shell origin through response CSP frame-ancestors and check
   for conflicting X-Frame-Options. Local preview origins are development config,
   not hard-coded production permissions.
4. Confirm ready signaling, progress persistence and audio in the separate-origin
   iframe. The close button itself needs no message protocol or game callback.
5. Run the real game inside the shell and check opening, resizing, closing,
   silence after close, progress after reopening, and failure/retry behavior.

## Optional bridge

Use browser `postMessage` only for integration needs that cannot be met by the
shell's own navigation. Proposed envelope:

```json
{
  "channel": "annelie-os",
  "version": 1,
  "appId": "letter-lerner",
  "type": "ready"
}
```

Initial messages: app-to-shell `ready` and `request-home`. Add shell-to-app
initialization only if needed for theme negotiation; do not create a generic
RPC framework. Validate envelope schema, `event.origin`, expected iframe
`event.source`, active app ID and protocol version. Send to an exact
`targetOrigin`, never `*`. Messages must not grant file or process access.

The v1 design system proposes a negotiated shell-to-app `appearance` message
containing design version, `day`/`evening` and reduced-motion preference. Adopt
it only when both peers support it; it is not yet implemented in Letter-Lerner.
See [design integration](design/system.md#independent-app-integration). Each
app bundles its supported tokens locally rather than loading runtime CSS from
the shell or GitHub.

## Readiness and failures

The app's proposed `/healthz` reports whether its required assets/data loaded;
the bridge `ready` reports rendered UI readiness. They are separate signals.
An iframe `load` event does not prove success. Use bounded startup timeouts and
four blinking dots while waiting and only a `Noch einmal` button after failure.
The window X remains active in every state; no visible loading/error prose.

Perform health requests through the shell server against validated configured
origins, never an arbitrary URL supplied by a browser request. Limit response
size, timeouts and redirects. This avoids requiring broad CORS permissions on
each app. Recheck after a crash and prove service restart recovers the view.

## Compatibility checks

Test an actual child game session in standalone and embedded mode: keyboard,
pointer, sound, persisted progress, nested navigation, reload, unavailable
service, incompatible messages, blocked parent navigation, returning home,
restart and offline operation. A development fixture validates protocol error
cases but does not substitute for the real Letter-Lerner integration.

## References

- [MDN iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe)
- [MDN postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
- [SvelteKit Node server deployment](https://svelte.dev/docs/kit/adapter-node)
