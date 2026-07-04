# Notion SDR Meeting Preparation Agent

Release-candidate interactive prototype, derived from Sprint 2, for taking an SDR from a booked meeting to a meeting-ready brief in under five minutes.

## Run locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Prototype coverage

- Simulated meeting detection and live research states across sample CRM, people, and company sources
- Account overview, strategic signals, stakeholder mapping, and discovery-question selection
- Inline-editable AI synthesis cards and personal meeting notes
- Generated meeting brief with editable, removable, addable, drag-reorderable, and keyboard-reorderable sections
- Simulated Copy to Notion, teammate sharing, clipboard copy, and PDF export, plus draft, shared, and meeting-ready states
- Post-meeting reflection with assumption labeling and controlled CRM draft approval
- Responsive desktop and mobile workspace navigation

## Architecture

- Next.js App Router and TypeScript
- React state for prototype interactions and simulated orchestration
- Tailwind CSS design tokens and responsive layouts
- shadcn/ui-style primitives backed by Radix UI
- Framer Motion for streaming states, transitions, and brief reordering

The production build is also exported to `out/` for static review.

## Submission artifacts

- [Sprint 2 — Service Blueprint](docs/sprint-2-service-blueprint.md)
- [Editable service-blueprint diagram](docs/sprint-2-service-blueprint.mmd)
- [Sprint 2 user flows](sprint-2-user-flows/README.md)
- [Formative usability evaluation](docs/formative-usability-evaluation.md)
- [Internal alpha test report](docs/internal-alpha-test-report.md)
- [Release-candidate QA audit](docs/release-candidate-qa-audit.md)
- [12-persona meeting-readiness evaluation](docs/12-persona-meeting-readiness-evaluation.md)
