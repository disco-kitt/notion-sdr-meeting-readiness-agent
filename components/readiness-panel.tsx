"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Circle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MeetingReadiness } from "@/lib/meeting-readiness";
import { cn } from "@/lib/utils";

export function ReadinessPanel({
  readiness,
  researchProgress,
  onNavigate,
  onMarkReady,
}: {
  readiness: MeetingReadiness;
  researchProgress: number;
  onNavigate: (tab: string) => void;
  onMarkReady: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const next = readiness.nextItem;
  const waitingOnResearch = next?.key === "research";

  return (
    <section className="relative overflow-hidden rounded-xl border border-[#dfded9] bg-white">
      <motion.div
        className="absolute inset-y-0 left-0 w-1 bg-[#2383E2]"
        initial={false}
        animate={{ opacity: readiness.isReady ? 0 : 1 }}
      />
      <div className="p-4 sm:p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex min-w-0 items-start gap-3.5">
            <motion.div
              className={cn(
                "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg",
                readiness.isReady ? "bg-[#edf8f0] text-[#267047]" : "bg-[#edf6ff] text-[#2383E2]",
              )}
              initial={reduceMotion ? false : { scale: 0.92, opacity: 0.7 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 380, damping: 24 }}
            >
              {readiness.isReady ? <Check className="size-4" /> : <Sparkles className="size-4" />}
            </motion.div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.h2
                    key={readiness.isReady ? "ready" : readiness.remainingCount}
                    initial={reduceMotion ? false : { opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -3 }}
                    className="text-[16px] font-semibold tracking-[-0.015em]"
                  >
                    {readiness.isReady
                      ? "You’re ready for this meeting"
                      : `${readiness.remainingCount} ${readiness.remainingCount === 1 ? "step" : "steps"} before you’re ready`}
                  </motion.h2>
                </AnimatePresence>
                <span className="text-xs text-muted-foreground">{readiness.completedCount} of {readiness.totalCount}</span>
              </div>
              <p className="mt-1 text-sm leading-5 text-muted-foreground">
                {readiness.isReady
                  ? "Your research, discovery plan, and brief are aligned."
                  : waitingOnResearch
                    ? `The agent is still checking sources. You can review completed work now. ${researchProgress}% complete.`
                    : `Next: ${next?.label.toLowerCase()}.`}
              </p>
            </div>
          </div>

          <div className="shrink-0 pl-[50px] md:pl-0">
            {readiness.isReady ? (
              <Button size="sm" onClick={onMarkReady}><Check />Mark meeting ready</Button>
            ) : waitingOnResearch ? (
              <Button variant="secondary" size="sm" disabled><Sparkles className="animate-pulse" />Researching {researchProgress}%</Button>
            ) : (
              <Button size="sm" onClick={() => next && onNavigate(next.tab)}>{next?.actionLabel}<ArrowRight /></Button>
            )}
          </div>
        </div>

        <div className="mt-4 hidden grid-cols-5 gap-2 border-t border-[#ecebe7] pt-3 md:grid">
          {readiness.items.map((item, index) => (
            <div key={item.key} className="flex min-w-0 items-center gap-2 text-xs">
              <motion.span
                initial={false}
                animate={{ backgroundColor: item.complete ? "#3c8a5b" : "#ffffff", borderColor: item.complete ? "#3c8a5b" : "#d3d1cb" }}
                className={cn("flex size-4 shrink-0 items-center justify-center rounded-full border", item.complete && "text-white")}
              >
                {item.complete ? <Check className="size-2.5" /> : <span className="text-[9px] text-muted-foreground">{index + 1}</span>}
              </motion.span>
              <span className={cn("truncate", item.complete ? "text-muted-foreground" : item.key === next?.key ? "font-medium text-foreground" : "text-muted-foreground")}>{item.shortLabel}</span>
            </div>
          ))}
        </div>

        <div className="mt-3 flex gap-1.5 md:hidden" aria-label={`${readiness.completedCount} of ${readiness.totalCount} preparation steps complete`}>
          {readiness.items.map((item) => (
            <motion.span
              key={item.key}
              className="h-1 flex-1 rounded-full"
              initial={false}
              animate={{ backgroundColor: item.complete ? "#3c8a5b" : item.key === next?.key ? "#2383E2" : "#e9e8e4" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
