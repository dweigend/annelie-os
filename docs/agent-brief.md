# Local implementation agent brief

Use this brief after David selects/refines the visual target in
`docs/design/README.md`. No implementation agent has been launched during
preparation. The concrete visual choice must be recorded before UI work starts.

## Task

Complete the locally runnable Annelie OS shell and simple text editor in this
repository. Follow `AGENTS.md`, `docs/implementation-plan.md`, and
`docs/app-contract.md`. Communicate in German. Inspect the current checkout,
preserve concurrent changes, and make a checkpoint before substantial work.

First read the recorded visual decision and reproduce it consistently across
home, editor, app frame and error states. If it is still pending, obtain that
decision rather than selecting an unapproved mockup. Confirm any editor scope
proposals left open in the design decision.

Prove integration with the real Letter-Lerner on a separate loopback port early.
Keep game code and game-specific integration changes in its own repository;
preserve its standalone operation. Build the shell independently of sibling
checkouts. Prepare the same installation/registration contract for a future
arithmetic game and test it with an explicitly labeled fixture. Do not build
the arithmetic game as part of this task.

Implement the agreed editor operations with reliable local persistence,
acknowledged autosave and recovery of pending drafts. Use a plain textarea and
small separated storage/state modules. Keep all application styling in
`src/app.css`, use existing platform/component patterns, and avoid unnecessary
dependencies. Read version-appropriate official documentation before coding.

Work through every local acceptance criterion in the plan. Run mandatory lint,
type checks, relevant behavioral tests and the production build. Verify the
actual UI in a browser at the target sizes, including game failure and document
recovery. Review and simplify after each implementation pass.

Deliver the working local preview, reproducible setup and startup commands,
program integration documentation, test results and committed meaningful units.
State any unverified behavior explicitly. Leave device-specific Ubuntu setup
and deployment to the separate device repository and follow-up milestone.
