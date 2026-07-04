# Meeting Readiness Agent — 12-Persona Evaluation

**Evaluation date:** July 3, 2026  
**Method:** Expert cognitive walkthrough using 12 representative persona lenses  
**Prototype:** Live local Meeting Readiness Agent  
**Form factors checked:** Desktop (default 1280 × 720) and mobile (390 × 844)

## Research limitation

This is an expert simulation, not a study with 12 human participants. Each persona completed the same five-gate preparation path as a cognitive walkthrough—research, signals, people, questions, and brief review—followed by a separate overall meeting-readiness confirmation. The prototype was exercised live; persona-specific expectations and likely impacts are hypotheses grounded in observable interface behavior. The share confirmation was inspected but no external message was sent. Production persistence and real integrations were not validated.

## Severity scale

- **S0 — No issue:** No meaningful usability problem observed.
- **S1 — Minor:** Noticeable friction with little effect on completion.
- **S2 — Moderate:** Meaningful delay, uncertainty, or accessibility barrier; recovery exists.
- **S3 — Major:** High risk of wrong action, abandonment, exclusion, or loss of trust.
- **S4 — Critical:** Core task is blocked with no reasonable recovery.

## Shared workflow result

All 12 persona walkthroughs could technically reach the final **Ready** state. Domain fit, however, varied sharply. Sales personas generally understood the object model and sequence; adjacent professionals had to mentally translate “account,” “buying group,” “discovery,” “AE,” and Salesforce concepts into their own work. Technical completion therefore should not be read as conceptual success.

The observed readiness path was:

1. Review source-backed account research while remaining research finishes.
2. Review strategic signals and explicitly mark them reviewed.
3. Inspect and, if needed, change each participant's inferred role; confirm the map.
4. Keep or add at least three questions.
5. Review/edit the generated brief, select **Complete brief review**, then separately mark the meeting ready.

## At-a-glance persona results

| Persona | Workflow completion | Mental-model fit | Highest severity | Main reason |
|---|---|---:|---:|---|
| New SDR | Completed | High | S2 | Unexplained sales shorthand and weak evidence depth |
| Senior SDR | Completed | High | S2 | Verification and control are shallower than expert needs |
| Enterprise BDR | Completed | High | S3 | No account hierarchy, governance, or multi-threading depth |
| AE preparing for discovery | Completed | Medium-high | S2 | Sharing uses a fixed teammate rather than a role-aware recipient |
| Sales Manager reviewing readiness | Completed | Medium | S3 | Individual prep flow lacks manager review, audit, and portfolio views |
| SDR with accessibility needs | Completed with minor barriers | Medium-high | S2 | Dense microcopy and unvalidated assistive-technology behavior remain |
| University Career Advisor | Completed by translation | Medium-low | S3 | Company/buying-group model does not match student advising |
| Employer Engagement Coordinator | Completed by translation | Medium | S2 | Employer relationship work mostly fits, but sales labels distort it |
| Customer Success Manager | Completed by translation | Medium-high | S2 | Account model fits; discovery and AE-sharing assumptions do not |
| Admissions Counselor | Completed by translation | Low | S3 | Firmographic and buying-role model mismatches person/household work |
| Nonprofit Development Officer | Completed by translation | Medium-low | S3 | Commercial funnel language can damage donor-centered framing |
| Executive Assistant | Completed by translation | Medium-low | S3 | Briefing value is strong, but sales stages and question gate are alien |

## Group A — Sales professionals

### 1. New SDR

**Goal:** Become ready without already knowing the account, the organization’s sales method, or the interface.

| Task | Expectation before the task | Observed outcome |
|---|---|---|
| 1. Orient and review research | “Tell me what matters, how current it is, and what I should do first.” | Strong. Meeting identity, research freshness, progress, and a single next action were prominent. Source details included dates and evidence snippets when expanded. |
| 2. Review signals | “Explain why a change matters; do not make me infer the sales angle.” | Completed. Signals included plain-language implications and a suggested opening. “Mark reviewed” advanced readiness immediately. |
| 3. Confirm people | “Show me who these people are and let me say when the AI is unsure.” | Completed. Each buying role was editable and included **Unknown**; a changed/unverified warning appeared before confirmation. |
| 4. Curate questions | “Give me a safe sequence and prevent me from arriving with no plan.” | Completed. Three questions were preselected, rationale was visible, custom questions were supported, and the minimum was enforced. |
| 5. Review brief and finish | “Let me make small edits, then clearly tell me when I am done.” | Completed. Section edits and private notes were available. **Complete brief review** was followed by the separate **Mark meeting ready** action. |

