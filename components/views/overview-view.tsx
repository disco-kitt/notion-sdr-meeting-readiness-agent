"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Check,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  ExternalLink,
  Lightbulb,
  MessageSquareText,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { EditableText } from "@/components/editable-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { signals, stakeholders } from "@/lib/mock-data";
import { confidenceLabel } from "@/lib/meeting-readiness";
import { cn } from "@/lib/utils";

const recentChanges = [
  {
    id: "change-cro",
    title: "Maya Chen joined as CRO",
    detail: "A new executive owner is evaluating the revenue operating system she inherited.",
    timing: "6 weeks ago",
    confidence: 96,
  },
  {
    id: "change-enterprise",
    title: "Acme launched an enterprise plan",
    detail: "New governance and workflow features signal a deliberate move upmarket.",
    timing: "12 days ago",
    confidence: 91,
  },
  {
    id: "change-hiring",
    title: "RevOps hiring expanded to three regions",
    detail: "The team is standardizing processes while its operating footprint grows.",
    timing: "Active now",
    confidence: 88,
  },
];

export function OverviewView({
  progress,
  notify,
  onOpenTab,
  selectedQuestionCount,
}: {
  progress: number;
  notify: (message: string) => void;
  onOpenTab: (tab: string) => void;
  selectedQuestionCount: number;
}) {
  const reduceMotion = useReducedMotion();
  const [summary, setSummary] = React.useState(
    "Acme is moving upmarket while a new CRO builds a more consistent revenue operating cadence. Rapid hiring, distributed teams, and a new enterprise offer make fragmented account context newly expensive.",
  );
  const [note, setNote] = React.useState("");
  const [showAccountContext, setShowAccountContext] = React.useState(false);
  const [showAllChanges, setShowAllChanges] = React.useState(false);
  const [showEvidence, setShowEvidence] = React.useState(false);

  const reveal = (delay: number) => reduceMotion ? {} : {
    initial: { opacity: 0, y: 6 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.18, delay, ease: "easeOut" as const },
  };

  return (
    <div className="workspace-view max-w-[1240px] !py-5 lg:!py-6">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_310px]">
        <div className="min-w-0 space-y-5">
          <motion.section {...reveal(0.03)}>
            <Card className="overflow-hidden border-[#d9e3ee] shadow-none">
              <CardHeader className="pb-3">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="flex size-7 items-center justify-center rounded-md bg-[#edf6ff] text-[#2383E2]"><Sparkles className="size-4" /></div>
                      <CardTitle>Why this meeting, why now</CardTitle>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">The clearest narrative to carry into the conversation</p>
                  </div>
                  <button className="flex items-center gap-1.5 rounded-md px-1.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-[#f4f4f2] hover:text-foreground" onClick={() => setShowEvidence((current) => !current)} aria-expanded={showEvidence}>
                    <span className="size-1.5 rounded-full bg-[#3c8a5b]" />High confidence · 5 sources<ChevronDown className={cn("size-3.5 transition-transform duration-200", showEvidence && "rotate-180")} />
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <EditableText value={summary} onChange={(value) => { setSummary(value); notify("Why-now narrative updated"); }} />

                <AnimatePresence initial={false}>
                  {showEvidence && (
                    <motion.div initial={reduceMotion ? false : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={reduceMotion ? undefined : { opacity: 0, height: 0 }} className="overflow-hidden">
                      <div className="mt-4 grid gap-2 border-t border-[#ecebe7] pt-3 sm:grid-cols-2">
                        {["Salesforce · account activity", "LinkedIn · CRO role change", "Acme blog · enterprise launch", "Careers · RevOps expansion", "Q2 update · expansion priority"].map((source) => <div key={source} className="flex items-center gap-2 text-xs text-muted-foreground"><Check className="size-3 text-[#39865a]" />{source}</div>)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence initial={false}>
                  {progress >= 78 && (
                    <motion.div
                      initial={reduceMotion ? false : { opacity: 0, height: 0, y: 4 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      className="mt-4 overflow-hidden"
                    >
                      <div className="flex items-start gap-2.5 rounded-lg bg-[#f7f6fb] px-3 py-2.5 text-sm">
                        <Sparkles className="mt-0.5 size-3.5 shrink-0 text-[#7256a0]" />
                        <div>
                          <span className="font-medium">The recommended opening changed.</span>
                          <span className="text-muted-foreground"> Lead with the CRO transition before discussing tooling or productivity.</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.section>

          <motion.section {...reveal(0.07)}>
            <Card className="shadow-none">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2"><CardTitle>What’s changed</CardTitle><Badge variant="blue">Since last meeting</Badge></div>
                    <p className="mt-1 text-sm text-muted-foreground">New context that could change the conversation</p>
                  </div>
                  <Clock3 className="mt-0.5 size-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent className="pt-1">
                <div className="divide-y divide-[#ecebe7]">
                  {recentChanges.slice(0, showAllChanges ? recentChanges.length : 1).map((change, index) => (
                    <motion.div
                      key={change.id}
                      layout
                      initial={index > 0 && !reduceMotion ? { opacity: 0, y: 5 } : false}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-3 py-3"
                    >
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#2383E2]" />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                          <div className="text-sm font-medium">{change.title}</div>
                          <div className="text-xs text-muted-foreground">{change.timing}</div>
                        </div>
                        <p className="mt-1 text-sm leading-5 text-muted-foreground">{change.detail}</p>
                        <div className="mt-2 text-[11px] text-muted-foreground">{confidenceLabel(change.confidence)}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <Button variant="ghost" size="sm" className="mt-1 -ml-2 text-muted-foreground" onClick={() => setShowAllChanges((current) => !current)}>
                  {showAllChanges ? "Show less" : `Show ${recentChanges.length - 1} more changes`}
                  <ChevronDown className={cn("transition-transform duration-200", showAllChanges && "rotate-180")} />
                </Button>
              </CardContent>
            </Card>
          </motion.section>

          <motion.div {...reveal(0.11)} className="grid gap-5 xl:grid-cols-2">
            <Card className="shadow-none">
              <CardHeader className="flex-row items-start justify-between space-y-0 pb-2">
                <div><CardTitle>Priority signals</CardTitle><p className="mt-1 text-sm text-muted-foreground">Most useful in the meeting</p></div>
                <Button variant="ghost" size="sm" onClick={() => onOpenTab("signals")}>Review <ArrowRight /></Button>
              </CardHeader>
              <CardContent className="space-y-1">
                {signals.slice(0, 2).map((signal) => (
                  <button key={signal.id} onClick={() => onOpenTab("signals")} className="group flex w-full items-start gap-3 rounded-md px-1 py-2.5 text-left transition-colors hover:bg-[#f7f7f5]">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#8b6db3]" />
                    <div className="min-w-0"><div className="text-sm font-medium leading-5">{signal.title}</div><div className="mt-1 text-[11px] text-muted-foreground">{confidenceLabel(signal.confidence)} · {signal.source}</div></div>
                  </button>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-none">
              <CardHeader className="flex-row items-start justify-between space-y-0 pb-2">
                <div><CardTitle>Discovery plan</CardTitle><p className="mt-1 text-sm text-muted-foreground">A deliberate path through the call</p></div>
                <Badge variant="secondary">{selectedQuestionCount} questions</Badge>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3 text-sm">
                  <li className="flex gap-2.5"><span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#f1f1ef] text-[10px] font-semibold">1</span><span><strong className="font-medium">Open with change.</strong> <span className="text-muted-foreground">Understand what the new CRO is reassessing.</span></span></li>
                  <li className="flex gap-2.5"><span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#f1f1ef] text-[10px] font-semibold">2</span><span><strong className="font-medium">Explore friction.</strong> <span className="text-muted-foreground">Find where account context gets lost.</span></span></li>
                  <li className="flex gap-2.5"><span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#f1f1ef] text-[10px] font-semibold">3</span><span><strong className="font-medium">Quantify impact.</strong> <span className="text-muted-foreground">Connect inconsistency to expansion goals.</span></span></li>
                </ol>
                <Button variant="secondary" size="sm" className="mt-4" onClick={() => onOpenTab("discovery")}><MessageSquareText />Curate questions</Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.section {...reveal(0.15)}>
            <Card className="shadow-none">
              <button className="flex w-full items-center gap-3 p-4 text-left" onClick={() => setShowAccountContext((current) => !current)} aria-expanded={showAccountContext}>
                <Building2 className="size-4 text-muted-foreground" />
                <div className="min-w-0 flex-1"><div className="text-sm font-semibold">Account context</div><div className="mt-0.5 truncate text-xs text-muted-foreground">B2B SaaS · Series D · 1,240 employees · $184M estimated ARR</div></div>
                <ChevronDown className={cn("size-4 text-muted-foreground transition-transform duration-200", showAccountContext && "rotate-180")} />
              </button>
              <AnimatePresence initial={false}>
                {showAccountContext && (
                  <motion.div initial={reduceMotion ? false : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={reduceMotion ? undefined : { opacity: 0, height: 0 }} className="overflow-hidden">
                    <CardContent className="border-t border-[#ecebe7] pt-4">
                      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        <Metric icon={Building2} label="Company" value="B2B SaaS" detail="Series D" />
                        <Metric icon={Users} label="Employees" value="1,240" detail="+18% YoY" positive />
                        <Metric icon={CircleDollarSign} label="Revenue" value="$184M" detail="Est. ARR" />
                        <Metric icon={TrendingUp} label="Relationship" value="Warm" detail="3 prior touches" positive />
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.section>
        </div>

        <aside className="space-y-5">
          <motion.section {...reveal(0.06)}>
            <Card className="shadow-none">
              <CardHeader className="flex-row items-center justify-between space-y-0 pb-2"><CardTitle>People in the room</CardTitle><Button variant="ghost" size="icon" aria-label="Open stakeholder map" onClick={() => onOpenTab("stakeholders")}><ExternalLink /></Button></CardHeader>
              <CardContent className="space-y-1">
                {stakeholders.map((person) => (
                  <button key={person.name} onClick={() => onOpenTab("stakeholders")} className="flex w-full items-center gap-3 rounded-md py-2 text-left transition-colors hover:bg-[#f7f7f5]">
                    <div className={`flex size-8 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${person.color}`}>{person.initials}</div>
                    <div className="min-w-0 flex-1"><div className="truncate text-sm font-medium">{person.name}</div><div className="truncate text-xs text-muted-foreground">{person.role}</div></div>
                    {person.influence === "Decision maker" && <span className="size-1.5 shrink-0 rounded-full bg-[#8b6db3]" title="Decision maker" />}
                  </button>
                ))}
              </CardContent>
            </Card>
          </motion.section>

          <motion.section {...reveal(0.1)}>
            <Card className="border-[#e7e2d4] bg-[#fffdf8] shadow-none">
              <CardContent className="p-4">
                <div className="flex items-start gap-2.5"><Lightbulb className="mt-0.5 size-4 shrink-0 text-[#95712d]" /><div><div className="text-sm font-semibold">Suggested opening</div><p className="mt-1 text-sm leading-5 text-muted-foreground">“What are you reassessing about the revenue operating system you inherited?”</p><div className="mt-2 text-[11px] text-muted-foreground">High confidence · leadership change + engagement history</div></div></div>
              </CardContent>
            </Card>
          </motion.section>

          <motion.section {...reveal(0.14)}>
            <Card className="shadow-none">
              <CardHeader className="pb-2"><div className="flex items-center gap-2"><MessageSquareText className="size-4 text-muted-foreground" /><CardTitle>Your notes</CardTitle></div></CardHeader>
              <CardContent>
                <Textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Add a reminder or hypothesis…" className="min-h-[96px] border-0 bg-[#f7f7f5] shadow-none focus:ring-1" />
                <div className="mt-2 flex justify-end"><Button variant="ghost" size="sm" disabled={!note.trim()} onClick={() => notify("Note saved to the meeting brief")}><Check />Save note</Button></div>
              </CardContent>
            </Card>
          </motion.section>
        </aside>
      </div>
    </div>
  );
}

function Metric({ icon: Icon, label, value, detail, positive }: { icon: React.ElementType; label: string; value: string; detail: string; positive?: boolean }) {
  return (
    <div className="rounded-lg bg-[#f8f8f6] p-3">
      <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.06em] text-muted-foreground"><Icon className="size-3.5" />{label}</div>
      <div className="mt-2 flex items-end justify-between gap-2"><span className="text-base font-semibold tracking-[-0.02em]">{value}</span><span className={cn("text-[11px]", positive ? "text-[#39865a]" : "text-muted-foreground")}>{detail}</span></div>
    </div>
  );
}
