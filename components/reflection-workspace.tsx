"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Circle,
  FilePenLine,
  Loader2,
  RotateCcw,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type AssumptionState = "Correct" | "Incorrect" | "Unknown";
type CrmStatus = "review" | "editing" | "approved" | "discarded";

const assumptions = [
  { id: "a1", text: "A new CRO is driving a broader revenue-operations transformation.", source: "Leadership signal" },
  { id: "a2", text: "Jordan Lee is the internal champion for a new meeting-prep workflow.", source: "Engagement pattern" },
  { id: "a3", text: "Global expansion is creating an urgent need for process standardization.", source: "Hiring signal" },
];

export function ReflectionWorkspace({ notify, onBack }: { notify: (message: string) => void; onBack: () => void }) {
  const [priorities, setPriorities] = React.useState("Create a repeatable executive account-review process before the Q4 planning cycle.");
  const [objections, setObjections] = React.useState("Concerned about adding another place for reps to update. Needs a clear Salesforce sync story.");
  const [nextSteps, setNextSteps] = React.useState("Send sample account workspace. Schedule workflow session with Jordan and Ari next week.");
  const [labels, setLabels] = React.useState<Record<string, AssumptionState>>({ a1: "Correct", a2: "Correct", a3: "Unknown" });
  const [crmStatus, setCrmStatus] = React.useState<CrmStatus>("review");
  const [refining, setRefining] = React.useState(false);

  const completed = [priorities, objections, nextSteps].filter((value) => value.trim()).length + Object.keys(labels).length;
  const crmResolved = crmStatus === "approved" || crmStatus === "discarded";
  const progress = Math.round(((completed + (crmResolved ? 1 : 0)) / 7) * 100);

  const approve = () => {
    setCrmStatus("approved");
    setRefining(true);
    notify("CRM updates approved and queued");
    window.setTimeout(() => setRefining(false), 1600);
  };

  return (
    <div>
      <section className="border-b border-[#e7e6e2] bg-white/70 px-4 py-6 sm:px-7 sm:py-8">
        <div className="mx-auto max-w-[1180px]">
          <button onClick={onBack} className="mb-5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"><ArrowLeft className="size-3.5" />Back to meeting prep</button>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4"><div className="flex size-12 items-center justify-center rounded-xl bg-[#f7dfc1] text-lg font-bold text-[#855b21]">L</div><div><div className="mb-1.5 flex flex-wrap items-center gap-2"><h1 className="text-2xl font-semibold tracking-[-0.025em] sm:text-[28px]">Lumon discovery debrief</h1><Badge variant="amber">Reflection due</Badge></div><p className="text-sm text-muted-foreground">Today, 10:00–10:30 AM · Completed 42 minutes ago</p></div></div>
            <div className="w-full rounded-xl border border-border bg-white p-3 sm:w-auto sm:min-w-[220px]"><div className="flex items-center justify-between text-xs"><span className="font-medium">Reflection progress</span><span className="text-muted-foreground">{progress}%</span></div><Progress value={progress} className="mt-2" /></div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1180px] gap-5 px-4 py-6 sm:px-7 lg:grid-cols-[minmax(0,1fr)_350px] lg:py-8">
        <div className="min-w-0 space-y-5">
          <div className="flex items-start gap-3 rounded-xl border border-[#e5ddf3] bg-[#faf8fd] p-4"><div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#f0eafa] text-[#694e9e]"><Sparkles className="size-4" /></div><div><div className="text-sm font-semibold">Capture what the agent couldn’t hear</div><p className="mt-1 text-sm leading-6 text-muted-foreground">Your notes will draft the CRM update and improve how future meetings are researched and recommended.</p></div></div>

          <Card>
            <CardHeader><CardTitle>What did you learn?</CardTitle><p className="text-sm text-muted-foreground">Keep it concise. The agent will structure the details for Salesforce.</p></CardHeader>
            <CardContent className="space-y-5">
              <ReflectionField number="1" label="Customer priorities" prompt="What outcomes matter most?" value={priorities} onChange={setPriorities} />
              <ReflectionField number="2" label="Objections or risks" prompt="What could slow this down?" value={objections} onChange={setObjections} />
              <ReflectionField number="3" label="Next steps" prompt="What was agreed, and who owns it?" value={nextSteps} onChange={setNextSteps} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader><div><CardTitle>Check the agent’s assumptions</CardTitle><p className="mt-1 text-sm text-muted-foreground">This feedback improves future research and recommendations.</p></div></CardHeader>
            <CardContent className="space-y-3">
              {assumptions.map((assumption) => (
                <div key={assumption.id} className="rounded-lg border border-[#e8e7e4] p-4">
                  <p className="text-sm font-medium leading-6">{assumption.text}</p>
                  <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><span className="text-xs text-muted-foreground">Based on: {assumption.source}</span><div className="flex rounded-lg bg-[#f4f4f2] p-0.5" role="group" aria-label={`Accuracy of assumption: ${assumption.text}`}>{(["Correct", "Incorrect", "Unknown"] as const).map((state) => <button key={state} onClick={() => setLabels((current) => ({ ...current, [assumption.id]: state }))} aria-pressed={labels[assumption.id] === state} className={cn("flex min-h-8 flex-1 items-center justify-center gap-1 rounded-md px-2 py-1.5 text-[11px] font-medium transition-colors sm:flex-none", labels[assumption.id] === state ? state === "Correct" ? "bg-white text-[#267047]" : state === "Incorrect" ? "bg-white text-[#a23f39]" : "bg-white text-foreground" : "text-muted-foreground hover:text-foreground")} >{state === "Correct" ? <Check className="size-3" /> : state === "Incorrect" ? <X className="size-3" /> : <Circle className="size-2.5" />}{state}</button>)}</div></div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-5">
          <Card className="overflow-hidden border-[#d9e7f5]">
            <div className="h-1 bg-[#77aee1]" />
            <CardHeader className="pb-3"><div className="flex items-center justify-between"><div className="flex items-center gap-2"><FilePenLine className="size-4 text-[#2383E2]" /><CardTitle>Draft CRM update</CardTitle></div>{crmStatus === "review" && <Badge variant="blue">AI draft</Badge>}{crmStatus === "approved" && <Badge variant="green">Approved</Badge>}{crmStatus === "discarded" && <Badge variant="secondary">Discarded</Badge>}</div></CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                {crmStatus === "discarded" ? (
                  <motion.div key="discarded" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-7 text-center"><Trash2 className="mx-auto size-5 text-muted-foreground" /><div className="mt-2 text-sm font-medium">CRM draft discarded</div><Button variant="ghost" size="sm" className="mt-2" onClick={() => setCrmStatus("review")}><RotateCcw />Restore draft</Button></motion.div>
                ) : crmStatus === "approved" ? (
                  <motion.div key="approved" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="py-6 text-center"><div className="mx-auto flex size-10 items-center justify-center rounded-full bg-[#edf8f0] text-[#267047]"><CheckCircle2 className="size-5" /></div><div className="mt-3 text-sm font-semibold">Salesforce update queued</div><p className="mt-1 text-xs leading-5 text-muted-foreground">Opportunity notes and next steps will sync after final validation.</p></motion.div>
                ) : (
                  <motion.div key="draft" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <CrmField label="Stage" value="Discovery" editable={crmStatus === "editing"} />
                    <CrmField label="Customer priority" value="Standardize executive account reviews before Q4 planning" editable={crmStatus === "editing"} />
                    <CrmField label="Primary risk" value="Adoption and duplicate data entry across Notion and Salesforce" editable={crmStatus === "editing"} />
                    <CrmField label="Next step" value="Workflow session with Jordan and Ari — next week" editable={crmStatus === "editing"} />
                    <div className="grid grid-cols-3 gap-2 border-t border-border pt-4"><Button size="sm" className="col-span-2" onClick={approve}><Check />Approve</Button><Button variant="secondary" size="sm" onClick={() => setCrmStatus(crmStatus === "editing" ? "review" : "editing")}>{crmStatus === "editing" ? "Done" : "Edit"}</Button></div>
                    <Button variant="ghost" size="sm" className="w-full text-muted-foreground" onClick={() => setCrmStatus("discarded")}><Trash2 />Discard draft</Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>

          <Card><CardContent className="p-4"><div className="flex items-start gap-3" role="status" aria-live="polite"><div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#f0eafa] text-[#694e9e]">{refining ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}</div><div><div className="text-sm font-semibold">Future recommendations</div><p className="mt-1 text-xs leading-5 text-muted-foreground">{refining ? "Applying your feedback to future recommendations…" : "Your corrections will influence similar leadership-change and RevOps-expansion signals."}</p>{!refining && <Badge variant="violet" className="mt-3">3 learning signals</Badge>}</div></div></CardContent></Card>

          <Button className="w-full" disabled={!crmResolved} onClick={() => notify("Reflection complete — follow-up workspace updated")}><Check />{crmResolved ? "Complete reflection" : "Review CRM update to finish"}</Button>
        </aside>
      </div>
    </div>
  );
}

function ReflectionField({ number, label, prompt, value, onChange }: { number: string; label: string; prompt: string; value: string; onChange: (value: string) => void }) {
  const id = React.useId();
  return <div><div className="mb-2 flex flex-wrap items-center gap-2"><span className="flex size-5 items-center justify-center rounded-full bg-[#f1f1ef] text-[10px] font-semibold">{number}</span><label htmlFor={id} className="text-sm font-semibold">{label}</label><span className="text-xs text-muted-foreground">· {prompt}</span></div><Textarea id={id} value={value} onChange={(event) => onChange(event.target.value)} className="min-h-[92px] bg-[#fcfcfb]" /></div>;
}

function CrmField({ label, value, editable }: { label: string; value: string; editable: boolean }) {
  return <div><div className="mb-1 text-[10px] font-medium uppercase tracking-[0.07em] text-muted-foreground">{label}</div>{editable ? <Textarea aria-label={label} defaultValue={value} className="min-h-[64px] text-xs leading-5" /> : <p className="text-xs leading-5 text-[#4f4d47]">{value}</p>}</div>;
}