**Usability issues and severity**

- **S2:** CRO, RevOps, ARR, buying group, champion, AE, and outbound sequence are not defined in context. A first-week rep may complete the flow without understanding the concepts being confirmed.
- **S2:** Source cards look credible but link to generic domains rather than the exact CRM record or article; novice users may over-trust the synthesis.
- **S1:** **Complete brief review** followed by **Mark meeting ready** feels like two final actions for one concept.

**Information architecture:** Strong match. It mirrors a novice’s likely sequence: why now → signals → people → questions → brief.  
**Universally valuable:** Guided readiness checklist, freshness, source evidence, question rationale, editable brief.  
**Sales-specific:** Buying roles, discovery framing, account metrics, AE handoff, Salesforce language.

### 2. Senior SDR

**Goal:** Verify the agent quickly, override weak recommendations, and avoid sounding generic.

| Task | Expectation before the task | Observed outcome |
|---|---|---|
| 1. Orient and review research | “Let me audit the claim, source, date, and evidence without losing my place.” | Partly met. Evidence is expandable and dated, but source destinations are generic and there is no conflict/recency comparison. |
| 2. Review signals | “Let me filter, save, and decide which signals actually belong in the meeting.” | Completed. High-impact filtering and save controls exist; the suggested angle can be added to the brief. |
| 3. Confirm people | “I need to correct the map person by person.” | Completed. Per-person roles and **Unknown** support expert correction. |
| 4. Curate questions | “Do not force a canned script; let me replace it with my own.” | Completed. Questions can be removed and custom ones added, but a three-question minimum remains mandatory. |
| 5. Review brief and finish | “Give me fast editing, deletion, reordering, and confidence that my version is saved.” | Mostly completed. Blocks are editable/removable/reorderable. Persistence, version history, and collaborator changes are not visible. |

**Usability issues and severity**

- **S2:** Evidence inspection does not support rigorous claim verification, source conflict resolution, or exact-record access.
- **S2:** No version history, source-to-sentence lineage, or indication of which brief text changed after late research.
- **S1:** The universal three-question minimum can conflict with a senior rep’s deliberate one- or two-question plan.

**Terminology:** Familiar; “Good confidence” and “High confidence” lack a visible calculation.  
**Information architecture:** Strong, although experts may prefer direct access to a compact brief with exceptions highlighted.  
**Universally valuable:** Evidence, deltas since last meeting, editable synthesis, private notes.  
**Sales-specific:** Signal-to-opening recommendations, buying roles, discovery sequence, account/CRM context.

### 3. Enterprise BDR

**Goal:** Prepare a credible multi-threaded enterprise conversation across a complex account.

| Task | Expectation before the task | Observed outcome |
|---|---|---|
| 1. Orient and review research | “Separate corporate, business-unit, regional, and opportunity context.” | Not met beyond a single Acme account summary. No hierarchy, subsidiaries, territories, or opportunity history are represented. |
| 2. Review signals | “Show materiality, account relevance, and whether this affects the buying committee.” | Partly met. Signals have confidence and impact framing, but not business-unit scope or contradictory evidence. |
| 3. Confirm people | “Map influence, reporting lines, existing relationships, gaps, and multi-threading risk.” | Partly met. Three roles are editable, but there are no reporting lines, relationship owners, detractors, blockers, or missing-role warnings. |
| 4. Curate questions | “Tailor questions by stakeholder and enterprise risk.” | Partly met. Questions are useful but attached to one sequence, not individual people or workstreams. |
| 5. Review brief and finish | “Produce an enterprise brief that can survive internal review.” | Completed at a basic level. The brief lacks account hierarchy, opportunity stage, legal/security context, and relationship coverage. |

