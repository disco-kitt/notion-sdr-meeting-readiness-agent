# Sprint 2 User Flows — Mermaid Source

These diagrams document the release-candidate prototype. Research, sharing, export, and CRM actions are simulated with sample data unless stated otherwise.

Meeting readiness has five conditions: research reaches 100%, priority signals are reviewed, stakeholders are confirmed, at least three discovery questions are selected, and a generated non-empty brief is reviewed. The user may work across tabs in any order; after all five conditions are complete, they separately confirm **Mark meeting ready**. Copy, share-preview, export, and reflection CRM actions do not make a meeting ready.

Post-meeting reflection is implemented as a separate Lumon sample debrief. It does not write to Salesforce or persist beyond the current prototype session.

Each block can be pasted into draw.io via **Arrange → Insert → Advanced → Mermaid**.

## Master Journey Map

```mermaid
flowchart LR
  subgraph SDR[SDR]
    direction LR
    workspace([Workspace Opens]) --> tasks([Complete Readiness Work<br/>Flexible order across tabs]) --> brief_review([Review Meeting Brief])
    continue([Continue Preparation])
    confirm([Mark Meeting Ready])
  end
  subgraph SYS[Prototype System]
    direction LR
    detected([Meeting Detected<br/>Prototype scenario])
    all_ready{All 5 Conditions Complete?}
    ready([Meeting Ready])
  end
  subgraph AI[Demonstration Automation]
    direction LR
    research([Simulated Research Begins<br/>Sample data • Timed progress])
  end
  detected --> research --> workspace
  brief_review --> all_ready
  all_ready -- No --> continue -->|Choose any incomplete task| tasks
  all_ready -- Yes --> confirm --> ready
  class workspace,tasks,brief_review,continue,confirm,detected,research action;
  class all_ready decision;
  class ready status;
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
    workspace([Open Meeting Workspace])
    choose{Choose Any Incomplete Task}
    signals([Review Priority Signals])
    stakeholders([Confirm Stakeholders])
    questions([Select at Least 3 Questions])
    brief([Generate and Review Brief<br/>Must contain a section])
    mark_ready([Mark Meeting Ready])
  end
  subgraph SYS[Prototype System]
    direction LR
    meeting([Sample Meeting Available<br/>Simulates meeting detection])
    panel([Readiness Panel<br/>Shows progress and next step])
    readiness{All 5 Conditions Complete?}
    draft([Remain in Preparation])
    ready([Meeting Ready])
  end
  subgraph AI[Demonstration Automation]
    direction LR
    research([Simulated Research Starts])
    research_complete([Research Reaches 100%])
  end
  meeting --> research --> workspace --> panel --> choose
  research -->|Runs in background| research_complete
  choose -- Signals --> signals --> readiness
  choose -- People --> stakeholders --> readiness
  choose -- Questions --> questions --> readiness
  choose -- Brief --> brief --> readiness
  research_complete --> readiness
  readiness -- No --> draft -->|Continue in any order| choose
  readiness -- Yes --> mark_ready --> ready
  class workspace,signals,stakeholders,questions,brief,mark_ready,meeting,panel,research action;
  class choose,readiness decision;
  class draft secondary;
  class research_complete,ready status;
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
    start([Open Workspace at 46%])
    partial([Use Available Tabs<br/>Review revealed sample data])
    draft([Generate Partial Draft<br/>Optional])
    prep([Continue Readiness Tasks])
  end
  subgraph SYS[Prototype System]
    direction LR
    banner([Show Research Banner<br/>Progress • Sample activity])
    impact{Progress Reaches 78%?}
    toast([Show High-Impact Toast<br/>Recommendations updated])
    complete{Progress Reaches 100%?}
    ready([Research Gate Complete])
    restart([Restart Demo to 46%])
  end
  subgraph AI[Demonstration Automation]
    direction LR
    advance([Advance Timed Progress<br/>No live integrations])
    continue([Continue Timed Progress])
    auto([Create Brief Draft<br/>If not already generated])
  end
  start --> banner --> partial --> advance --> impact
  partial -. Optional .-> draft
  impact -- Yes --> toast --> complete
  impact -- No --> complete
  complete -- No --> continue --> advance
  complete -- Yes --> auto --> ready --> prep
  ready -. Demo control .-> restart --> banner
  class start,partial,prep,banner,toast,advance,auto action;
  class impact,complete decision;
  class draft,continue,restart secondary;
  class ready status;
classDef action fill:#FFFFFF,stroke:#2F3437,stroke-width:1.5px,color:#2F3437;
classDef decision fill:#FFF3BF,stroke:#B7791F,stroke-width:1.5px,color:#5F3B00;
classDef status fill:#EAF7EE,stroke:#3B8C5A,stroke-width:1.5px,color:#205C38;
classDef external fill:#FFF8EE,stroke:#C8872E,stroke-width:1.5px,color:#62420F;
classDef secondary fill:#F3F4F6,stroke:#8A9099,stroke-width:1.25px,color:#40454C;
```

