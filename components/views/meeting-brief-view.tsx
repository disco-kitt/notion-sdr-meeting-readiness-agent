"use client";

import * as React from "react";
import { Reorder } from "framer-motion";
import { Check, Clipboard, Download, FileText, GripVertical, Loader2, NotepadText, Plus, Send, Sparkles, Trash2 } from "lucide-react";
import type { BriefStatus } from "@/components/meeting-prep-app";
import { EditableText } from "@/components/editable-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { initialBrief } from "@/lib/mock-data";

export function MeetingBriefView({
  briefStatus,
  setBriefStatus,
  generated,
  onGeneratedChange,
  researchComplete,
  onBlockCountChange,
  reviewed,
  onReviewed,
  onReturnToOverview,
  preparationReady,
  remainingPreparationSteps,
  selectedQuestionCount,
  notify,
}: {
  briefStatus: BriefStatus;
  setBriefStatus: (status: BriefStatus) => void;
  generated: boolean;
  onGeneratedChange: (generated: boolean) => void;
  researchComplete: boolean;
  onBlockCountChange: (count: number) => void;
  reviewed: boolean;
  onReviewed: () => void;
  onReturnToOverview: () => void;
  preparationReady: boolean;
  remainingPreparationSteps: number;
  selectedQuestionCount: number;
  notify: (message: string) => void;
}) {
  const [generating, setGenerating] = React.useState(false);
  const [blocks, setBlocks] = React.useState(initialBrief);
  const [note, setNote] = React.useState("");
  const [newTitle, setNewTitle] = React.useState("");
  const [shareOpen, setShareOpen] = React.useState(false);

  React.useEffect(() => {
    onBlockCountChange(blocks.length);
  }, [blocks.length, onBlockCountChange]);

  const generate = () => {
    setGenerating(true);
    window.setTimeout(() => {
      setGenerating(false);
      onGeneratedChange(true);
      notify("Meeting brief assembled from the latest research");
    }, 1200);
  };

  if (!generated) {
    return (
      <div className="mx-auto flex max-w-[920px] items-center justify-center px-4 py-12 sm:px-7 lg:py-20">
        <Card className="w-full overflow-hidden border-[#d9e7f5]">
          <CardContent className="flex flex-col items-center p-8 text-center sm:p-12">
            <div className="flex size-12 items-center justify-center rounded-xl bg-[#edf6ff] text-[#2383E2]"><FileText className="size-5" /></div>
            <h2 className="mt-5 text-xl font-semibold tracking-[-0.02em]">Build your meeting brief</h2>
            <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">The agent will assemble the company overview, strongest signals, stakeholder context, {selectedQuestionCount} selected questions, and a recommended meeting angle.</p>
            {!researchComplete && <div className="mt-4 max-w-lg rounded-lg bg-[#fbf4df] px-3 py-2 text-xs leading-5 text-[#76571f]">Research is still running. You can start now; new high-impact findings will update this draft.</div>}
            <div className="mt-6 grid w-full max-w-xl gap-2 text-left sm:grid-cols-3">
              {["Account context", "Discovery plan", "Recommended angle"].map((label) => <div key={label} className="flex items-center gap-2 rounded-lg bg-[#f7f7f5] px-3 py-2.5 text-xs"><Check className="size-3.5 text-[#39865a]" />{label}</div>)}
            </div>
            <Button className="mt-7 min-w-40" size="lg" disabled={generating} onClick={generate} aria-live="polite">
              {generating ? <><Loader2 className="animate-spin" />Assembling brief…</> : <><Sparkles />{researchComplete ? "Generate brief" : "Generate partial draft"}</>}
            </Button>
            <button className="mt-3 text-xs text-muted-foreground hover:text-foreground" onClick={() => { onGeneratedChange(true); setBlocks([]); }}>Start with a blank brief</button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const updateBlock = (id: string, body: string) => setBlocks((current) => current.map((block) => block.id === id ? { ...block, body } : block));
  const addSection = () => {
    if (!newTitle.trim()) return;
    setBlocks((current) => [...current, { id: `brief-${Date.now()}`, title: newTitle.trim(), body: "Click to add details." }]);
    setNewTitle("");
  };

  return (
    <div className="workspace-view max-w-[1100px]">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div><div className="flex items-center gap-2"><h2 className="workspace-heading">Meeting brief</h2><Badge variant={briefStatus === "Ready" ? "green" : briefStatus === "Shared" ? "blue" : "secondary"}>{briefStatus}</Badge></div><p className="workspace-description">Review the draft, edit what matters, then share it.</p></div>
        <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
          <Button variant="secondary" size="sm" className="w-full" onClick={() => notify("Brief copied into a new Notion page")}><NotepadText />Copy into Notion</Button>
          <Dialog open={shareOpen} onOpenChange={setShareOpen}>
            <DialogTrigger asChild><Button variant={preparationReady ? "blue" : "secondary"} size="sm"><Send />{preparationReady ? "Share with AE" : "Share draft"}</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>{preparationReady ? "Share meeting brief" : "Share draft brief"}</DialogTitle><DialogDescription>Send the latest version to your account executive. They’ll receive a Notion notification and a direct link.</DialogDescription></DialogHeader>
              {!preparationReady && <div className="rounded-lg border border-[#ead7ad] bg-[#fbf4df] px-3 py-2 text-xs leading-5 text-[#76571f]">This brief is still a draft. {remainingPreparationSteps} preparation {remainingPreparationSteps === 1 ? "step remains" : "steps remain"} before the meeting is ready.</div>}
              <div className="rounded-lg border border-border bg-[#fafaf9] p-3"><div className="flex items-center gap-3"><div className="flex size-9 items-center justify-center rounded-full bg-[#f7dfc1] text-xs font-semibold text-[#855b21]">AR</div><div><div className="text-sm font-medium">Alex Rivera</div><div className="text-xs text-muted-foreground">Account Executive · Acme</div></div><Check className="ml-auto size-4 text-[#39865a]" /></div></div>
              <Textarea aria-label="Optional note for Alex" placeholder="Add a note for Alex (optional)" className="min-h-[90px]" />
              <div className="flex justify-end gap-2"><DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose><Button variant="blue" onClick={() => { setBriefStatus("Shared"); setShareOpen(false); notify("Alex was notified — brief shared"); }}><Send />Share brief</Button></div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
        <Card className="overflow-hidden">
          <div className="border-b border-border bg-[#fcfcfb] px-6 py-5">
            <div className="flex items-start justify-between gap-4"><div><div className="text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">Meeting brief</div><h1 className="mt-2 text-2xl font-semibold tracking-[-0.025em]">Acme discovery call</h1><p className="mt-1 text-sm text-muted-foreground">Tuesday, July 8 · 12:30 PM · Prepared for Devon Scott</p></div><div className="flex size-10 items-center justify-center rounded-lg bg-[#dbeafe] font-bold text-[#245b96]">A</div></div>
          </div>
          <CardContent className="p-3 sm:p-5">
            <div className="mb-3 flex items-start gap-2 rounded-lg bg-[#f7f6fb] px-3 py-2.5 text-xs leading-5 text-muted-foreground"><Sparkles className="mt-0.5 size-3.5 shrink-0 text-[#7256a0]" /><span><strong className="font-medium text-foreground">AI draft.</strong> Assembled from 26 sources and your selected discovery questions. Verify the details before sharing.</span></div>
            {blocks.length === 0 && <div className="rounded-lg border border-dashed p-8 text-center"><FileText className="mx-auto size-5 text-muted-foreground" /><p className="mt-2 text-sm font-medium">Your brief is blank</p><p className="mt-1 text-xs text-muted-foreground">Add a section below to begin.</p></div>}
            <Reorder.Group axis="y" values={blocks} onReorder={setBlocks} className="space-y-2" aria-label="Meeting brief sections">
              {blocks.map((block) => (
                <Reorder.Item key={block.id} value={block} className="group flex gap-2 rounded-lg border border-transparent p-3 hover:border-[#e8e7e4] hover:bg-[#fcfcfb]">
                  <span className="mt-1 cursor-grab text-muted-foreground/45 active:cursor-grabbing" aria-hidden="true"><GripVertical className="size-4" /></span>
                  <div className="min-w-0 flex-1"><h3 className="mb-2 text-sm font-semibold">{block.title}</h3><EditableText label={block.title} value={block.body} onChange={(value) => updateBlock(block.id, value)} /></div>
                  <Button variant="ghost" size="icon" className="size-8 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100" aria-label={`Remove ${block.title}`} onClick={() => setBlocks((current) => current.filter((item) => item.id !== block.id))}><Trash2 className="size-3.5" /></Button>
                </Reorder.Item>
              ))}
            </Reorder.Group>
            <div className="mt-3 flex flex-col gap-2 border-t border-border pt-4 sm:flex-row"><Input aria-label="New section title" value={newTitle} onChange={(event) => setNewTitle(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") addSection(); }} placeholder="New section title" /><Button variant="secondary" disabled={!newTitle.trim()} onClick={addSection}><Plus />Add section</Button></div>
          </CardContent>
        </Card>

        <aside className="space-y-4">
          <Card><CardContent className="p-4"><div className="flex items-center justify-between"><div className="text-sm font-semibold">Brief status</div><Badge variant={reviewed ? "green" : "amber"}>{reviewed ? "Reviewed" : "Needs review"}</Badge></div><div className="mt-3 space-y-2 text-xs text-muted-foreground"><div className="flex justify-between"><span>Sections</span><span className="font-medium text-foreground">{blocks.length}</span></div><div className="flex justify-between"><span>Last updated</span><span className="font-medium text-foreground">Just now</span></div><div className="flex justify-between"><span>Research sync</span><Badge variant="green"><Check className="size-3" />Current</Badge></div></div>{blocks.length === 0 ? <><Button className="mt-4 w-full" disabled>Add a section to continue</Button><p className="mt-2 text-center text-[11px] text-muted-foreground">An empty brief cannot be marked reviewed.</p></> : reviewed ? <Button variant="secondary" className="mt-4 w-full" onClick={onReturnToOverview}>Return to readiness</Button> : <Button className="mt-4 w-full" onClick={onReviewed}><Check />Finish review</Button>}</CardContent></Card>
          <Card><CardContent className="p-4"><div className="flex items-center gap-2 text-sm font-semibold"><NotepadText className="size-4" />Private notes</div><Textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Add a reminder for yourself…" className="mt-3 min-h-[110px] bg-[#fafaf9]" /><Button variant="ghost" size="sm" className="mt-2 w-full" disabled={!note.trim()} onClick={() => notify("Private note saved")}>Save note</Button></CardContent></Card>
          <div className="grid grid-cols-2 gap-2"><Button variant="secondary" size="sm" onClick={() => notify("Brief copied to clipboard")}><Clipboard />Copy</Button><Button variant="secondary" size="sm" onClick={() => notify("PDF export prepared")}><Download />Export</Button></div>
        </aside>
      </div>
    </div>
  );
}
