"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BookOpenText,
  Check,
  Clock3,
  FileText,
  Menu,
  MoreHorizontal,
  X,
} from "lucide-react";
import { MeetingWorkspace } from "@/components/meeting-workspace";
import { ReflectionWorkspace } from "@/components/reflection-workspace";
import { ResearchBanner } from "@/components/research-banner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { buildMeetingReadiness } from "@/lib/meeting-readiness";

export type WorkspaceMode = "meeting" | "reflection";
export type BriefStatus = "Draft" | "Shared" | "Ready";

export function MeetingPrepApp() {
  const reduceMotion = useReducedMotion();
  const [mode, setMode] = React.useState<WorkspaceMode>("meeting");
  const [activeTab, setActiveTab] = React.useState("overview");
  const [progress, setProgress] = React.useState(46);
  const [briefStatus, setBriefStatus] = React.useState<BriefStatus>("Draft");
  const [briefGenerated, setBriefGenerated] = React.useState(false);
  const [briefBlockCount, setBriefBlockCount] = React.useState(5);
  const [selectedQuestions, setSelectedQuestions] = React.useState(["q1", "q2", "q4"]);
  const [reviewedSections, setReviewedSections] = React.useState<string[]>([]);
  const [toast, setToast] = React.useState<string | null>(null);
  const [mobileNav, setMobileNav] = React.useState(false);

  const showToast = React.useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 3600);
  }, []);

  React.useEffect(() => {
    if (progress >= 100) return;
    const timer = window.setTimeout(() => setProgress((current) => Math.min(100, current + (current < 75 ? 4 : 3))), 850);
    return () => window.clearTimeout(timer);
  }, [progress]);

  React.useEffect(() => {
    if (progress === 78) showToast("High-impact signal found — brief recommendations updated");
  }, [progress, showToast]);

  React.useEffect(() => {
    if (progress >= 100 && !briefGenerated) {
      setBriefGenerated(true);
      showToast("Your meeting brief draft is ready to review");
    }
  }, [progress, briefGenerated, showToast]);

  const readiness = React.useMemo(
    () => buildMeetingReadiness({
      researchProgress: progress,
      reviewedSections,
      selectedQuestionCount: selectedQuestions.length,
      briefGenerated,
      briefBlockCount,
    }),
    [progress, reviewedSections, selectedQuestions.length, briefGenerated, briefBlockCount],
  );

  const changeTab = React.useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  const markSectionReviewed = React.useCallback((section: string) => {
    setReviewedSections((current) => current.includes(section) ? current : [...current, section]);
  }, []);

  const openMeeting = React.useCallback((tab = "overview") => {
    setMode("meeting");
    changeTab(tab);
    setMobileNav(false);
  }, [changeTab]);

  const openReflection = React.useCallback(() => {
    setMode("reflection");
    setMobileNav(false);
  }, []);

  return (
    <div className="min-h-screen bg-[#fbfbfa]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[248px] border-r border-[#e6e5e2] bg-[#f7f7f5] lg:block">
        <Sidebar mode={mode} onMeeting={openMeeting} onReflection={openReflection} />
      </aside>

      <div className="lg:pl-[248px]">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-[#e8e7e4] bg-[#fbfbfa]/95 px-4 backdrop-blur sm:px-6">
          <div className="flex min-w-0 items-center gap-2">
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation" onClick={() => setMobileNav(true)}>
              <Menu />
            </Button>
            <div className="hidden items-center gap-1.5 text-sm text-muted-foreground sm:flex">
              <span>Sales workspace</span>
              <span className="text-border">/</span>
              <span className="truncate font-medium text-foreground">{mode === "meeting" ? "Acme discovery" : "Lumon debrief"}</span>
            </div>
            <div className="sm:hidden">
              <span className="truncate text-sm font-semibold">{mode === "meeting" ? "Acme discovery" : "Lumon debrief"}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {mode === "meeting" && (
              <>
                {(activeTab !== "overview" || briefStatus === "Ready") && (
                  <Button
                    variant={briefStatus === "Ready" || !readiness.isReady ? "secondary" : "default"}
                    size="sm"
                    onClick={() => {
                      if (readiness.isReady) {
                        setBriefStatus("Ready");
                        showToast("Meeting marked ready");
                      } else {
                        openMeeting("overview");
                      }
                    }}
                  >
                    {briefStatus === "Ready" ? <><Check />Ready</> : readiness.isReady ? "Mark meeting ready" : `${readiness.remainingCount} ${readiness.remainingCount === 1 ? "step" : "steps"} left`}
                  </Button>
                )}
              </>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="More actions"><MoreHorizontal /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => openMeeting("brief")}><FileText />Open meeting brief</DropdownMenuItem>
                <DropdownMenuItem onSelect={openReflection}><BookOpenText />Open reflection flow</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {mode === "meeting" && <ResearchBanner progress={progress} onRestart={() => setProgress(46)} />}

        <main>
          <AnimatePresence mode="wait">
            {mode === "meeting" ? (
              <motion.div key="meeting" initial={reduceMotion ? false : { opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0 }} transition={{ duration: 0.18 }}>
                <MeetingWorkspace
                  activeTab={activeTab}
                  onTabChange={changeTab}
                  progress={progress}
                  briefStatus={briefStatus}
                  setBriefStatus={setBriefStatus}
                  briefGenerated={briefGenerated}
                  setBriefGenerated={setBriefGenerated}
                  briefBlockCount={briefBlockCount}
                  setBriefBlockCount={setBriefBlockCount}
                  selectedQuestions={selectedQuestions}
                  setSelectedQuestions={setSelectedQuestions}
                  reviewedSections={reviewedSections}
                  onReviewSection={markSectionReviewed}
                  readiness={readiness}
                  notify={showToast}
                />
              </motion.div>
            ) : (
              <motion.div key="reflection" initial={reduceMotion ? false : { opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0 }} transition={{ duration: 0.18 }}>
                <ReflectionWorkspace notify={showToast} onBack={() => openMeeting("overview")} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      <Dialog open={mobileNav} onOpenChange={setMobileNav}>
        <DialogContent className="left-0 top-0 h-full w-[286px] max-w-none translate-x-0 translate-y-0 rounded-none border-y-0 border-l-0 p-0 [&>button]:hidden">
          <DialogHeader className="sr-only">
            <DialogTitle>Navigation</DialogTitle>
            <DialogDescription>Meeting preparation workspace navigation</DialogDescription>
          </DialogHeader>
          <Button variant="ghost" size="icon" className="absolute right-2 top-2 z-10" aria-label="Close navigation" onClick={() => setMobileNav(false)}><X /></Button>
          <Sidebar mode={mode} onMeeting={openMeeting} onReflection={openReflection} />
        </DialogContent>
      </Dialog>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
            className="fixed inset-x-4 top-16 z-[80] mx-auto flex max-w-md items-start gap-2 rounded-lg border border-[#3d3b37] bg-[#2f2e2b] px-3.5 py-2.5 text-sm leading-5 text-white shadow-float sm:bottom-5 sm:top-auto sm:items-center"
            role="status"
            aria-live="polite"
          >
            <Check className="size-4 text-[#8dd6a5]" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Sidebar({
  mode,
  onMeeting,
  onReflection,
}: {
  mode: WorkspaceMode;
  onMeeting: (tab?: string) => void;
  onReflection: () => void;
}) {
  return (
    <div className="flex h-full flex-col p-2.5">
      <div className="flex h-10 items-center gap-2 px-2">
        <div className="flex size-6 items-center justify-center rounded-[5px] bg-[#2f2e2b] text-[13px] font-bold text-white">N</div>
        <span className="flex-1 truncate text-sm font-semibold">Notion Sales</span>
      </div>

      <div className="mt-5 px-2 text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground/70">Today</div>
      <div className="mt-1 space-y-1">
        <button
          onClick={() => onMeeting()}
          className={`w-full rounded-md px-2 py-2.5 text-left transition-colors ${mode === "meeting" ? "bg-[#ececea]" : "hover:bg-[#efefed]"}`}
        >
          <div className="flex items-start gap-2.5">
            <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-[#dbeafe] text-xs font-semibold text-[#245b96]">A</div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium">Acme discovery</div>
              <div className="mt-0.5 flex items-center gap-1 text-[11px] text-muted-foreground"><Clock3 className="size-3" />12:30 PM · 3 people</div>
            </div>
            <span className="mt-1 size-1.5 rounded-full bg-[#2383E2]" />
          </div>
        </button>

        <div className="w-full rounded-md px-2 py-2.5 text-left text-muted-foreground hover:bg-[#efefed]">
          <div className="flex items-start gap-2.5">
            <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-[#f7dfc1] text-xs font-semibold text-[#855b21]">V</div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium text-foreground/80">Vanta renewal</div>
              <div className="mt-0.5 text-[11px]">3:00 PM · Ready</div>
            </div>
            <Check className="mt-1 size-3.5 text-[#39865a]" />
          </div>
        </div>
      </div>

      <div className="mt-6 px-2 text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground/70">Follow-ups</div>
      <button
        onClick={onReflection}
        className={`mt-1 flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm transition-colors ${mode === "reflection" ? "bg-[#ececea] font-medium" : "text-muted-foreground hover:bg-[#efefed] hover:text-foreground"}`}
      >
        <BookOpenText className="size-4" />
        <span className="flex-1 truncate">Lumon debrief</span>
        <Badge variant="amber">Due</Badge>
      </button>

      <div className="mt-auto border-t border-[#e4e3df] pt-2">
        <div className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left">
          <div className="flex size-7 items-center justify-center rounded-full bg-[#dfe7d8] text-xs font-semibold text-[#49603d]">DS</div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium">Devon Scott</div>
            <div className="truncate text-[11px] text-muted-foreground">Sales Development</div>
          </div>
        </div>
      </div>
    </div>
  );
}
