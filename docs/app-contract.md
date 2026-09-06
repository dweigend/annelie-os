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

The shell retains a home control outside the iframe. Embedded mode suppresses
redundant app-level framing and adult links but keeps the game fully usable.
Each app applies agreed visual tokens in its own stylesheet; the shell must not
attempt cross-origin CSS injection. Only the active game is mounted initially;
its persistent learning state survives leaving and reopening it.

Verify app response headers permit the configured shell origin in
`frame-ancestors`; remove conflicting `X-Frame-Options` only as a deliberate
app-specific configuration. Shell CSP allows only registered frame origins.
Start with `sandbox="allow-scripts allow-same-origin"` for separately originated
apps; add only capabilities proven necessary, such as forms. Do not grant top
navigation, popups or full-screen access that could cover the home control.
Test audio activation and storage with actual Chrome settings. Different ports
do not isolate cookies, so any future cookies need deliberate scoping.

An embedded view is not an Ubuntu or browser security boundary. Child/adult
access must be enforced server-side where needed; merely hiding a link or
checking for a loopback address is insufficient for the kiosk user.

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

## Readiness and failures

The app's proposed `/healthz` reports whether its required assets/data loaded;
the bridge `ready` reports rendered UI readiness. They are separate signals.
An iframe `load` event does not prove success. Use bounded startup timeouts and
a calm `Noch nicht bereit` view with retry and home actions.

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
