export type Signal = {
  id: string;
  title: string;
  detail: string;
  source: string;
  timing: string;
  category: "Leadership" | "Product" | "Hiring" | "Strategic";
  confidence: number;
  highImpact?: boolean;
};

export const signals: Signal[] = [
  {
    id: "signal-1",
    title: "New CRO joined from a product-led SaaS company",
    detail: "Maya Chen started six weeks ago and has a track record of consolidating fragmented revenue tooling in her first quarter.",
    source: "LinkedIn",
    timing: "6 weeks ago",
    category: "Leadership",
    confidence: 96,
    highImpact: true,
  },
  {
    id: "signal-2",
    title: "Enterprise plan launched for distributed teams",
    detail: "The launch introduces approval workflows, audit logs, and cross-team workspaces—signals that operational complexity is increasing.",
    source: "Company blog",
    timing: "12 days ago",
    category: "Product",
    confidence: 91,
    highImpact: true,
  },
  {
    id: "signal-3",
    title: "Revenue operations team is hiring across three regions",
    detail: "Five open roles emphasize process standardization and improving rep productivity across the funnel.",
    source: "Careers",
    timing: "Active",
    category: "Hiring",
    confidence: 88,
  },
  {
    id: "signal-4",
    title: "FY26 priority: improve enterprise expansion",
    detail: "Leadership commentary points to a larger focus on multi-product adoption and executive visibility into strategic accounts.",
    source: "Q2 update",
    timing: "4 days ago",
    category: "Strategic",
    confidence: 84,
  },
];

export type Stakeholder = {
  initials: string;
  name: string;
  role: string;
  influence: "Decision maker" | "Champion" | "Evaluator";
  note: string;
  color: string;
};

export const stakeholders: Stakeholder[] = [
  {
    initials: "MC",
    name: "Maya Chen",
    role: "Chief Revenue Officer",
    influence: "Decision maker",
    note: "New in role. Likely focused on operating cadence, visibility, and tool consolidation.",
    color: "bg-[#dbeafe] text-[#245b96]",
  },
  {
    initials: "JL",
    name: "Jordan Lee",
    role: "VP, Revenue Operations",
    influence: "Champion",
    note: "Booked the meeting after engaging with the enterprise workspace guide.",
    color: "bg-[#e9ddf7] text-[#6d4b94]",
  },
  {
    initials: "AP",
    name: "Ari Patel",
    role: "Director, Sales Enablement",
    influence: "Evaluator",
    note: "Owns onboarding and the current sales-content process across three regions.",
    color: "bg-[#f8e2c5] text-[#855b21]",
  },
];

export const discoveryQuestions = [
  { id: "q1", category: "Priority", text: "What changed internally that made improving your revenue operating cadence a priority now?", reason: "Connects the CRO change to urgency." },
  { id: "q2", category: "Process", text: "How do account teams prepare for executive meetings today, and where does context usually get lost?", reason: "Surfaces workflow and handoff friction." },
  { id: "q3", category: "Impact", text: "What does fragmented account context cost reps or managers in a typical week?", reason: "Builds a measurable productivity case." },
  { id: "q4", category: "Scale", text: "As the RevOps team expands globally, which processes need to become consistent first?", reason: "Tests the hiring signal." },
  { id: "q5", category: "Decision", text: "Who else needs confidence in a new workflow before your team would adopt it?", reason: "Clarifies the buying group." },
];

export type BriefBlock = { id: string; title: string; body: string };

export const initialBrief: BriefBlock[] = [
  {
    id: "brief-context",
    title: "Meeting objective",
    body: "Confirm whether Acme's push for a more consistent revenue operating cadence creates a near-term initiative for a connected meeting-prep and account workspace.",
  },
  {
    id: "brief-why-now",
    title: "Why now",
    body: "A new CRO, an expanding RevOps team, and a shift upmarket are increasing the cost of fragmented account context. Lead with the operational change—not a generic productivity story.",
  },
  {
    id: "brief-people",
    title: "People in the room",
    body: "Jordan Lee is the likely champion and owns the current process. Maya Chen is the executive sponsor and will care about visibility, standardization, and consolidation.",
  },
  {
    id: "brief-questions",
    title: "Questions to ask",
    body: "1. What changed that made this a priority now?\n2. Where does context get lost before executive meetings?\n3. Which RevOps processes need to become consistent first?",
  },
  {
    id: "brief-recommendation",
    title: "Recommended angle",
    body: "Position Notion as the shared operating layer that brings research, account context, meeting preparation, and follow-through into one governed workflow.",
  },
];

export const researchActivities = [
  { threshold: 42, label: "Matched Acme to Salesforce account", source: "Salesforce" },
  { threshold: 52, label: "Resolved 3 meeting attendees", source: "Calendar" },
  { threshold: 66, label: "Reviewed 18 recent company updates", source: "Web" },
  { threshold: 78, label: "Found new CRO leadership signal", source: "LinkedIn" },
  { threshold: 90, label: "Updated recommended discovery angle", source: "Agent" },
  { threshold: 100, label: "Research package complete", source: "Agent" },
];
