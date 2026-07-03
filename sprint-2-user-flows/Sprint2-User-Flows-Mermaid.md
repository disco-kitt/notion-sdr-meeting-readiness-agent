# Sprint 2 User Flows — Mermaid Source

Each block can be pasted into draw.io via **Arrange → Insert → Advanced → Mermaid**.

## Master Journey Map

```mermaid
flowchart LR
  subgraph SDR[SDR]
    direction LR
    overview([Overview]) --> signals([Signals]) --> stakeholders([Stakeholders]) --> questions([Discovery Questions]) --> recommendations([Recommendations]) --> brief([Meeting Brief])
    reflection([Post-Meeting Reflection])
  end
  subgraph SYS[System]
    direction LR
    detected([Meeting Detected])
  end
  subgraph AI[AI / Orchestration]
    direction LR
    research([Research Initiated])
  end
  subgraph EXT[External Data]
    direction LR
    calendar([Calendar])
    meeting([Meeting])
    crm([CRM Update])
  end
  calendar --> detected --> research --> overview
  brief --> meeting --> reflection --> crm
  class overview,signals,stakeholders,questions,recommendations,brief,reflection,detected,research action;
  class calendar,meeting external;
  class crm status;
classDef action fill:#FFFFFF,stroke:#2F3437,stroke-width:1.5px,color:#2F3437;
classDef decision fill:#FFF3BF,stroke:#B7791F,stroke-width:1.5px,color:#5F3B00;
classDef status fill:#EAF7EE,stroke:#3B8C5A,stroke-width:1.5px,color:#205C38;
classDef external fill:#FFF8EE,stroke:#C8872E,stroke-width:1.5px,color:#62420F;
classDef secondary fill:#F3F4F6,stroke:#8A9099,stroke-width:1.25px,color:#40454C;
```

## Flow 1: Prepare for a Discovery Call

```mermaid
flowchart LR
  subgraph SDR[SDR]
    direction LR
    workspace([Open Workspace]) --> overview([Review Overview]) --> signals([Review Signals]) --> stakeholders([Review Stakeholders]) --> questions([Select Questions]) --> recommendations([Review Recommendations])
    notes([Add Notes]) --> share_decision{Share with AE?}
  end
  subgraph SYS[System]
    direction LR
    identify([Identify Company & Attendees<br/>Match CRM record])
    share([Share with AE])
    draft([Keep Draft])
    ready([Meeting Ready])
  end
  subgraph AI[AI / Orchestration]
    direction LR
    research([Start Research])
    brief([Generate Brief])
  end
  subgraph EXT[External Data]
    direction LR
    meeting([Meeting Appears])
  end
  meeting --> identify --> research --> workspace
  recommendations --> brief --> notes
  share_decision -- Yes --> share --> ready
  share_decision -- No --> draft --> ready
  class workspace,overview,signals,stakeholders,questions,recommendations,notes,identify,share,research,brief action;
  class share_decision decision;
  class meeting external;
  class draft secondary;
  class ready status;
classDef action fill:#FFFFFF,stroke:#2F3437,stroke-width:1.5px,color:#2F3437;
classDef decision fill:#FFF3BF,stroke:#B7791F,stroke-width:1.5px,color:#5F3B00;
classDef status fill:#EAF7EE,stroke:#3B8C5A,stroke-width:1.5px,color:#205C38;
classDef external fill:#FFF8EE,stroke:#C8872E,stroke-width:1.5px,color:#62420F;
classDef secondary fill:#F3F4F6,stroke:#8A9099,stroke-width:1.25px,color:#40454C;
```

## Flow 2: Research Still Running

