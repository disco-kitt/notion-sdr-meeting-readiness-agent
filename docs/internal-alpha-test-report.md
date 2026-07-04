# Internal Alpha Test Report: SDR Meeting Readiness Agent

**Report date:** July 3, 2026  
**Product stage:** Release-candidate interactive prototype derived from Sprint 2
**Build assessed:** Local source and production static export  
**Alpha outcome:** Pass with conditions; not yet ready for an external beta

## Executive Summary

The SDR Meeting Readiness Agent presents a coherent, polished prototype for moving an SDR from pre-meeting research through readiness review, brief creation, sharing, and post-meeting reflection. The strongest product decision is its explicit five-part readiness model—research, signals, stakeholders, questions, and brief review—which turns a broad “prepare for the meeting” task into a visible sequence with clear completion criteria ([`lib/meeting-readiness.ts`, lines 22–90](../lib/meeting-readiness.ts#L22)).

The current implementation is technically healthy as a front-end prototype: strict TypeScript checking passed, and the Next.js production build compiled, type-checked, generated, and statically exported successfully. The experience also contains meaningful usability and accessibility work, including responsive navigation, semantic Radix UI primitives, visible focus treatment, reduced-motion handling, live status announcements, labeled icon buttons, and guardrails around AI-generated material.

This is not a production-capable agent. Research, account data, stakeholders, AI synthesis, CRM changes, Notion copy, teammate sharing, clipboard, and export actions are simulated with local React state and fixed mock data. The current UI labels these outcomes as demonstration or session-only behavior and explicitly states when nothing was sent or written. There is no authentication, persistence, API layer, evaluation harness, automated test suite, or runtime error handling. Beta promotion should therefore be limited to a clearly labeled, moderated prototype study until real integrations and trust controls exist.

## Testing Methodology

The alpha review used the repository and generated output as the source of truth rather than relying on feature descriptions.

- Inspected the Next.js App Router entry points, component hierarchy, state transitions, UI primitives, Tailwind styles, mock data, readiness logic, and Sprint 2 user-flow diagrams.
- Traced the main journeys represented in the code: progressive research, overview review, signal and stakeholder confirmation, discovery-question curation, brief generation/editing/sharing, readiness completion, and post-meeting reflection.
- Reviewed responsive behavior encoded at Tailwind breakpoints and the mobile navigation dialog.
- Performed a static accessibility review covering document language, headings, native controls, accessible names, keyboard affordances, focus styles, status announcements, reduced motion, dialog behavior, and drag-and-drop alternatives.
- Ran `pnpm check`; `tsc --noEmit` completed successfully.
- Ran `pnpm build`; Next.js 15.5.20 compiled successfully, completed type validation, generated four static pages, and exported the site. The `/` route measured 107 kB with 209 kB first-load JavaScript in the build output.
- Inspected the resulting static export under `out/`.

The in-app browser automation interface was not available in this assessment session. Consequently, this report does not claim completed cross-browser, screen-reader, visual-regression, touch-device, or live keyboard-path testing. Those items remain beta prerequisites.

## Scope

### Included

- Primary pre-meeting workspace and navigation.
- Progressive research state and source-status communication.
- Meeting readiness calculation and gating.
- Account overview, evidence disclosure, strategic signals, stakeholders, and discovery questions.
- Meeting brief generation, editing, section management, review, sharing, copying, and export affordances.
- Post-meeting reflection, assumption feedback, and CRM draft review.
- Responsive implementation and reusable UI primitives.
- Static accessibility and usability review.
- Type-check and production-build verification.
- Alignment with the documented Sprint 2 journey maps in [`sprint-2-user-flows/`](../sprint-2-user-flows/README.md).

### Excluded or unavailable

- Real calendar, CRM, LinkedIn, web-research, Notion, messaging, clipboard, or PDF integrations.
- Model prompts, retrieval logic, source verification, prompt-injection defenses, or AI-quality evaluations.
- Authentication, authorization, tenancy, privacy, retention, and production telemetry.
- Automated unit, integration, end-to-end, accessibility, performance, and visual tests.
- Live browser and assistive-technology execution.

## Findings

### Functional and product findings

1. **The core workflow is understandable and internally consistent.** The five readiness requirements are centralized in `buildMeetingReadiness`, and each item links to an actionable tab. The UI exposes this model in the meeting header and readiness panel ([`components/readiness-panel.tsx`, lines 10–120](../components/readiness-panel.tsx#L10)).

2. **Progressive disclosure is handled well.** Research begins at 46% and advances on a timer, while the user can review completed material. The research banner communicates source-level states and converts to a compact synced state at completion ([`components/research-banner.tsx`, lines 17–104](../components/research-banner.tsx#L17)). Overview content progressively reveals a changed recommendation once the high-impact signal arrives ([`components/views/overview-view.tsx`, lines 168–182](../components/views/overview-view.tsx#L168)).

3. **The experience appropriately asks the SDR to verify AI output.** Evidence can be expanded on the “why now” narrative, signal confidence is translated into plain-language labels, and the brief explicitly states that it is a demonstration AI draft assembled from sample sources and should be verified before sharing ([`components/views/meeting-brief-view.tsx`, lines 113–160](../components/views/meeting-brief-view.tsx#L113)).

4. **User control is stronger than a one-click automation pattern.** SDRs can edit synthesized text, choose discovery questions, add or remove brief sections, keep a draft, review assumptions, and approve, edit, discard, or restore the CRM draft. This is especially appropriate for high-consequence customer and CRM data ([`components/reflection-workspace.tsx`, lines 61–154](../components/reflection-workspace.tsx#L61)).

5. **The implementation matches most documented Sprint 2 flows.** The prototype covers prepare-for-discovery, research-still-running, build-and-share, and post-meeting-reflection journeys documented in [`Sprint2-User-Flows-Mermaid.md`](../sprint-2-user-flows/Sprint2-User-Flows-Mermaid.md).

6. **The build is reproducible but the quality gate is shallow.** The package exposes build and TypeScript checks, and both passed. However, `lint` is an alias for `tsc --noEmit`, so no ESLint or equivalent code-quality rules run. No test framework or test files are present ([`package.json`, lines 5–33](../package.json#L5)).

### Accessibility and usability findings

- Positive: the root document declares English, supplies descriptive metadata, and uses native `button`, `input`, and `textarea` controls ([`app/layout.tsx`, lines 4–13](../app/layout.tsx#L4)).
- Positive: global focus-visible styling and a reduced-motion media query are defined ([`app/globals.css`, lines 40–61](../app/globals.css#L40)). Framer Motion components commonly consult `useReducedMotion`.
- Positive: Radix Tabs, Dialog, and Dropdown Menu provide keyboard-aware semantics and focus management. The mobile navigation dialog includes a hidden title and description, plus explicitly labeled open and close buttons ([`components/meeting-prep-app.tsx`, lines 223–231](../components/meeting-prep-app.tsx#L223)).
- Positive: transient feedback uses `role="status"` and `aria-live="polite"`; progress exposes `role="progressbar"`, contextual labels, and current values ([`components/meeting-prep-app.tsx`, lines 234–247](../components/meeting-prep-app.tsx#L234); [`components/ui/progress.tsx`, lines 5–13](../components/ui/progress.tsx#L5)).
- Positive: selection and confirmation controls expose `aria-pressed`; collapsible sections expose `aria-expanded`; icon-only controls generally receive accessible labels.
- Positive: small-screen layouts collapse side navigation into a dialog, stack action groups, simplify secondary metadata, and make tabs horizontally scrollable with an overflow cue ([`components/meeting-workspace.tsx`, lines 53–73 and 122–148](../components/meeting-workspace.tsx#L53)).
- Positive: brief sections provide keyboard Move up/Move down controls and announce their new position, while retaining pointer drag-and-drop ([`components/views/meeting-brief-view.tsx`, lines 99–110 and 139–150](../components/views/meeting-brief-view.tsx#L99)).
- Positive: the Overview meeting-notes and Brief private-notes textareas have explicit accessible labels.
- Gap: the meeting page and generated brief can expose two top-level `h1` elements, weakening heading structure for assistive-technology navigation ([`components/meeting-workspace.tsx`, line 84](../components/meeting-workspace.tsx#L84); [`components/views/meeting-brief-view.tsx`, line 135](../components/views/meeting-brief-view.tsx#L135)).
- Gap: much supporting copy uses 10–11 px text and low-emphasis muted colors. Contrast and readability need measurement in the rendered browser at 200% and 400% zoom; static inspection cannot establish WCAG 2.2 AA conformance.

## Issues Identified

| ID | Severity | Issue | Evidence and impact |
| --- | --- | --- | --- |
| ALPHA-01 | Critical for external beta | External integrations and AI behavior are simulated. | [`lib/mock-data.ts`](../lib/mock-data.ts) contains all signals, stakeholders, questions, brief content, and research activity. No API routes, server actions, fetch calls, model calls, or persistence layer exist. Product accuracy, freshness, privacy, and integration reliability are untested. |
| ALPHA-02 | Resolved for moderated prototype use | Integration actions are simulated. | Copy to Notion, teammate sharing, note saving, clipboard copy, PDF export, and CRM approval remain local simulations, but their dialogs, inline disclosures, and status messages now explicitly identify demonstration, session-only, or no-send/no-write behavior. Real integrations remain a production prerequisite. |
| ALPHA-03 | High | No automated regression or accessibility suite exists. | `package.json` contains only dev, build, and TypeScript scripts. Readiness edge cases, state transitions, dialogs, keyboard behavior, and critical journeys are not protected. |
| ALPHA-04 | Resolved | Brief reordering needed a keyboard alternative. | Every section now has contextual Move up/Move down controls, disabled boundary states, and a polite live positional announcement. |
| ALPHA-05 | Medium | Brief generation can complete automatically, bypassing the explicit generation action. | When research reaches 100%, the app sets `briefGenerated` to true and announces that the draft is ready ([`components/meeting-prep-app.tsx`, lines 77–82](../components/meeting-prep-app.tsx#L77)). This can skip the “Generate brief” interaction in [`MeetingBriefView`](../components/views/meeting-brief-view.tsx#L58) and makes the mental model ambiguous. |
| ALPHA-06 | Medium | User edits and workflow state are not persisted. | All state is component-local React state. Refreshing the page resets research, question selection, review state, notes, edits, share state, and reflection decisions. |
| ALPHA-07 | Resolved | Some textareas lacked programmatic labels. | Overview notes, private brief notes, share notes, CRM fields, and reflection fields now expose contextual accessible names. |
| ALPHA-08 | Resolved | Readiness state could become stale after content changes. | Editing, adding, removing, blank-starting, or reordering brief content now invalidates brief review and returns a stale Ready status to Draft. Other readiness regressions also clear Ready. |
| ALPHA-09 | Medium | Generated brief content is not actually derived from selected questions or live research. | The selected count changes explanatory copy, but the generated blocks come from the fixed `initialBrief` array ([`components/views/meeting-brief-view.tsx`, lines 48 and 74–80](../components/views/meeting-brief-view.tsx#L48)). |
| ALPHA-10 | Low | Heading hierarchy can be clearer. | The meeting shell and brief document both render `h1`; card headings also begin at `h3` through the shared `CardTitle` primitive without always having an intervening `h2`. |
| ALPHA-11 | Low | “Lint” does not perform linting. | Both `lint` and `check` execute TypeScript only, which can create a false expectation in CI or documentation. |

## Improvements Implemented

The repository does not include usable commit history in this workspace, so chronological “before versus after” claims cannot be verified. The following improvements are demonstrably present in the audited implementation and represent meaningful maturation beyond a static happy-path mockup:

1. **A centralized readiness model** now translates five preparation requirements into completion, percentage, remaining count, next action, and ready state.
2. **Non-blocking progressive research** lets SDRs work while sources continue updating, with loading, updating, completed, high-impact, and synced states.
3. **Source and confidence transparency** surfaces source categories, timing, evidence lists, confidence labels, and a clear AI-draft verification warning.
4. **Human review and reversibility** allow inline editing, question selection, section removal/addition, draft sharing warnings, CRM edit/discard/restore, and explicit approval.
5. **Responsive information architecture** provides desktop side navigation, mobile modal navigation, horizontally scrollable tabs, stacked mobile actions, and responsive two-column workspaces.
6. **Accessibility foundations** include semantic Radix primitives, native controls, visible keyboard focus, reduced-motion support, accessible names on icon buttons, pressed/expanded states, progress semantics, and polite live announcements.
7. **Clear empty and partial states** cover still-running research, partial brief generation, blank brief creation, loading skeletons, disabled completion actions, and draft-sharing warnings.
8. **Post-meeting learning loop** extends the product beyond preparation by collecting concise reflection notes, validating assumptions, and reviewing a controlled CRM draft.
9. **Technical hardening** includes strict TypeScript, React Strict Mode, reusable UI primitives, responsive design tokens, and a verified static production export ([`tsconfig.json`, lines 3–20](../tsconfig.json#L3); [`next.config.mjs`, lines 1–8](../next.config.mjs#L1)).

## Remaining Limitations

- All business data and agent outputs are hard-coded examples; the prototype does not prove data quality or model utility.
- Integration actions do not perform real work and should be labeled “Simulated” or disabled outside moderated testing.
- There is no persistence, undo history for most edits, autosave, conflict handling, or offline/retry behavior.
- There are no authentication, permissions, tenant-isolation, secret-management, audit-log, privacy, or retention controls.
- There is no production provenance model beyond display strings; users can inspect sample titles, dates, locations, excerpts, and generic example-domain links, but cannot open exact source records or resolve conflicting evidence.
- There is no prompt-injection defense, model-output schema validation, groundedness measurement, hallucination evaluation, or sensitive-data policy enforcement.
- Loading is deterministic and timer-driven; network latency, partial API failure, rate limiting, expired credentials, and stale data are not represented.
- Readiness completion is rule-based and now invalidates after relevant edits, but it still does not measure factual quality or actual user comprehension.
- Copy, sharing, export, CRM queueing, and Notion workflows are unverified.
- Automated unit, component, integration, end-to-end, accessibility, visual, and performance tests are absent.
- Browser, screen-reader, keyboard-only, touch, zoom/reflow, contrast, and cross-browser testing remain to be completed.
- The 209 kB first-load JavaScript result is acceptable for an alpha prototype but should be monitored as production integrations and analytics are added.

## Overall Assessment

The prototype is successful as an internal alpha artifact. It demonstrates a credible workflow, strong information hierarchy, careful progressive states, appropriate human oversight, and unusually good accessibility foundations for this stage. The code is compact, understandable, strictly typed, and production-buildable.

Its greatest risk is trust calibration. The interface now repeatedly labels sample data and simulated outcomes, but its polished connected-product framing can still outpace its actual capabilities. For moderated internal evaluation this is manageable when participants are told that no data leaves the prototype. For any unmoderated or customer-facing beta, fixed evidence, absent persistence, and unavailable integrations would still produce misleading expectations and potentially unsafe workflow behavior.

## Recommendation for Beta Readiness

**Recommendation: Ready for a moderated internal design beta only; not ready for an external or production-data beta.**

Before external beta promotion, complete these release gates:

1. Connect at least one end-to-end data path—calendar/CRM input through grounded research and a persisted brief—with clear source links and freshness metadata.
2. Replace simulated success messages with real integrations, or visibly label every unavailable action as a prototype simulation.
3. Add persistence, error states, retries, timeouts, cancellation, and recovery for research, generation, sharing, export, and CRM operations.
4. Add unit tests for readiness rules and stale-review invalidation; component tests for editing and dialogs; and end-to-end tests for preparation, partial research, brief sharing, and reflection.
5. Add automated accessibility checks plus manual keyboard, VoiceOver, contrast, zoom/reflow, and mobile touch testing; validate the implemented reorder controls, labels, focus behavior, and live announcements with assistive technology.
6. Establish AI evaluation criteria for groundedness, attribution, freshness, uncertainty, harmful or sensitive output, and prompt-injection resistance using representative SDR scenarios.
7. Implement authentication, least-privilege authorization, tenant isolation, auditability, and explicit handling rules for CRM, calendar, and prospect data.
8. Clarify brief-generation semantics: either auto-generate and label it as such, or require an explicit user action consistently.
9. Add true linting and make build, lint, type-check, tests, and accessibility checks required CI gates.

With those conditions met—and after a live usability and assistive-technology test pass—the product would be a strong candidate for a limited external beta.
