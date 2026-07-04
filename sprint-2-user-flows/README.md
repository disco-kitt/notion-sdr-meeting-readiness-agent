# Sprint 2 User Flow Diagrams

Editable diagram sources for the SDR Meeting Preparation Agent.

> **Synchronization status:** [`Sprint2-User-Flows-Mermaid.md`](./Sprint2-User-Flows-Mermaid.md) and the standalone `.mmd` files are the current prototype reference. Existing `.drawio` files are retained for the diagrams that already had editable XML exports.

The master journey map is an overview, not a ninth formal flow. Flows 3–6 preserve the Google Doc's formal interaction contracts while explicitly identifying states that the fixed Acme prototype does not currently expose.

| Diagram | Mermaid | draw.io XML |
|---|---|---|
| Master Journey Map | [01-master-journey-map.mmd](01-master-journey-map.mmd) | [01-master-journey-map.drawio](01-master-journey-map.drawio) |
| Flow 1: Prepare for a Discovery Call | [02-flow-1-prepare-discovery-call.mmd](02-flow-1-prepare-discovery-call.mmd) | [02-flow-1-prepare-discovery-call.drawio](02-flow-1-prepare-discovery-call.drawio) |
| Flow 2: Research Still Running | [03-flow-2-research-still-running.mmd](03-flow-2-research-still-running.mmd) | [03-flow-2-research-still-running.drawio](03-flow-2-research-still-running.drawio) |
| Flow 3: No CRM History | [06-flow-3-no-crm-history.mmd](06-flow-3-no-crm-history.mmd) | — |
| Flow 4: Limited Public Research | [07-flow-4-limited-public-research.mmd](07-flow-4-limited-public-research.mmd) | — |
| Flow 5: Review a Buying Signal | [08-flow-5-review-buying-signal.mmd](08-flow-5-review-buying-signal.mmd) | — |
| Flow 6: Review Stakeholders | [09-flow-6-review-stakeholders.mmd](09-flow-6-review-stakeholders.mmd) | — |
| Flow 7: Build and Share the Meeting Brief | [04-flow-7-build-share-meeting-brief.mmd](04-flow-7-build-share-meeting-brief.mmd) | [04-flow-7-build-share-meeting-brief.drawio](04-flow-7-build-share-meeting-brief.drawio) |
| Flow 8: Post-Meeting Reflection and Learning | [05-flow-8-post-meeting-reflection.mmd](05-flow-8-post-meeting-reflection.mmd) | [05-flow-8-post-meeting-reflection.drawio](05-flow-8-post-meeting-reflection.drawio) |

## Import

- Open a `.drawio` file directly in draw.io/diagrams.net for fully editable shapes, connectors, and swimlanes.
- For Mermaid, paste a `.mmd` file into **Arrange → Insert → Advanced → Mermaid**.
- The `.drawio` files use uncompressed mxGraph XML, so they can also be versioned and reviewed as text.

## Visual system

- Rounded rectangles: actions
- Amber diamonds: decisions
- Green rounded rectangles: ready/completed states
- Gray rounded rectangles: draft/secondary outcomes
- Swimlanes: SDR, System, AI / Orchestration, External Data
