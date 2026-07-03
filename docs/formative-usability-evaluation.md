# Formative Usability Evaluation — Meeting Prep Prototype

**Evaluation date:** July 3, 2026  
**Method:** Expert simulation of five representative users  
**Prototype:** Live local meeting-preparation prototype  
**Form factors:** Desktop, 1280 × 720; mobile, 390 × 844

## Important research limitation

This was an **expert simulation, not research with human participants**. The five profiles below are independent task lenses used by the evaluator; they are not actual people, and no user behavior, preference, comprehension, or satisfaction was measured. Findings are based only on states and interactions observable in the live prototype. Statements about possible user impact are explicitly labeled as hypotheses.

## Executive summary

The prototype presents a coherent end-to-end story from account research through meeting readiness and post-meeting reflection. The main preparation path was completable, question selection enforced a clear minimum, brief content could be edited, and draft sharing disclosed both recipient and incomplete status before sending.

The highest-priority risks are in the post-meeting workflow. The reflection reached 100% and queued a Salesforce update without an explicit assumption-review action during the simulation. After final completion, a success message appeared, but the persistent “Complete reflection” control and “Due” item remained, leaving the durable state ambiguous. Secondary concerns involve verification depth for AI-generated claims, confirmation of inferred stakeholder roles, mobile navigation discoverability, and non-specific accessible names on repeated controls.

## Severity and confidence

- **S0 — Not an issue:** No usability problem observed.
- **S1 — Minor:** Noticeable friction with a low effect on completion.
- **S2 — Moderate:** Meaningful delay, uncertainty, or accessibility barrier; recovery is available.
- **S3 — Major:** High risk of an incorrect outcome, abandonment, or loss of trust.
- **S4 — Critical:** Blocks a core task with no reasonable recovery.

Confidence estimates express how strongly the observable prototype evidence supports the finding, not statistical certainty about a population.

## Simulated users and task outcomes

| Simulated user | Experience and goal | Task attempted | Observable outcome |
|---|---|---|---|
| 1. First-week SDR | Novice; wants to become meeting-ready without learning the whole system | Follow readiness guidance, review signals, confirm stakeholders, review the brief, and mark the meeting ready | **Completed.** The state advanced from 2/5 prepared to Ready. The route was understandable, though the intermediate status control was not action-oriented. |
| 2. Experienced enterprise SDR | Advanced; wants to verify AI synthesis and tailor the brief | Expand claim sources, inspect confidence, edit the meeting objective, and save it | **Partially supported.** Editing was successful. The source list exposed source categories but not enough directly inspectable evidence to independently verify the synthesis. |
| 3. Discovery-led seller | Intermediate; wants a focused, personalized question plan | Review the suggested sequence, remove a selected question, inspect the three-question minimum, and locate custom-question entry | **Completed.** The count changed from “3 selected” to “2 of 3,” and continuation was removed until the minimum could be restored. A custom-question field was present. |
| 4. Account executive collaborator | Advanced reviewer; wants to understand what will be shared and whether it is final | Review a draft, open the sharing flow, verify recipient and status, and finish review | **Completed through confirmation.** The modal named Alex Rivera, stated that a Notion notification and direct link would be sent, and warned that one preparation step remained. The final send was not executed. |
| 5. Post-meeting SDR | Intermediate; wants to capture learning and approve a CRM update quickly | Review reflection notes, edit the CRM draft, approve it, and complete the reflection | **Completed with ambiguous closure.** The update became “Approved” and “Salesforce update queued,” and a completion message appeared. The “Complete reflection” control and “Due” navigation item remained visible. |

## Findings

### F1. Assumption checks can be treated as complete without explicit review

- **Type:** Observed issue
- **Severity:** S3 — Major
- **Confidence:** 96%
- **Observed evidence:** The debrief displayed three assumptions, each with Correct, Incorrect, and Unknown choices. During the simulation, none of those controls was used. After approving the CRM draft, reflection progress changed from 86% to 100%, the draft changed to “Approved,” and the interface stated “Salesforce update queued.”
- **Hypothesized impact:** A seller may unintentionally validate inferred claims and allow unreviewed assumptions to influence CRM data or future recommendations. This is a risk hypothesis, not observed human behavior.
- **Recommendation:** Require an explicit response for every assumption, or present defaults as visibly unconfirmed. Keep approval and completion disabled until all assumptions have a deliberate state.

### F2. Reflection completion lacks a durable completed state

- **Type:** Observed issue
- **Severity:** S3 — Major
- **Confidence:** 95%
- **Observed evidence:** Activating “Complete reflection” produced the status message “Reflection complete — follow-up workspace updated.” The page still showed the enabled “Complete reflection” button, and the left navigation continued to label “Lumon debrief” as “Due.” A second activation was possible.
- **Hypothesized impact:** Users may repeat the action, question whether data was saved, or leave the task believing it is incomplete. This is a risk hypothesis.
- **Recommendation:** Replace the CTA with a persistent completed state, remove the Due badge, timestamp completion, and prevent duplicate completion actions.

### F3. Inferred stakeholder roles are confirmed as a group with no visible correction path