```mermaid
flowchart LR
  subgraph SDR[SDR]
    direction LR
    workspace([Open Partial Workspace])
  end
  subgraph SYS[System]
    direction LR
    detected([Meeting Detected])
    states([Show Card States<br/>Loading • Complete • Updating])
    ready([Workspace Ready])
  end
  subgraph AI[AI / Orchestration]
    direction LR
    research([Research Begins])
    populate([Populate Results Live]) --> impact{High-Impact Insight?}
    refresh([Refresh Brief])
    continue([Continue Research])
    complete([Research Complete])
  end
  detected --> research --> workspace --> states --> populate
  impact -- Yes --> refresh --> complete
  impact -- No --> continue --> complete
  complete --> ready
  class workspace,detected,states,research,populate,refresh action;
  class impact decision;
  class continue secondary;
  class complete,ready status;
classDef action fill:#FFFFFF,stroke:#2F3437,stroke-width:1.5px,color:#2F3437;
classDef decision fill:#FFF3BF,stroke:#B7791F,stroke-width:1.5px,color:#5F3B00;
classDef status fill:#EAF7EE,stroke:#3B8C5A,stroke-width:1.5px,color:#205C38;
classDef external fill:#FFF8EE,stroke:#C8872E,stroke-width:1.5px,color:#62420F;
classDef secondary fill:#F3F4F6,stroke:#8A9099,stroke-width:1.25px,color:#40454C;
```

## Flow 7: Build and Share Meeting Brief

```mermaid
flowchart LR
  subgraph SDR[SDR]
    direction LR
    generate([Generate Brief])
    edit([Edit Brief<br/>Reorder • Remove • Add notes]) --> choice{Delivery Choice}
  end
  subgraph SYS[System]
    direction LR
    draft([Keep Draft])
    notify([Notify AE])
    shared_status([Brief Shared])
    draft_status([Brief Draft])
    ready([Meeting Ready])
  end
  subgraph AI[AI / Orchestration]
    direction LR
    assemble([Assemble Draft])
  end
  subgraph EXT[External Data]
    direction LR
    notion([Copy into Notion])
    share([Share with AE])
    export([Export])
  end
  generate --> assemble --> edit
  choice -- Copy --> notion --> shared_status
  choice -- Share --> share --> notify --> shared_status
  choice -- Export --> export --> shared_status
  choice -- Draft --> draft --> draft_status
  shared_status --> ready
  draft_status --> ready
  class generate,edit,notify,assemble action;
  class choice decision;
  class notion,share,export external;
  class draft,draft_status secondary;
  class shared_status,ready status;
classDef action fill:#FFFFFF,stroke:#2F3437,stroke-width:1.5px,color:#2F3437;
classDef decision fill:#FFF3BF,stroke:#B7791F,stroke-width:1.5px,color:#5F3B00;
classDef status fill:#EAF7EE,stroke:#3B8C5A,stroke-width:1.5px,color:#205C38;
classDef external fill:#FFF8EE,stroke:#C8872E,stroke-width:1.5px,color:#62420F;
classDef secondary fill:#F3F4F6,stroke:#8A9099,stroke-width:1.25px,color:#40454C;
```

## Flow 8: Post-Meeting Reflection

```mermaid
flowchart LR
  subgraph SDR[SDR]
    direction LR
    record([Record Reflection<br/>Priorities • Objections • Next steps]) --> label([Label Assumptions<br/>Correct • Incorrect • Unknown])
    review{Review CRM Draft}
    approve([Approve])
    edit([Edit])
    discard([Discard])
  end
  subgraph SYS[System]
    direction LR
    prompt([Reflection Prompt])
    discarded([Discard CRM Draft])
  end
  subgraph AI[AI / Orchestration]
    direction LR
    crm_draft([Draft CRM Updates])
    revise([Revise CRM Draft])
    refine([Refine Future Recommendations])
  end
  subgraph EXT[External Data]
    direction LR
    meeting_end([Meeting Ends])
    apply([Apply CRM Updates])
  end
  meeting_end --> prompt --> record
  label --> crm_draft --> review
  review -- Approve --> approve --> apply --> refine
  review -- Edit --> edit --> revise -->|Review again| review
  review -- Discard --> discard --> discarded --> refine
  class record,label,approve,edit,prompt,crm_draft,revise action;
  class review decision;
  class meeting_end,apply external;
  class discard,discarded secondary;
  class refine status;
classDef action fill:#FFFFFF,stroke:#2F3437,stroke-width:1.5px,color:#2F3437;
classDef decision fill:#FFF3BF,stroke:#B7791F,stroke-width:1.5px,color:#5F3B00;
classDef status fill:#EAF7EE,stroke:#3B8C5A,stroke-width:1.5px,color:#205C38;
classDef external fill:#FFF8EE,stroke:#C8872E,stroke-width:1.5px,color:#62420F;
classDef secondary fill:#F3F4F6,stroke:#8A9099,stroke-width:1.25px,color:#40454C;
```