**Usability issues and severity**

- **S3:** The single-account, three-person model can create false readiness for complex enterprise pursuits.
- **S2:** No missing-stakeholder or relationship-coverage analysis; “3 matched” may be read as completeness.
- **S2:** No governance or approval state for sensitive enterprise claims before sharing.

**Terminology:** Familiar, though “matched” is ambiguous: matched to what system and at what confidence?  
**Information architecture:** Good for a single discovery meeting, weak for hierarchical accounts and parallel workstreams.  
**Universally valuable:** Research freshness, evidence, role correction, editable brief.  
**Sales-specific:** Account hierarchy, opportunity, buying committee, territory and relationship coverage—needed but absent.

### 4. AE preparing for discovery

**Goal:** Own the meeting strategy, deepen discovery, and coordinate with the wider account team.

| Task | Expectation before the task | Observed outcome |
|---|---|---|
| 1. Orient and review research | “Lead with the business hypothesis and let me change the meeting objective.” | Completed. The why-now narrative is prominent and editable. |
| 2. Review signals | “Connect evidence to a hypothesis I can test.” | Completed. Signal rationale and suggested opening provide a usable bridge. |
| 3. Confirm people | “Clarify power, influence, and what each person may care about.” | Completed, with editable roles and room-navigation advice. |
| 4. Curate questions | “Build a coherent discovery arc, not a checklist.” | Mostly completed. Sequence and rationale help, but the mandatory count emphasizes quantity over coverage. |
| 5. Review brief and finish | “Share with my SE, manager, or team—not with myself.” | Core review completed, but sharing targets the fixed teammate Devon Scott rather than allowing the user to choose an SE, manager, or team. |

**Usability issues and severity**

- **S2:** The workspace remains SDR-oriented, and the fixed teammate recipient does not adapt when the preparer is the AE.
- **S2:** No meeting-type or role setup changes the generated strategy for AE-owned discovery.
- **S1:** Question quality/coverage is not evaluated; only a minimum count is enforced.

**Terminology:** Familiar. “Prepared for Devon Scott” and the fixed Devon Scott share recipient expose role assumptions.
**Information architecture:** Strong through the brief; collaboration architecture is SDR-to-AE rather than team-based.  
**Universally valuable:** Hypothesis, evidence, participant context, editable brief.  
**Sales-specific:** Discovery arc and account-team sharing; recipient logic should be role-aware.

### 5. Sales Manager reviewing readiness

**Goal:** Assess several reps’ preparation quality, coach gaps, and know who approved what.

| Task | Expectation before the task | Observed outcome |
|---|---|---|
| 1. Orient and review research | “Show which rep, which meeting, risk level, and what requires my attention.” | Partly met for one meeting only. No team queue, risk sorting, or rep ownership beyond a name in the brief. |
| 2. Review signals | “See whether the rep evaluated evidence, not merely clicked a checkbox.” | Not met. “Signals reviewed” records completion but not rationale, comments, or reviewer identity. |
| 3. Confirm people | “See corrections and coach the rep’s stakeholder hypothesis.” | Partly met. Changes are flagged before confirmation, but no audit history or manager comment path exists. |
| 4. Curate questions | “Evaluate coverage, sequencing, and coaching quality.” | Partly met. Selected questions are visible; no rubric, comments, or approval workflow exists. |
| 5. Review brief and finish | “Approve, request changes, or compare against readiness standards.” | Core individual flow completed, but manager-specific review actions are absent. |

**Usability issues and severity**

- **S3:** No manager workspace, cross-meeting queue, readiness risk view, or request-changes flow.
- **S3:** “Reviewed” is self-attestation with no audit trail, reviewer identity, evidence of judgment, or timestamp.
- **S2:** No coaching rubric or comment layer separates rep edits from manager guidance.

**Terminology:** Familiar; “readiness” is underspecified because it measures completion, not quality.  
**Information architecture:** Poor match for manager oversight; it is an individual workbench, not a review system.  
**Universally valuable:** Progress visibility, evidence, question plan, brief preview.  
**Sales-specific:** Coaching rubric, pipeline/rep rollup, manager approval—needed but absent.