## Flow 7: Build and Review a Meeting Brief

```mermaid
flowchart LR
  subgraph SDR[SDR]
    direction LR
    open([Open Meeting Brief])
    source{Choose Starting Point}
    blank([Start Blank Brief])
    edit([Edit Brief<br/>Edit • Reorder • Remove • Add])
    add([Add a Section])
    review([Complete Brief Review])
    more([Complete Remaining Tasks])
    confirm([Confirm Meeting Readiness])
    mark([Mark Meeting Ready])
  end
  subgraph SYS[Prototype System]
    direction LR
    sections{At Least 1 Section?}
    readiness{All 5 Conditions Complete?}
    demo([Optional Demo Actions<br/>Copy • Share preview • Export])
    noeffect([No Effect on Readiness<br/>No external send or export])
    ready([Meeting Ready])
  end
  subgraph AI[Demonstration Automation]
    direction LR
    generated([Generate Draft<br/>Full or partial])
    auto([Open Auto-created Draft<br/>At 100% research])
  end
  open --> source
  source -- Generate --> generated --> edit
  source -- Research complete --> auto --> edit
  source -- Blank --> blank --> edit
  edit --> sections
  sections -- No --> add --> edit
  sections -- Yes --> review --> readiness
  readiness -- No --> more -->|Recheck| readiness
  readiness -- Yes --> confirm --> mark --> ready
  edit -. Optional .-> demo -.-> noeffect
  class open,blank,edit,add,review,more,confirm,mark,generated,auto action;
  class source,sections,readiness decision;
  class demo,noeffect secondary;
  class ready status;
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
    open([Open Lumon Debrief<br/>Sidebar or More actions])
    record([Review or Edit Reflection<br/>Priorities • Risks • Next steps])
    label([Label 3 Assumptions<br/>Correct • Incorrect • Unknown])
    crm([Review CRM Draft<br/>Session-only sample data])
    resolve{Resolve CRM Draft}
    edit([Edit Fields and Finish])
    approve([Approve Demo Draft])
    discard([Discard Draft])
    complete([Complete Reflection])
  end
  subgraph SYS[Prototype System]
    direction LR
    all{All 3 Labeled?}
    discarded([Draft Discarded<br/>May restore before completion])
    resolved{CRM Draft Resolved?}
    done([Reflection Complete<br/>Fields lock • Nav badge updates])
  end
  subgraph AI[Demonstration Automation]
    direction LR
    feedback([Show Learning Feedback<br/>No external system changed])
  end
  open --> record --> label --> all
  all -- No --> label
  all -- Yes --> crm --> resolve
  resolve -- Edit --> edit -->|Done| crm
  resolve -- Approve --> approve --> feedback --> resolved
  resolve -- Discard --> discard --> discarded
  discarded -. Restore .-> crm
  discarded -->|Keep discarded| resolved
  resolved -- No --> crm
  resolved -- Yes --> complete --> done
  class open,record,label,crm,edit,approve,complete,feedback action;
  class all,resolve,resolved decision;
  class discard,discarded secondary;
  class done status;
classDef action fill:#FFFFFF,stroke:#2F3437,stroke-width:1.5px,color:#2F3437;
classDef decision fill:#FFF3BF,stroke:#B7791F,stroke-width:1.5px,color:#5F3B00;
classDef status fill:#EAF7EE,stroke:#3B8C5A,stroke-width:1.5px,color:#205C38;
classDef external fill:#FFF8EE,stroke:#C8872E,stroke-width:1.5px,color:#62420F;
classDef secondary fill:#F3F4F6,stroke:#8A9099,stroke-width:1.25px,color:#40454C;
```
