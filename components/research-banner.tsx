"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChevronDown, Database, Globe2, Sparkles, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const sources = [
  { label: "CRM", icon: Database, threshold: 48 },
  { label: "People", icon: Users, threshold: 62 },
  { label: "Company web", icon: Globe2, threshold: 92 },
];

export function ResearchBanner({ progress, onRestart }: { progress: number; onRestart: () => void }) {
  const [expanded, setExpanded] = React.useState(false);
  const reduceMotion = useReducedMotion();
  const complete = progress >= 100;

  if (complete) {
    return (
      <div className="border-b border-[#e5e4df] bg-[#fafbf9] px-4 sm:px-7">
        <div className="mx-auto max-w-[1360px]">
          <button
            className="flex min-h-10 w-full items-center gap-2.5 py-2 text-left text-xs text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => setExpanded((current) => !current)}
            aria-expanded={expanded}
          >
            <motion.span
              className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#edf8f0] text-[#267047]"
              initial={reduceMotion ? false : { scale: 0.72 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 420, damping: 24 }}
            >
              <Check className="size-3" />
            </motion.span>
            <span className="font-medium text-foreground">Research synced</span>
            <span className="hidden sm:inline">26 sources · Updated just now</span>
            <span className="sm:hidden">26 sources</span>
            <ChevronDown className={cn("ml-auto size-3.5 transition-transform duration-200", expanded && "rotate-180")} />
          </button>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap items-center gap-2 pb-3 pl-7">
                  {sources.map(({ label, icon: Icon }) => (
                    <div key={label} className="flex items-center gap-1.5 rounded-md border border-[#e3e2dd] bg-white px-2 py-1 text-xs text-muted-foreground">
                      <Check className="size-3 text-[#39865a]" /><Icon className="size-3" />{label}
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={(event) => { event.stopPropagation(); setExpanded(false); onRestart(); }}>Refresh research</Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-[#dce8f5] bg-[#f7fbff] px-4 py-3 sm:px-7">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-2.5 md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <motion.div
            className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#e5f1fc] text-[#2383E2]"
            initial={reduceMotion ? false : { scale: 0.92, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 360, damping: 24 }}
          >
            <Sparkles className="size-4" />
          </motion.div>
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center gap-2"><span className="text-sm font-semibold">Research in progress</span><Badge variant="blue" className="border-0 bg-transparent px-0">{progress}%</Badge></div>
            <p className="truncate text-xs text-muted-foreground">Review completed work while the agent checks the remaining sources</p>
          </div>
          <Progress value={progress} className="hidden w-32 sm:block" />
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {sources.map(({ label, icon: Icon, threshold }) => {
            const done = progress >= threshold;
            return (
              <div key={label} className="flex items-center gap-1.5 rounded-md border border-[#dce8f5] bg-white px-2 py-1.5 text-xs">
                {done ? <Check className="size-3.5 text-[#39865a]" /> : <Icon className="size-3.5 animate-pulse text-[#2383E2]" />}
                <span className="text-muted-foreground">{label}</span>
                <span className={cn("font-medium", done ? "text-[#39865a]" : "text-[#2383E2]")}>{done ? "Complete" : "Updating"}</span>
              </div>
            );
          })}
        </div>
        <Progress value={progress} className="sm:hidden" />
      </div>
    </div>
  );
}