### 6. SDR with accessibility needs

**Goal:** Complete preparation with keyboard, screen reader, reduced motion, zoom, or limited fine-motor control.

| Task | Expectation before the task | Observed outcome |
|---|---|---|
| 1. Orient and review research | “Expose structure, progress, labels, and updates without relying on color or motion.” | Mostly met. Headings, contextually named progress bars, focus styles, live status, and reduced-motion CSS exist. |
| 2. Review signals | “Every repeated control should identify its target.” | Completed. Save controls include the signal title, filters expose pressed state, and review status is explicit. |
| 3. Confirm people | “Role fields must name the person and support uncertainty.” | Completed. Each select is named for the person and includes **Unknown**. |
| 4. Curate questions | “Selection controls should read the full question and announce state.” | Completed. Controls include full question text and pressed state. The sticky status announces the count. |
| 5. Review brief and finish | “I need keyboard alternatives for every edit, remove, and reorder action.” | Completed in the release candidate. Edit/remove controls are contextual, and every section has Move up/Move down controls with a live positional announcement in addition to pointer dragging. |

**Usability issues and severity**

- **S2:** Implemented keyboard reordering and live announcements still require manual screen-reader and keyboard-path validation.
- **S2:** Dense 10–11 px supporting text and low-emphasis muted labels may create zoom/low-vision fatigue.
- **S1:** Mobile tabs are horizontally scrollable, but the new **More** cue materially improves discoverability and successfully reveals the hidden Brief tab.

**Terminology:** Same novice jargon burden as the new SDR, amplified for screen-reader users when abbreviations are not expanded.  
**Information architecture:** Logical landmarks and tab structure; both pointer and keyboard reorder paths are available.
**Universally valuable:** Contextual accessible names, focus indicators, reduced motion, explicit states.  
**Sales-specific:** None of the accessibility needs are sales-specific; fixes should be platform-wide.

## Group B — Adjacent relationship-driven professionals

### 7. University Career Advisor

**Goal:** Prepare for a student advising meeting using prior goals, applications, and relevant opportunities.

| Task | Expectation before the task | Observed outcome |
|---|---|---|
| 1. Orient and review research | “Center the student, their goals, prior notes, deadlines, and consented information.” | Technical task completed, but the interface centers a company account, firmographics, and revenue events. |
| 2. Review signals | “Surface changes in the student’s situation or labor market that affect advice.” | The signal concept transfers well; the current categories (leadership, product, hiring, strategic) do not. |
| 3. Confirm people | “Show the student and relevant supporters, with relationship roles.” | “Buying group,” “decision maker,” “champion,” and “evaluator” do not map safely to an advising relationship. |
| 4. Curate questions | “Suggest open, student-centered questions and let me adapt them.” | Strong conceptual transfer. Custom questions and rationale are valuable; “discovery” sounds extractive/sales-oriented. |
| 5. Review brief and finish | “Create a private advising brief and clear next steps.” | Brief editing transfers well, but AE sharing, account language, and Salesforce do not. |

**Usability issues and severity**

- **S3:** Account/firmographic information architecture displaces the student as the primary subject.
- **S3:** Buying-role classification can be inappropriate or harmful in an advising context.
- **S2:** No consent, privacy boundary, sensitive-note handling, or student-record provenance is visible.

**Terminology:** Confusing: account, buying group, champion, discovery, AE, ARR, CRM opportunity.  
**Information architecture:** Weak. A student-centered timeline and goals model should replace company/account structure.  
**Universally valuable:** Changes since last meeting, evidence, question preparation, editable brief, private notes.  
**Sales-specific:** Firmographics, buying influence, suggested sales opening, AE/Salesforce handoff.

### 8. Employer Engagement Coordinator

**Goal:** Prepare for a meeting with an employer partner about recruiting, events, internships, or campus relationships.

