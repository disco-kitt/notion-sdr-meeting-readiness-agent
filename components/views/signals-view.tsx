"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BriefcaseBusiness, Check, Lightbulb, Radio, RefreshCw, Sparkles, Star, Target, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { signals } from "@/lib/mock-data";
import { confidenceLabel } from "@/lib/meeting-readiness";
import { cn } from "@/lib/utils";

const categoryIcon = { Leadership: Users, Product: Target, Hiring: BriefcaseBusiness, Strategic: Radio };
const categoryStyle = {
  Leadership: "bg-[#f4effc] text-[#694e9e]",
  Product: "bg-[#edf6ff] text-[#1b6ca8]",
  Hiring: "bg-[#edf8f0] text-[#267047]",
  Strategic: "bg-[#fbf4df] text-[#815f20]",
};

export function SignalsView({ progress, notify, reviewed, onReviewed }: { progress: number; notify: (message: string) => void; reviewed: boolean; onReviewed: () => void }) {
  const reduceMotion = useReducedMotion();
  const [filter, setFilter] = React.useState<"All" | "High impact">("All");
  const [saved, setSaved] = React.useState<string[]>(["signal-1"]);
  const visible = signals.filter((signal) => filter === "All" || signal.highImpact);

  return (
    <div className="workspace-view max-w-[1120px]">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div><h2 className="workspace-heading">Strategic signals</h2><p className="workspace-description">Recent changes that may create urgency, relevance, or risk.</p></div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant={reviewed ? "secondary" : "default"} size="sm" onClick={onReviewed} aria-pressed={reviewed}>
            <Check />{reviewed ? "Signals reviewed" : "Mark reviewed"}
          </Button>
          <div className="flex rounded-lg border border-border bg-white p-0.5" role="group" aria-label="Filter strategic signals">
            {(["All", "High impact"] as const).map((value) => <button key={value} onClick={() => setFilter(value)} aria-pressed={filter === value} className={cn("min-h-8 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors", filter === value ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground")}>{value}</button>)}
          </div>
        </div>
      </div>

      <div className="mb-5 flex flex-col gap-3 rounded-xl border border-[#d9e7f5] bg-[#f7fbff] p-4 sm:flex-row sm:items-start">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#e5f1fc] text-[#2383E2]"><Lightbulb className="size-4" /></div>
        <div className="flex-1"><div className="text-sm font-semibold">Suggested opening angle</div><p className="mt-1 text-sm leading-6 text-muted-foreground">Ask how Maya Chen is evaluating the revenue operating system she inherited. The leadership transition is the strongest path to uncovering active transformation work.</p><div className="mt-1.5 text-[11px] text-muted-foreground">High confidence · supported by 4 sources</div></div>
        <Button variant="ghost" size="sm" className="self-start sm:ml-auto" onClick={() => notify("Opening angle added to the brief")}><Sparkles />Add to brief</Button>
      </div>

      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {visible.map((signal, index) => {
            const Icon = categoryIcon[signal.category];
            return (
              <motion.div key={signal.id} layout initial={reduceMotion ? false : { opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0 }} transition={{ duration: 0.18, delay: reduceMotion ? 0 : index * 0.03 }}>
                <Card className="group transition-colors hover:border-[#cbc9c3]">
                  <CardContent className="flex gap-3 p-4 sm:gap-4 sm:p-5">
                    <div className={cn("flex size-10 shrink-0 items-center justify-center rounded-lg", categoryStyle[signal.category])}><Icon className="size-4.5" /></div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="text-[15px] font-semibold">{signal.title}</h3>{signal.highImpact && <Badge variant="amber">High impact</Badge>}</div><p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{signal.detail}</p></div>
                        <Button variant="ghost" size="icon" className={cn("shrink-0", saved.includes(signal.id) && "text-[#8a6825]")} onClick={() => setSaved((current) => current.includes(signal.id) ? current.filter((id) => id !== signal.id) : [...current, signal.id])} aria-label={`${saved.includes(signal.id) ? "Unsave" : "Save"} ${signal.title}`} aria-pressed={saved.includes(signal.id)}><Star className={cn(saved.includes(signal.id) && "fill-current")} /></Button>
                      </div>
                      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="outline">{signal.category}</Badge><span>{signal.source}</span><span aria-hidden="true">·</span><span>{signal.timing}</span><span className="sm:ml-auto flex items-center gap-1"><Check className="size-3.5 text-[#39865a]" />{confidenceLabel(signal.confidence)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {progress < 92 && (
          <Card role="status" aria-live="polite" aria-label="Researching additional strategic signals">
            <CardContent className="flex items-center gap-4 p-5">
              <Skeleton className="size-10 shrink-0" />
              <div className="flex-1 space-y-2"><Skeleton className="h-4 w-[46%]" /><Skeleton className="h-3.5 w-[82%]" /><div className="flex items-center gap-2 pt-1 text-xs text-[#2383E2]"><RefreshCw className="size-3.5 animate-spin" />Scanning recent company sources…</div></div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
