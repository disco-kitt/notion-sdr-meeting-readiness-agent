"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Lightbulb, MessageCircleQuestion, Plus, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { discoveryQuestions } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function DiscoveryView({ selected, onSelectedChange, onContinue }: { selected: string[]; onSelectedChange: (ids: string[]) => void; onContinue: () => void }) {
  const [customQuestions, setCustomQuestions] = React.useState<{ id: string; category: string; text: string; reason: string }[]>([]);
  const [draft, setDraft] = React.useState("");
  const allQuestions = [...discoveryQuestions, ...customQuestions];

  const toggle = (id: string) => onSelectedChange(selected.includes(id) ? selected.filter((item) => item !== id) : [...selected, id]);

  return (
    <div className="workspace-view max-w-[1080px]">
      <div className="mb-6">
        <div><div className="flex flex-wrap items-center gap-2"><h2 className="workspace-heading">Discovery questions</h2><Badge variant={selected.length >= 3 ? "green" : "amber"}>{selected.length >= 3 ? `${selected.length} selected` : `${selected.length} of 3`}</Badge></div><p className="workspace-description">Choose at least three questions for a focused discovery plan.</p></div>
      </div>

      <div className="mb-5 flex items-start gap-3 rounded-xl border border-[#e5ddf3] bg-[#faf8fd] p-4">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#f0eafa] text-[#694e9e]"><Sparkles className="size-4" /></div>
        <div><div className="flex flex-wrap items-center gap-2"><div className="text-sm font-semibold">Recommended sequence</div><span className="text-[11px] text-muted-foreground">High confidence</span></div><p className="mt-1 text-sm leading-6 text-muted-foreground">Begin with the leadership change, explore current meeting-prep friction, then quantify the cost before discussing process or tooling.</p></div>
      </div>

      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {allQuestions.map((question, index) => {
            const isSelected = selected.includes(question.id);
            return (
              <motion.div key={question.id} layout initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }}>
                <Card className={cn("transition-all", isSelected ? "border-[#9fc5ea] bg-[#fbfdff] shadow-[0_0_0_1px_rgba(35,131,226,.08)]" : "hover:border-[#cbc9c3]") }>
                  <CardContent className="flex gap-3 p-4 sm:gap-4 sm:p-5">
                    <button onClick={() => toggle(question.id)} className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md hover:bg-muted" aria-label={`${isSelected ? "Remove" : "Select"} question: ${question.text}`} aria-pressed={isSelected}><span className={cn("flex size-5 items-center justify-center rounded border transition-colors", isSelected ? "border-[#2383E2] bg-[#2383E2] text-white" : "border-[#c9c7c1] bg-white")}>{isSelected && <Check className="size-3.5" />}</span></button>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2"><Badge variant="outline">{question.category}</Badge><span className="text-[11px] text-muted-foreground">Question {index + 1}</span></div>
                      <p className="mt-2 text-[15px] font-medium leading-6">{question.text}</p>
                      <div className="mt-3 flex items-start gap-1.5 text-xs leading-5 text-muted-foreground"><Lightbulb className="mt-0.5 size-3.5 shrink-0 text-[#a27a2e]" />{question.reason}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <Card className="mt-4 border-dashed shadow-none">
        <CardContent className="p-4">
          <div className="flex items-center gap-2"><MessageCircleQuestion className="size-4 text-muted-foreground" /><span className="text-sm font-medium">Add your own question</span></div>
          <div className="mt-3 flex gap-2">
            <Input aria-label="Add your own discovery question" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="What else do you want to learn?" onKeyDown={(event) => {
              if (event.key === "Enter" && draft.trim()) {
                const id = `custom-${Date.now()}`;
                setCustomQuestions((current) => [...current, { id, category: "Custom", text: draft.trim(), reason: "Added by you." }]);
                onSelectedChange([...selected, id]);
                setDraft("");
              }
            }} />
            <Button variant="secondary" disabled={!draft.trim()} onClick={() => {
              if (!draft.trim()) return;
              const id = `custom-${Date.now()}`;
              setCustomQuestions((current) => [...current, { id, category: "Custom", text: draft.trim(), reason: "Added by you." }]);
              onSelectedChange([...selected, id]);
              setDraft("");
            }}><Plus />Add</Button>
          </div>
        </CardContent>
      </Card>

      <div className="sticky bottom-3 z-20 mt-4 flex flex-col gap-3 rounded-xl border border-[#dfded9] bg-white/95 p-3 shadow-soft backdrop-blur sm:flex-row sm:items-center sm:justify-between" aria-live="polite">
        <div className="text-sm"><span className="font-medium">{selected.length >= 3 ? "Discovery plan ready" : `${3 - selected.length} more ${3 - selected.length === 1 ? "question" : "questions"} needed`}</span><span className="ml-1 text-muted-foreground">· {selected.length} selected</span></div>
        <Button size="sm" className="w-full sm:w-auto" disabled={selected.length < 3} onClick={onContinue}>Continue to brief <ArrowRight /></Button>
      </div>
    </div>
  );
}