| Task | Expectation before the task | Observed outcome |
|---|---|---|
| 1. Orient and review research | “Summarize the employer relationship, past activity, current needs, and campus commitments.” | Mostly transfers. Company context and relationship history are useful, but commercial metrics dominate. |
| 2. Review signals | “Show hiring, leadership, and program changes relevant to partnership opportunities.” | Strong transfer; hiring and leadership signals are directly useful. |
| 3. Confirm people | “Map recruiters, hiring managers, alumni, and campus owners.” | Partly transfers. Influence matters, but sales buying roles do not describe partnership roles. |
| 4. Curate questions | “Help me plan mutually beneficial questions and concrete next steps.” | Strong transfer after mentally replacing “discovery.” |
| 5. Review brief and finish | “Produce a partnership brief I can share with colleagues.” | Strong brief value; AE-specific recipient and Salesforce update are mismatched. |

**Usability issues and severity**

- **S2:** Buying roles should be configurable relationship roles such as Recruiter, Hiring Manager, Sponsor, Alum, or Campus Owner.
- **S2:** Revenue/expansion recommendations can bias a partnership conversation toward selling rather than mutual outcomes.
- **S2:** Sharing is hard-coded to an AE instead of a selectable colleague or team.

**Terminology:** Partly familiar: stakeholder and signals work; account, discovery, champion, AE, ARR, outbound sequence do not.  
**Information architecture:** Moderate fit because the employer can function as an organization record.  
**Universally valuable:** Organization research, hiring signals, contact context, questions, brief.  
**Sales-specific:** Buying roles, commercial opportunity framing, AE handoff.

### 9. Customer Success Manager

**Goal:** Prepare for a renewal, QBR, adoption review, escalation, or expansion conversation.

| Task | Expectation before the task | Observed outcome |
|---|---|---|
| 1. Orient and review research | “Show health, adoption, support, goals, renewal dates, and prior commitments.” | Account structure transfers, but the fixture emphasizes prospecting signals rather than product/customer health. |
| 2. Review signals | “Prioritize changes that affect value realization or risk.” | Concept transfers well; signal categories and suggested opening need a customer-success mode. |
| 3. Confirm people | “Map sponsor, admin, power user, detractor, and executive owner.” | Editable roles help, but sales buying roles omit success-specific relationship states. |
| 4. Curate questions | “Use meeting-type templates for QBR, renewal, risk, or expansion.” | Custom questions work; generic discovery sequence is too acquisition-oriented. |
| 5. Review brief and finish | “Share with my account team and preserve commitments.” | Brief transfers strongly. The generic share action fits, but its fixed teammate recipient and workflow must become selectable. |

**Usability issues and severity**

- **S2:** Missing customer-health, adoption, support, outcomes, contract, and commitment context.
- **S2:** “Discovery plan” and buying roles misclassify post-sale relationships.
- **S2:** The workflow lacks meeting-type selection, so a renewal and escalation receive the same readiness model.

**Terminology:** Account, stakeholder, signals, brief, and CRM are familiar; discovery, outbound, and buying group are not always appropriate.  
**Information architecture:** Medium-high fit if the research layer becomes lifecycle-aware.  
**Universally valuable:** Account brief, changes, people, evidence, notes, follow-up reflection.  
**Sales-specific:** Prospecting signals, buying group, AE-only handoff.

### 10. Admissions Counselor

**Goal:** Prepare for a conversation with an applicant or family about fit, requirements, concerns, and next steps.

| Task | Expectation before the task | Observed outcome |
|---|---|---|
| 1. Orient and review research | “Center the applicant, stage, deadlines, prior interactions, and allowed record data.” | Technical completion required ignoring company, employee, ARR, and enterprise context. |
| 2. Review signals | “Surface application changes, engagement, deadlines, and questions.” | The changes/signals pattern transfers, but current sources and categories do not. |
| 3. Confirm people | “Show applicant, parent/guardian where appropriate, counselor, and decision context without assigning manipulative roles.” | Buying roles are a poor and potentially inappropriate model. |
| 4. Curate questions | “Help me ask equitable, applicant-centered questions.” | Customizable questions transfer; “discovery” and urgency framing can feel sales-led. |
| 5. Review brief and finish | “Create a privacy-aware conversation brief and follow-up plan.” | Editable brief transfers; sales sharing and CRM opportunity concepts do not. |

