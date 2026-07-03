"use client";

import * as React from "react";
import { Check, Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function EditableText({ value, onChange, label, className = "" }: { value: string; onChange: (value: string) => void; label: string; className?: string }) {
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState(value);

  React.useEffect(() => setDraft(value), [value]);

  if (editing) {
    return (
      <div className="space-y-2">
        <Textarea aria-label={label} value={draft} onChange={(event) => setDraft(event.target.value)} autoFocus className="min-h-[116px]" />
        <div className="flex items-center gap-1.5">
          <Button
            size="sm"
            onClick={() => {
              onChange(draft.trim() || value);
              setEditing(false);
            }}
          >
            <Check />Save <span className="sr-only">{label}</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={() => { setDraft(value); setEditing(false); }}><X />Cancel <span className="sr-only">editing {label}</span></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative">
      <p className={`whitespace-pre-line text-sm leading-6 text-[#4f4d47] ${className}`}>{value}</p>
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-2 -top-2 size-8 border border-border bg-white/95 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100"
        onClick={() => setEditing(true)}
        aria-label={`Edit ${label}`}
      >
        <Pencil className="size-3.5" />
      </Button>
    </div>
  );
}
