# Release-candidate QA audit

Audit date: July 3, 2026

Scope: release-candidate quality for the Notion Sales Agent Build Challenge prototype. No workflow or feature expansion.

## Critical

- [x] Ready status remained visible after the reviewed brief changed. Brief edits, additions, removals, blank starts, and reordering now invalidate brief review and return the meeting to Draft. Any other readiness regression also clears a stale Ready state.
- [x] A completed reflection reopened with reset assumption and CRM state, producing a contradictory incomplete progress value. Completion now preserves notes, labels, CRM resolution, and CRM field values; reopening remains locked at 100%.

## Medium

- [x] CRM draft edits used uncontrolled fields and disappeared after selecting Done. CRM fields are now controlled and persist through review and completion.
- [x] The attendee summary conflicted with the stakeholder list and internal owner. Counts, avatars, sidebar copy, and research activity now consistently show four attendees: three external and one internal.
- [x] The share dialog introduced an unrelated Alex Rivera persona and labeled that person as part of Acme's account team. It now consistently shares the demo with Devon Scott on Notion's account team.
- [x] The draft-share dialog's primary action still said “Share brief.” Draft and ready states now use matching action copy.
- [x] July 8, 2026 was labeled Tuesday. Meeting surfaces now correctly say Wednesday.
- [x] Reflection copy called an external customer contact an “internal champion.” It now says “likely customer champion.”
- [x] Reflection timing used a drifting “42 minutes ago” claim. It now identifies the record as a sample meeting without implying live recency.
- [x] Overview and brief note fields relied on placeholder text as their only accessible name. Both now have explicit accessible labels.
- [x] Sidebar selection was visual-only for assistive technology. Active destinations now expose `aria-current="page"`.
- [x] Overlapping toast timers could dismiss a newer status message early. New messages now replace and reset the active timer safely.

## Cosmetic

- [x] The static Vanta renewal row had a hover treatment that implied it was clickable. The false interaction affordance was removed.

## Verification

- [x] TypeScript check passes.
- [x] Production build passes.
- [x] Browser console has no warnings or errors.
- [x] Desktop layout verified at 1280 × 720.
- [x] Mobile layout verified at 390 × 844 with no horizontal overflow.
- [x] Mobile navigation and tab overflow controls verified.
- [x] CRM edit persistence verified.
- [x] Reflection completion and reopen persistence verified at 100%.
- [x] Ready-state invalidation verified after editing a reviewed brief.
- [x] Draft-share recipient, warning, field label, and action copy verified.
