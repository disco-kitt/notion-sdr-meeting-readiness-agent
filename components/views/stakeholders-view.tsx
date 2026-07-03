"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, Network, Sparkles, UserRoundCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { stakeholders } from "@/lib/mock-data";

export function StakeholdersView({ progress, reviewed, onReviewed }: { progress: number; reviewed: boolean; onReviewed: () => void }) {
  const reduceMotion = useReducedMotion();
  return (
    <div className="workspace-view max-w-[1180px]">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><h2 className="workspace-heading">Stakeholder map</h2><p className="workspace-description">Who is in the room, what they likely care about, and how influence may flow.</p></div><Button className="self-start" variant={reviewed ? "secondary" : "default"} size="sm" onClick={onReviewed} aria-pressed={reviewed}><Check />{reviewed ? "Roles confirmed" : "Confirm stakeholder roles"}</Button></div>

      <Card className="mb-5 overflow-hidden">
        <CardHeader className="border-b border-border bg-[#fcfcfb] pb-4"><div className="flex items-center gap-2"><Network className="size-4 text-muted-foreground" /><CardTitle>Buying group</CardTitle><Badge variant="green"><Check className="size-3" />3 matched</Badge></div></CardHeader>
        <CardContent className="relative grid gap-4 p-5 md:grid-cols-3">
          <div className="pointer-events-none absolute left-[18%] right-[18%] top-[49px] hidden h-px bg-border md:block" />
          {stakeholders.map((person, index) => (
            <motion.div key={person.name} initial={reduceMotion ? false : { opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18, delay: reduceMotion ? 0 : index * 0.04 }} className="relative rounded-lg border border-[#e8e7e4] bg-white p-4">
              <div className="flex items-start gap-3"><div className={`relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${person.color}`}>{person.initials}</div><div className="min-w-0 flex-1"><div className="font-semibold">{person.name}</div><div className="mt-0.5 text-xs text-muted-foreground">{person.role}</div></div></div>
              <Badge variant={person.influence === "Decision maker" ? "violet" : person.influence === "Champion" ? "green" : "secondary"} className="mt-4">{person.influence}</Badge>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{person.note}</p>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
        <Card>
          <CardHeader><div className="flex items-center gap-2"><Sparkles className="size-4 text-[#694e9e]" /><CardTitle>How to navigate the room</CardTitle><span className="ml-auto text-[11px] text-muted-foreground">Good confidence · 3 signals</span></div></CardHeader>
          <CardContent className="space-y-4">
            <Recommendation number="1" title="Start with Jordan’s current workflow" text="Jordan booked the meeting and can validate the operational pain before you elevate to Maya’s strategic priorities." />
            <Recommendation number="2" title="Invite Maya to define the target state" text="Ask what a consistent revenue operating cadence should look like six months from now." />
            <Recommendation number="3" title="Use Ari to test adoption risk" text="Ari can expose where enablement content, process, and rep behavior fail to stay connected today." />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Relationship context</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3"><div className="flex size-8 items-center justify-center rounded-lg bg-[#edf8f0] text-[#267047]"><UserRoundCheck className="size-4" /></div><div><div className="text-sm font-medium">Jordan is a warm contact</div><p className="mt-1 text-xs leading-5 text-muted-foreground">Viewed the enterprise guide and replied to Devon’s follow-up last week.</p></div></div>
            <div className="border-t border-border pt-4"><div className="text-xs font-medium uppercase tracking-[0.07em] text-muted-foreground">Prior engagement</div><div className="mt-3 space-y-3 text-sm"><div className="flex justify-between"><span>Enterprise guide</span><Badge variant="green">Viewed</Badge></div><div className="flex justify-between"><span>Outbound sequence</span><span className="text-muted-foreground">3 touches</span></div><div className="flex justify-between"><span>Last contact</span><span className="text-muted-foreground">6 days ago</span></div></div></div>
            {progress < 62 && <div className="space-y-2 pt-1" role="status" aria-label="Loading relationship history"><Skeleton className="h-3.5 w-[80%]" /><Skeleton className="h-3.5 w-[60%]" /><span className="sr-only">Loading relationship history</span></div>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Recommendation({ number, title, text }: { number: string; title: string; text: string }) {
  return <div className="flex gap-3"><div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#f1f1ef] text-xs font-semibold">{number}</div><div><div className="text-sm font-semibold">{title}</div><p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p></div></div>;
}