**Usability issues and severity**

- **S3:** Organization/account IA fundamentally mismatches a person/household-centered workflow.
- **S3:** Decision-maker/champion/evaluator labels can encode inappropriate assumptions about applicants and families.
- **S3:** No visible privacy, consent, protected-data, or access-control model for education records.

**Terminology:** Confusing or inappropriate: account, buying group, champion, discovery, AE, ARR, enterprise, expansion.  
**Information architecture:** Low fit. Applicant journey, deadlines, requirements, and prior contacts should be primary.  
**Universally valuable:** Timeline changes, meeting objective, questions, editable brief, readiness cue.  
**Sales-specific:** Nearly all account and influence modeling in the current fixture.

### 11. Nonprofit Development Officer

**Goal:** Prepare for a donor, foundation, sponsor, or stewardship conversation with relationship history and ethical context.

| Task | Expectation before the task | Observed outcome |
|---|---|---|
| 1. Orient and review research | “Show giving history, interests, restrictions, stewardship commitments, and relationship owners.” | Company and relationship research partly transfers; donor history and stewardship are absent. |
| 2. Review signals | “Surface mission-relevant changes without turning them into manipulative urgency.” | Signal concept transfers, but the suggested opening is optimized for commercial urgency. |
| 3. Confirm people | “Map donor, advisor, family, board connection, program leader, and internal owner.” | Stakeholder mapping transfers; buying roles do not capture philanthropic relationships. |
| 4. Curate questions | “Help me prepare respectful, values-centered questions.” | Question customization transfers well; the rationale language needs a stewardship/fundraising mode. |
| 5. Review brief and finish | “Create a sensitive, share-controlled brief with commitments and stewardship next steps.” | Brief transfers; a fixed teammate recipient and generic evidence controls are insufficient for sensitive donor context. |

**Usability issues and severity**

- **S3:** Commercial buying-role and urgency framing can conflict with donor-centered ethics and stewardship.
- **S3:** No sensitivity labels, householding, gift restrictions, relationship-owner permissions, or confidential-note controls.
- **S2:** Organization-first metrics do not support individuals, families, or foundations equally.

**Terminology:** Stakeholder and brief are usable; buying group, discovery, champion, AE, ARR, and outbound sequence are sales-specific.  
**Information architecture:** Medium-low fit; it needs constituent/household/foundation objects and stewardship history.  
**Universally valuable:** Evidence-backed context, relationship map, questions, editable brief.  
**Sales-specific:** Opportunity/urgency framing, buying roles, AE/Salesforce handoff.

### 12. Executive Assistant preparing leadership briefings

**Goal:** Produce a concise, accurate briefing for a leader across internal and external meetings.

| Task | Expectation before the task | Observed outcome |
|---|---|---|
| 1. Orient and review research | “Tell me the purpose, attendees, history, changes, decisions, and sensitivities.” | The overview is valuable, but company-sales context crowds out agenda, decision, and protocol details. |
| 2. Review signals | “Highlight what changed and what the executive must know.” | Strong transfer. Confidence, freshness, and evidence are useful across domains. |
| 3. Confirm people | “Explain role, relationship, protocol, interests, and internal owner.” | Participant cards transfer; buying-role taxonomy does not cover internal leaders, officials, partners, or peers. |
| 4. Curate questions | “Suggest optional talking points and questions; do not impose a minimum.” | Suggestions transfer, but a mandatory three-question gate mismatches informational or ceremonial meetings. |
| 5. Review brief and finish | “Create an executive-ready brief with a selectable audience and approval path.” | Editing/export are valuable. AE-only sharing, no executive template, and no approval/version history limit fit. |

**Usability issues and severity**

- **S3:** Sales workspace and buying-group IA do not match a cross-functional executive calendar.
- **S2:** The three-question gate can block readiness for meetings that require decisions, talking points, or no questions.
- **S2:** No brevity control, executive template, sensitive section, protocol field, or approval chain.
- **S2:** Hard-coded recipient logic prevents briefing the actual leader or staff team.

