export type ReadinessKey = "research" | "signals" | "stakeholders" | "questions" | "brief";

export type ReadinessItem = {
  key: ReadinessKey;
  label: string;
  shortLabel: string;
  complete: boolean;
  tab: "overview" | "signals" | "stakeholders" | "discovery" | "brief";
  actionLabel: string;
};

export type MeetingReadiness = {
  items: ReadinessItem[];
  completedCount: number;
  totalCount: number;
  remainingCount: number;
  percent: number;
  isReady: boolean;
  nextItem?: ReadinessItem;
};

export function buildMeetingReadiness({
  researchProgress,
  reviewedSections,
  selectedQuestionCount,
  briefGenerated,
  briefBlockCount,
}: {
  researchProgress: number;
  reviewedSections: string[];
  selectedQuestionCount: number;
  briefGenerated: boolean;
  briefBlockCount: number;
}): MeetingReadiness {
  const reviewed = new Set(reviewedSections);
  const items: ReadinessItem[] = [
    {
      key: "research",
      label: "Research complete",
      shortLabel: "Research",
      complete: researchProgress >= 100,
      tab: "overview",
      actionLabel: "Researching",
    },
    {
      key: "signals",
      label: "Priority signals reviewed",
      shortLabel: "Signals",
      complete: reviewed.has("signals"),
      tab: "signals",
      actionLabel: "Review signals",
    },
    {
      key: "stakeholders",
      label: "Stakeholders confirmed",
      shortLabel: "People",
      complete: reviewed.has("stakeholders"),
      tab: "stakeholders",
      actionLabel: "Confirm stakeholders",
    },
    {
      key: "questions",
      label: "Discovery plan curated",
      shortLabel: "Questions",
      complete: selectedQuestionCount >= 3,
      tab: "discovery",
      actionLabel: "Choose questions",
    },
    {
      key: "brief",
      label: "Meeting brief reviewed",
      shortLabel: "Brief",
      complete: briefGenerated && briefBlockCount > 0 && reviewed.has("brief"),
      tab: "brief",
      actionLabel: briefGenerated ? "Review brief" : "Build brief",
    },
  ];

  const completedCount = items.filter((item) => item.complete).length;
  const totalCount = items.length;
  const remainingCount = totalCount - completedCount;

  return {
    items,
    completedCount,
    totalCount,
    remainingCount,
    percent: Math.round((completedCount / totalCount) * 100),
    isReady: completedCount === totalCount,
    nextItem: items.find((item) => !item.complete),
  };
}

export function confidenceLabel(confidence: number) {
  if (confidence >= 90) return "High confidence";
  if (confidence >= 78) return "Good confidence";
  return "Early signal";
}
