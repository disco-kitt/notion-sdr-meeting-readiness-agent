"use client";

import * as React from "react";
import { Calendar, Check, ChevronRight, Clock3, ExternalLink, MapPin, Sparkles, Video } from "lucide-react";
import type { BriefStatus } from "@/components/meeting-prep-app";
import { OverviewView } from "@/components/views/overview-view";
import { SignalsView } from "@/components/views/signals-view";
import { StakeholdersView } from "@/components/views/stakeholders-view";
import { DiscoveryView } from "@/components/views/discovery-view";
import { MeetingBriefView } from "@/components/views/meeting-brief-view";
import { ReadinessPanel } from "@/components/readiness-panel";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { MeetingReadiness } from "@/lib/meeting-readiness";

export function MeetingWorkspace({
  activeTab,
  onTabChange,
  progress,
  briefStatus,
  setBriefStatus,
  briefGenerated,
  setBriefGenerated,
  briefBlockCount,
  setBriefBlockCount,
  selectedQuestions,
  setSelectedQuestions,
  reviewedSections,
  onReviewSection,
  onInvalidateSection,
  onInvalidateBrief,
  readiness,
  notify,
}: {
  activeTab: string;
  onTabChange: (tab: string) => void;
  progress: number;
  briefStatus: BriefStatus;
  setBriefStatus: (status: BriefStatus) => void;
  briefGenerated: boolean;
  setBriefGenerated: (generated: boolean) => void;
  briefBlockCount: number;
  setBriefBlockCount: (count: number) => void;
  selectedQuestions: string[];
  setSelectedQuestions: (questions: string[]) => void;
  reviewedSections: string[];
  onReviewSection: (section: string) => void;
  onInvalidateSection: (section: string) => void;
  onInvalidateBrief: () => void;
  readiness: MeetingReadiness;
  notify: (message: string) => void;
}) {
  const tabsScrollerRef = React.useRef<HTMLDivElement>(null);
  const [canScrollTabs, setCanScrollTabs] = React.useState(false);

  const updateTabOverflow = React.useCallback(() => {
    const scroller = tabsScrollerRef.current;
    if (!scroller) return;
    setCanScrollTabs(scroller.scrollLeft + scroller.clientWidth < scroller.scrollWidth - 4);
  }, []);

  React.useEffect(() => {
    const scroller = tabsScrollerRef.current;
    if (!scroller) return;
    const activeTrigger = scroller.querySelector<HTMLElement>('[data-state="active"]');
    activeTrigger?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    const frame = window.requestAnimationFrame(updateTabOverflow);
    window.addEventListener("resize", updateTabOverflow);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateTabOverflow);
    };
  }, [activeTab, updateTabOverflow]);

  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <section className="border-b border-[#e7e6e2] bg-white/70 px-4 pt-5 sm:px-7 sm:pt-8">
        <div className="mx-auto max-w-[1360px]">
          <div className="flex flex-col gap-3 sm:gap-5 md:flex-row md:items-start md:justify-between">
            <div className="flex min-w-0 items-start gap-3 sm:gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#dbeafe] text-base font-bold text-[#245b96] ring-1 ring-inset ring-[#c7ddf5] sm:size-12 sm:rounded-xl sm:text-lg">A</div>
              <div className="min-w-0">
                <div className="mb-1.5 flex flex-wrap items-center gap-2">
                  <h1 className="text-balance text-xl font-semibold tracking-[-0.025em] sm:text-[28px]">Acme discovery call</h1>
                  <Badge variant={briefStatus === "Ready" ? "green" : "secondary"}>{briefStatus === "Ready" ? "Meeting ready" : `${readiness.completedCount}/${readiness.totalCount} prepared`}</Badge>
                </div>
                <p className="text-xs text-muted-foreground sm:text-sm">Acme, Inc. <span className="hidden sm:inline">· Enterprise software</span> · 1,240 employees</p>
                <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground sm:mt-3">
                  <span className="flex items-center gap-1.5"><Calendar className="size-3.5" />Wed, July 8</span>
                  <span className="flex items-center gap-1.5"><Clock3 className="size-3.5" />12:30–1:00 PM</span>
                  <span className="hidden items-center gap-1.5 sm:flex"><Video className="size-3.5" />Google Meet</span>
                  <span className="hidden items-center gap-1.5 sm:flex"><MapPin className="size-3.5" />San Francisco</span>
                </div>
              </div>
            </div>

            <button aria-label="Open stakeholder map for 4 attendees" onClick={() => onTabChange("stakeholders")} className="flex items-center gap-3 self-start rounded-lg px-0 py-1.5 text-left transition-colors hover:bg-[#f7f7f5] sm:border sm:border-[#e7e6e2] sm:bg-white sm:p-3">
              <div className="flex -space-x-2">
                {[
                  ["MC", "bg-[#dbeafe] text-[#245b96]"],
                  ["JL", "bg-[#e9ddf7] text-[#6d4b94]"],
                  ["AP", "bg-[#f8e2c5] text-[#855b21]"],
                  ["DS", "bg-[#dfe7d8] text-[#49603d]"],
                ].map(([initials, color]) => (
                  <div key={initials} className={`flex size-8 items-center justify-center rounded-full border-2 border-white text-[10px] font-semibold ${color}`}>{initials}</div>
                ))}
              </div>
              <div>
                <div className="text-xs font-medium">4 attendees</div>
                <div className="text-[11px] text-muted-foreground">3 external · 1 internal</div>
              </div>
              <ExternalLink className="size-3.5 text-muted-foreground" />
            </button>
          </div>

          {activeTab === "overview" && (
            <div className="mt-4 sm:mt-5">
              <ReadinessPanel readiness={readiness} researchProgress={progress} markedReady={briefStatus === "Ready"} onNavigate={onTabChange} onMarkReady={() => { setBriefStatus("Ready"); notify("Meeting marked ready"); }} />
            </div>
          )}

          <div className="relative mt-4 sm:mt-5">
            <div ref={tabsScrollerRef} onScroll={updateTabOverflow} className="overflow-x-auto scroll-smooth scrollbar-subtle [scroll-snap-type:x_proximity]">
              <TabsList className="min-w-max gap-1 pr-16 sm:pr-0 [&>button]:[scroll-snap-align:start]">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="signals">
                  Signals <span className="ml-1 rounded-full bg-[#edf6ff] px-1.5 py-0.5 text-[10px] text-[#1b6ca8]">4</span>
                </TabsTrigger>
                <TabsTrigger value="stakeholders">Stakeholders</TabsTrigger>
                <TabsTrigger value="discovery">Discovery questions</TabsTrigger>
                <TabsTrigger value="brief">
                  Meeting brief {briefStatus === "Ready" && <Check className="ml-1 size-3.5 text-[#39865a]" />}
                </TabsTrigger>
              </TabsList>
            </div>
            {canScrollTabs && (
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center gap-0.5 bg-gradient-to-l from-white via-white to-white/70 pl-5 pr-1.5 text-[10px] font-medium text-[#1b6ca8] sm:hidden"
                aria-label="Show more meeting sections"
                onClick={() => {
                  const scroller = tabsScrollerRef.current;
                  scroller?.scrollTo({ left: scroller.scrollWidth, behavior: "smooth" });
                }}
              >
                More <ChevronRight className="size-3.5" />
              </button>
            )}
          </div>
        </div>
      </section>

      <TabsContent value="overview"><OverviewView progress={progress} notify={notify} onOpenTab={onTabChange} selectedQuestionCount={selectedQuestions.length} /></TabsContent>
      <TabsContent value="signals"><SignalsView progress={progress} notify={notify} reviewed={reviewedSections.includes("signals")} onReviewed={() => { onReviewSection("signals"); notify("Priority signals reviewed"); }} /></TabsContent>
      <TabsContent value="stakeholders"><StakeholdersView progress={progress} reviewed={reviewedSections.includes("stakeholders")} onRolesChanged={() => onInvalidateSection("stakeholders")} onReviewed={() => { onReviewSection("stakeholders"); notify("Stakeholder roles confirmed"); }} /></TabsContent>
      <TabsContent value="discovery"><DiscoveryView selected={selectedQuestions} onSelectedChange={setSelectedQuestions} onContinue={() => onTabChange("brief")} /></TabsContent>
      <TabsContent value="brief">
        <MeetingBriefView
          briefStatus={briefStatus}
          setBriefStatus={setBriefStatus}
          generated={briefGenerated}
          onGeneratedChange={setBriefGenerated}
          researchComplete={progress >= 100}
          onBlockCountChange={setBriefBlockCount}
          reviewed={reviewedSections.includes("brief")}
          onReviewed={() => { onReviewSection("brief"); notify("Brief review complete — confirm meeting readiness next"); }}
          onContentChanged={onInvalidateBrief}
          onReturnToOverview={() => onTabChange("overview")}
          preparationReady={readiness.isReady}
          remainingPreparationSteps={readiness.remainingCount}
          selectedQuestionCount={selectedQuestions.length}
          notify={notify}
        />
      </TabsContent>
    </Tabs>
  );
}