**Terminology:** Confusing: discovery, account, buying group, champion, AE, ARR, outbound sequence.  
**Information architecture:** Medium-low fit. The core brief is excellent; the surrounding sales taxonomy is not.  
**Universally valuable:** Change detection, evidence, attendee context, editable/reorderable brief, export.  
**Sales-specific:** Discovery gate, buying influence, account economics, AE handoff.

## Synthesis

### Problems unique or especially acute for sales personas

1. **Enterprise readiness is overstated (S3).** A five-item checklist works for a simple discovery call but does not account for hierarchy, multi-threading, opportunity context, security/legal workstreams, or missing buying roles.
2. **Manager readiness is not supported (S3).** Managers need a team queue, quality rubric, comments, request-changes, audit history, and risk aggregation rather than an individual completion checklist.
3. **The workspace and recipient logic remain SDR-oriented (S2).** The action now says **Share draft** or **Share brief**, but collaboration still uses a fixed teammate and does not adapt to SDR, BDR, AE, SE, manager, or account-team ownership.
4. **Expert verification depth is limited (S2).** Exact CRM records, source conflicts, claim lineage, and late-research changes are not inspectable enough for high-stakes selling.
5. **Sales readiness measures completion more than quality (S2).** Review clicks and a question count do not establish that the meeting hypothesis, stakeholder map, or questions are good.

### Problems unique or especially acute for adjacent professions

1. **The domain object is wrong (S3).** Career advising and admissions are person-centered; development may be constituent/household/foundation-centered; executive assistance is meeting/leader-centered. Treating everything as a company account distorts the work.
2. **Buying-role labels can be inappropriate (S3).** Decision maker, champion, and evaluator may be usable in sales but can create ethically or conceptually wrong classifications for students, applicants, families, donors, and partners.
3. **Privacy and sensitivity controls are absent (S3).** Education, advising, donor, and executive briefing contexts require clearer consent, access, sensitivity, provenance, and retention controls.
4. **The mandatory discovery model does not transfer (S2).** Some meetings are for advising, stewardship, decision support, relationship maintenance, escalation, or protocol—not discovery.
5. **Sharing assumes a fixed teammate handoff (S2).** Adjacent professions need a selectable recipient, audience, permission, and purpose.

### Universal usability issues

1. **Source verification remains shallow (S2).** Dates and evidence snippets are a meaningful improvement, but the links are generic and do not open the exact record or passage.
2. **The readiness model conflates completion with quality (S2).** A checked step says the user acted, not that the output is accurate or suitable.
3. **A three-question minimum is arbitrary (S2).** It encourages filler and prevents meeting-type-specific readiness criteria.
4. **Role and meeting type are never established (S2).** The product cannot adapt language, required steps, brief structure, or recipient without knowing who is preparing what kind of meeting.
5. **No visible persistence or version history (S2).** Edits produce transient confirmation, but users cannot inspect save state, authorship, version lineage, or late AI changes.
6. **Reorder accessibility requires validation (S2).** Move up/down controls and a live announcement are implemented, but have not been validated with assistive technology.
7. **Two final gates are mildly confusing (S1).** **Complete brief review** and **Mark meeting ready** represent related concepts without explaining their distinction.
8. **Dense low-emphasis microcopy (S2).** Frequent 10–11 px labels increase cognitive and low-vision burden.

### Universally valuable capabilities

- Meeting identity, attendees, time, research freshness, and next action in one place.
- Work can begin while research continues.
- Change detection and explicit source confidence.
- Expandable evidence, dates, and supporting snippets.
- Editable participant roles with an **Unknown** state.
- Question suggestions with rationale plus custom questions.
- Editable, removable, addable, and reorderable brief sections.
- Private notes, copy/export, draft warning, and explicit final readiness.
- Mobile **More** cue that reveals hidden sections.
- Reduced-motion handling, visible focus, contextual names on repeated controls, and live status feedback.

### Sales-specific capabilities worth preserving

- Why-now account hypothesis and signal-to-opening recommendations.
- Buying-group inference and relationship context.
- Discovery question sequence and sales rationale.
- CRM/account evidence and Notion-based account workspace.
- SDR-to-account-team handoff and post-meeting CRM reflection.