- **Type:** Observed issue
- **Severity:** S2 — Moderate
- **Confidence:** 92%
- **Observed evidence:** The stakeholder map assigned Maya Chen as Decision maker, Jordan Lee as Champion, and Ari Patel as Evaluator. The observable action was a single “Confirm stakeholder roles” control; no per-person edit, reject, or unknown action was visible on the map.
- **Hypothesized impact:** Users may confirm a partially incorrect buying-group model because correcting one role is not available at the moment of confirmation. This is a risk hypothesis.
- **Recommendation:** Add per-stakeholder role editing and an Unknown option. Summarize changed or unverified roles before group confirmation.

### F4. Claim-source disclosure is too shallow for independent verification

- **Type:** Observed issue
- **Severity:** S2 — Moderate
- **Confidence:** 91%
- **Observed evidence:** Expanding “High confidence · 5 sources” revealed Salesforce account activity, LinkedIn CRO role change, Acme blog enterprise launch, Careers RevOps expansion, and a Q2 expansion update. The expanded list did not expose a direct link, date, quoted evidence, or record-level detail for any source.
- **Hypothesized impact:** Experienced sellers may be unable to resolve conflicts or judge whether a source supports the exact synthesized claim. This is a risk hypothesis.
- **Recommendation:** Make each source inspectable with title, date, source location, and the evidence fragment used. Preserve the current compact summary as the default.

### F5. Repeated controls have non-specific accessible names

- **Type:** Observed issue
- **Severity:** S2 — Moderate
- **Confidence:** 98%
- **Observed evidence:** The meeting brief exposed five different controls with the same accessible name, “Edit content.” The assumption review exposed repeated Correct, Incorrect, and Unknown buttons without the assumption text in their accessible names.
- **Hypothesized impact:** Screen-reader and voice-control users may have difficulty identifying which section or assumption a command will affect. This is an accessibility risk hypothesis.
- **Recommendation:** Use contextual names such as “Edit Meeting objective” and “Mark ‘Jordan Lee is the internal champion…’ as Incorrect.”

### F6. Mobile tab overflow hides a core destination without a visible cue

- **Type:** Observed issue
- **Severity:** S2 — Moderate
- **Confidence:** 94%
- **Observed evidence:** At 390 × 844, the tab row showed Overview, Signals, Stakeholders, and only a clipped portion of Discovery questions. Meeting brief was fully offscreen. Horizontal scrolling revealed it, but the visible row had no fade, chevron, scrollbar, or other continuation cue.
- **Hypothesized impact:** Mobile users may not discover the brief or may interpret the clipped label as a layout defect. This is a risk hypothesis.
- **Recommendation:** Add an overflow cue, snap behavior, or a compact mobile section menu. Ensure the active or next required tab is automatically scrolled into view.

### F7. The readiness status control is not action-oriented

- **Type:** Observed issue
- **Severity:** S1 — Minor
- **Confidence:** 90%
- **Observed evidence:** After signals were marked reviewed, the prominent header control read “2 steps left.” Activating it returned to Overview, where a separate “Confirm stakeholders” action appeared. Later the control similarly read “1 step left.”
- **Hypothesized impact:** A first-time user may read the control as passive status rather than the route to the next task. This is a risk hypothesis.
- **Recommendation:** Label the control with the next action, such as “Next: confirm stakeholders,” while retaining the remaining-step count as secondary text.

## Positive observations

- The desktop overview clearly combined meeting identity, time, attendees, research freshness, readiness progress, and the next recommended action.
- Signal review produced immediate progress feedback: “Mark reviewed” changed to “Signals reviewed,” and the remaining-step count decreased.
- Discovery-question gating was explicit and recoverable. Removing a selected question changed the status to “2 of 3” and removed continuation until the minimum could be met.
- Brief editing supported focused, section-level revision with Save and Cancel controls.
- The draft-sharing modal named the recipient, described the notification channel, and warned that the brief was still a draft with one preparation step remaining.
- The debrief separated seller notes, assumption checking, CRM draft review, and future-learning signals into a logical sequence.
- Mobile navigation opened as a clear drawer with today’s meetings and follow-ups.

## Prioritized recommendations

1. Require explicit assumption review before CRM approval or reflection completion.
2. Make completed reflections durable and idempotent: clear Due, replace the CTA, and show a completion timestamp.
3. Add per-stakeholder correction controls before role confirmation.
4. Deepen evidence inspection for AI claims with dates, links, and supporting excerpts.
5. Give repeated edit and assumption controls unique accessible names.
6. Add an obvious continuation cue or compact menu for mobile tabs.
7. Rename readiness status controls to state the next action.

## Suggested human-participant follow-up

The hypotheses above should be tested with human participants before being generalized. A focused study could recruit new and experienced SDRs plus users of assistive technology, ask them to prepare and debrief a meeting, and measure task success, incorrect confirmations, source-verification behavior, time to locate the mobile brief, and confidence in completion state. No such participant data was collected in this evaluation.

## Scope limits

- One browser environment was evaluated.
- Desktop and one mobile viewport were tested; tablet and additional breakpoints were not.
- External integrations were not validated. The final share action was not sent, and Notion copy/export behavior was not assessed.
- Performance, authentication, multi-user collaboration, persistence across sessions, and production data quality were outside scope.
- Results describe the prototype state observed on July 3, 2026 and should not be interpreted as prevalence estimates.
