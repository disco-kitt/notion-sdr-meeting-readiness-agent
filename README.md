# Notion SDR Meeting Preparation Agent

Interactive Sprint 2 prototype for taking an SDR from a booked meeting to a meeting-ready brief in under five minutes.

## Run locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Prototype coverage

- Meeting detection and live research states across CRM, people, and company sources
- Account overview, strategic signals, stakeholder mapping, and discovery-question selection
- Inline-editable AI synthesis cards and personal meeting notes
- Generated meeting brief with editable, removable, addable, and draggable sections
- Copy to Notion, share with AE, export, draft, and meeting-ready states
- Post-meeting reflection with assumption labeling and controlled CRM draft approval
- Responsive desktop and mobile workspace navigation

## Architecture

- Next.js App Router and TypeScript
- React state for prototype interactions and simulated orchestration
- Tailwind CSS design tokens and responsive layouts
- shadcn/ui-style primitives backed by Radix UI
- Framer Motion for streaming states, transitions, and brief reordering

The production build is also exported to `out/` for static review.