## Opportunities to generalize without weakening the Notion SDR use case

1. **Add a domain profile, not a generic relabeling layer.** Keep **Sales discovery** as the default profile. Add profiles such as Customer success, Partnership, Advising, Admissions, Development, and Executive briefing. Each profile should define its primary object, role taxonomy, sources, readiness steps, questions, brief template, and follow-up destination.
2. **Ask two setup questions:** “What kind of meeting is this?” and “What is your role?” Use them to adapt terminology, required steps, readiness logic, and sharing recipients. The SDR path can remain preselected in Notion Sales.
3. **Replace hard-coded buying roles with profile-based relationship roles.** Preserve Decision maker/Champion/Evaluator for SDRs; offer Sponsor/Admin/Power user for CSMs, Recruiter/Hiring manager/Alum for employer engagement, and Attendee/Decision owner/Advisor for executive briefings.
4. **Make readiness criteria configurable.** Retain the proven five-step SDR checklist as a template. Let other meeting types require decisions, agenda, risks, commitments, consent, or protocol instead of three discovery questions.
5. **Generalize sharing to “Share brief.”** The default SDR recipient can still be the AE, but users should choose a person/team, permission, status, and message. Role-aware defaults preserve speed.
6. **Build a universal evidence layer.** Exact source record, timestamp, excerpt, access scope, conflict indicators, and sentence-level lineage help every persona while increasing SDR trust.
7. **Separate preparation completion from quality assurance.** Track Prepared by, Reviewed by, exceptions, comments, requested changes, and approval. This unlocks sales managers and high-sensitivity adjacent use cases.
8. **Support multiple subject models.** Organization/account, person, household, constituent, leader, and meeting should be first-class rather than forcing everything into an account.
9. **Add sensitivity and access controls.** Section-level sensitivity, source permissions, audience preview, and retention policy are essential outside sales and useful for enterprise sales.
10. **Validate accessible ordering controls.** Test the implemented Move up/down actions and live position announcements with keyboard and screen-reader users.

## Prioritized release recommendations

### Must address before production release

1. Replace prototype/generic evidence links with exact source records and auditable claim lineage (**S2**, trust-critical).
2. Validate persistence, permissions, real sharing, CRM/Notion writes, error recovery, and duplicate-action safety (**S3** if absent in production).
3. Make user role and share recipient explicit; replace the fixed SDR-oriented teammate handoff with role-aware selection (**S2**).
4. Distinguish readiness completion from quality/approval, especially for manager review (**S3**).
5. Validate keyboard ordering and live announcements with assistive technology (**S2**).

### Must address before positioning as cross-profession

1. Introduce profile-specific subject models and terminology (**S3**).
2. Replace fixed buying roles and discovery requirements with profile templates (**S3**).
3. Add privacy, sensitivity, and consent controls appropriate to education, donor, and executive contexts (**S3**).
4. Run moderated research with participants from every target profession; this expert transfer analysis is not sufficient evidence of product-market usability.

## Overall release readiness

**Recommendation: Ready for a moderated SDR/AE pilot; not ready for production general availability or cross-profession positioning.**

For the Notion SDR use case, the product has a coherent and appealing end-to-end story. The live workflow is completable, the next action is clear, stakeholder corrections are supported, mobile section discovery works, and the brief is meaningfully editable with pointer and keyboard ordering. The main gaps are trustworthy source-level verification, assistive-technology validation, role-aware collaboration, quality/audit controls, and validation of real persistence and integrations.

For adjacent professions, the universal preparation engine is promising, but the current product is not merely “sales-flavored”; its objects, roles, required steps, recommendations, recipient, and follow-up system are structurally sales-specific. Generalization should be implemented through domain profiles that preserve the current SDR template intact, not through global find-and-replace terminology.

**Release call by scope**

| Scope | Readiness call |
|---|---|
| Moderated SDR usability pilot | **Ready** |
| Internal sales alpha with non-critical data | **Ready with safeguards** |
| Sales production GA | **Not yet ready** |
| Adjacent-profession pilot | **Concept testing only** |
| Cross-profession production GA | **Not ready** |
