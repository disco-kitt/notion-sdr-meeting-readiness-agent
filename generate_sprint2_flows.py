#!/usr/bin/env python3
"""Generate Sprint 2 UX flow diagrams as Mermaid and editable draw.io XML."""

from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
import html
import re
import textwrap
import xml.etree.ElementTree as ET


OUT = Path("sprint-2-user-flows")

LANES = [
    ("sdr", "SDR", "#F7F7F5", "#D3D1CB"),
    ("system", "System", "#EEF4FF", "#9DBCFB"),
    ("ai", "AI / Orchestration", "#F4EEFF", "#BEA7E5"),
    ("external", "External Data", "#FFF4E5", "#E7B86E"),
]


@dataclass(frozen=True)
class Node:
    id: str
    label: str
    lane: str
    col: float
    row: int = 0
    kind: str = "action"
    width: int = 158
    subtitle: str = ""


@dataclass(frozen=True)
class Edge:
    source: str
    target: str
    label: str = ""
    dashed: bool = False


@dataclass(frozen=True)
class Diagram:
    slug: str
    title: str
    subtitle: str
    nodes: tuple[Node, ...]
    edges: tuple[Edge, ...]
    mermaid: str


MERMAID_STYLES = """
    classDef action fill:#FFFFFF,stroke:#2F3437,stroke-width:1.5px,color:#2F3437;
    classDef decision fill:#FFF3BF,stroke:#B7791F,stroke-width:1.5px,color:#5F3B00;
    classDef status fill:#EAF7EE,stroke:#3B8C5A,stroke-width:1.5px,color:#205C38;
    classDef external fill:#FFF8EE,stroke:#C8872E,stroke-width:1.5px,color:#62420F;
    classDef secondary fill:#F3F4F6,stroke:#8A9099,stroke-width:1.25px,color:#40454C;
"""


DIAGRAMS = [
    Diagram(
        slug="01-master-journey-map",
        title="Master Journey Map",
        subtitle="From calendar signal to CRM follow-through",
        nodes=(
            Node("calendar", "Calendar", "external", 0, kind="external"),
            Node("detected", "Meeting Detected", "system", 1),
            Node("research", "Research Initiated", "ai", 2),
            Node("overview", "Overview", "sdr", 3),
            Node("signals", "Signals", "sdr", 4),
            Node("stakeholders", "Stakeholders", "sdr", 5),
            Node("questions", "Discovery Questions", "sdr", 6),
            Node("recommendations", "Recommendations", "sdr", 7),
            Node("brief", "Meeting Brief", "sdr", 8),
            Node("meeting", "Meeting", "external", 9, kind="external"),
            Node("reflection", "Post-Meeting Reflection", "sdr", 10, width=176),
            Node("crm", "CRM Update", "external", 11, kind="status"),
        ),
        edges=tuple(
            Edge(a, b)
            for a, b in zip(
                ["calendar", "detected", "research", "overview", "signals", "stakeholders", "questions", "recommendations", "brief", "meeting", "reflection"],
                ["detected", "research", "overview", "signals", "stakeholders", "questions", "recommendations", "brief", "meeting", "reflection", "crm"],
            )
        ),
        mermaid="""
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
        """,
    ),
    Diagram(
        slug="02-flow-1-prepare-discovery-call",
        title="Flow 1: Prepare for a Discovery Call",
        subtitle="Turn a booked meeting into a ready-to-run discovery plan",
        nodes=(
            Node("meeting", "Meeting Appears", "external", 0, kind="external"),
            Node("identify", "Identify Company & Attendees", "system", 1, width=178, subtitle="Match CRM record"),
            Node("research", "Start Research", "ai", 2),
            Node("workspace", "Open Workspace", "sdr", 3),
            Node("overview", "Review Overview", "sdr", 4),
            Node("signals", "Review Signals", "sdr", 5),
            Node("stakeholders", "Review Stakeholders", "sdr", 6, width=172),
            Node("questions", "Select Questions", "sdr", 7),
            Node("recommendations", "Review Recommendations", "sdr", 8, width=178),
            Node("brief", "Generate Brief", "ai", 9),
            Node("notes", "Add Notes", "sdr", 10),
            Node("share_decision", "Share with AE?", "sdr", 11, kind="decision", width=124),
            Node("share", "Share with AE", "system", 12, row=0),
            Node("draft", "Keep Draft", "system", 12, row=1, kind="secondary"),
            Node("ready", "Meeting Ready", "system", 13, kind="status"),
        ),
        edges=(
            Edge("meeting", "identify"), Edge("identify", "research"), Edge("research", "workspace"),
            Edge("workspace", "overview"), Edge("overview", "signals"), Edge("signals", "stakeholders"),
            Edge("stakeholders", "questions"), Edge("questions", "recommendations"), Edge("recommendations", "brief"),
            Edge("brief", "notes"), Edge("notes", "share_decision"), Edge("share_decision", "share", "Yes"),
            Edge("share_decision", "draft", "No"), Edge("share", "ready"), Edge("draft", "ready"),
        ),
        mermaid="""
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
        """,
    ),
    Diagram(
        slug="03-flow-2-research-still-running",
        title="Flow 2: Research Still Running",
        subtitle="Keep the SDR productive while enrichment continues",
        nodes=(
            Node("detected", "Meeting Detected", "system", 0),
            Node("research", "Research Begins", "ai", 1),
            Node("workspace", "Open Partial Workspace", "sdr", 2, width=176),
            Node("states", "Show Card States", "system", 3, width=172, subtitle="Loading • Complete • Updating"),
            Node("populate", "Populate Results Live", "ai", 4, width=172),
            Node("impact", "High-Impact Insight?", "ai", 5, kind="decision", width=138),
            Node("refresh", "Refresh Brief", "ai", 6, row=0),
            Node("continue", "Continue Research", "ai", 6, row=1, kind="secondary"),
            Node("complete", "Research Complete", "ai", 7, kind="status"),
            Node("ready", "Workspace Ready", "system", 8, kind="status"),
        ),
        edges=(
            Edge("detected", "research"), Edge("research", "workspace"), Edge("workspace", "states"),
            Edge("states", "populate"), Edge("populate", "impact"), Edge("impact", "refresh", "Yes"),
            Edge("impact", "continue", "No"), Edge("refresh", "complete"), Edge("continue", "complete"),
            Edge("complete", "ready"),
        ),
        mermaid="""
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
        """,
    ),
    Diagram(
        slug="04-flow-7-build-share-meeting-brief",
        title="Flow 7: Build and Share Meeting Brief",
        subtitle="Create, tailor, and route an actionable brief",
        nodes=(
            Node("generate", "Generate Brief", "sdr", 0),
            Node("assemble", "Assemble Draft", "ai", 1),
            Node("edit", "Edit Brief", "sdr", 2, width=172, subtitle="Reorder • Remove • Add notes"),
            Node("choice", "Delivery Choice", "sdr", 3, kind="decision", width=128),
            Node("notion", "Copy into Notion", "external", 4, row=0, kind="external"),
            Node("share", "Share with AE", "external", 4, row=1, kind="external"),
            Node("export", "Export", "external", 4, row=2, kind="external"),
            Node("draft", "Keep Draft", "system", 4, row=3, kind="secondary"),
            Node("notify", "Notify AE", "system", 5, row=1),
            Node("shared_status", "Brief Shared", "system", 6, row=1, kind="status"),
            Node("draft_status", "Brief Draft", "system", 6, row=3, kind="secondary"),
            Node("ready", "Meeting Ready", "system", 7, row=2, kind="status"),
        ),
        edges=(
            Edge("generate", "assemble"), Edge("assemble", "edit"), Edge("edit", "choice"),
            Edge("choice", "notion", "Copy"), Edge("choice", "share", "Share"),
            Edge("choice", "export", "Export"), Edge("choice", "draft", "Draft"),
            Edge("notion", "shared_status"), Edge("share", "notify"), Edge("notify", "shared_status"),
            Edge("export", "shared_status"), Edge("draft", "draft_status"),
            Edge("shared_status", "ready"), Edge("draft_status", "ready"),
        ),
        mermaid="""
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
        """,
    ),
    Diagram(
        slug="05-flow-8-post-meeting-reflection",
        title="Flow 8: Post-Meeting Reflection",
        subtitle="Capture learning, control CRM changes, improve future guidance",
        nodes=(
            Node("meeting_end", "Meeting Ends", "external", 0, kind="external"),
            Node("prompt", "Reflection Prompt", "system", 1),
            Node("record", "Record Reflection", "sdr", 2, width=176, subtitle="Priorities • Objections • Next steps"),
            Node("label", "Label Assumptions", "sdr", 3, width=176, subtitle="Correct • Incorrect • Unknown"),
            Node("crm_draft", "Draft CRM Updates", "ai", 4, width=170),
            Node("review", "Review CRM Draft", "sdr", 5, kind="decision", width=136),
            Node("approve", "Approve", "sdr", 6, row=0),
            Node("edit", "Edit", "sdr", 6, row=1),
            Node("discard", "Discard", "sdr", 6, row=2, kind="secondary"),
            Node("apply", "Apply CRM Updates", "external", 7, row=0, kind="external"),
            Node("revise", "Revise CRM Draft", "ai", 7, row=1),
            Node("discarded", "Discard CRM Draft", "system", 7, row=2, kind="secondary"),
            Node("refine", "Refine Future Recommendations", "ai", 8, row=1, kind="status", width=194),
        ),
        edges=(
            Edge("meeting_end", "prompt"), Edge("prompt", "record"), Edge("record", "label"),
            Edge("label", "crm_draft"), Edge("crm_draft", "review"), Edge("review", "approve", "Approve"),
            Edge("review", "edit", "Edit"), Edge("review", "discard", "Discard"), Edge("approve", "apply"),
            Edge("edit", "revise"), Edge("revise", "review", "Review again"), Edge("discard", "discarded"),
            Edge("apply", "refine"), Edge("discarded", "refine"),
        ),
        mermaid="""
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
        """,
    ),
]


def clean_mermaid(source: str) -> str:
    return textwrap.dedent(source).strip() + "\n" + textwrap.dedent(MERMAID_STYLES).strip() + "\n"


def node_style(kind: str) -> str:
    base = "html=1;whiteSpace=wrap;align=center;verticalAlign=middle;fontSize=14;fontFamily=Helvetica;spacing=8;"
    styles = {
        "action": "rounded=1;arcSize=16;fillColor=#FFFFFF;strokeColor=#2F3437;strokeWidth=1.5;fontColor=#2F3437;shadow=0;",
        "decision": "rhombus;perimeter=rhombusPerimeter;fillColor=#FFF3BF;strokeColor=#B7791F;strokeWidth=1.5;fontColor=#5F3B00;fontStyle=1;",
        "status": "rounded=1;arcSize=18;fillColor=#EAF7EE;strokeColor=#3B8C5A;strokeWidth=1.5;fontColor=#205C38;fontStyle=1;",
        "external": "rounded=1;arcSize=16;fillColor=#FFF8EE;strokeColor=#C8872E;strokeWidth=1.5;fontColor=#62420F;",
        "secondary": "rounded=1;arcSize=16;fillColor=#F3F4F6;strokeColor=#8A9099;strokeWidth=1.25;fontColor=#40454C;",
    }
    return base + styles[kind]


def label_html(node: Node) -> str:
    title = html.escape(node.label)
    if not node.subtitle:
        return title
    subtitle = html.escape(node.subtitle)
    return f"<b>{title}</b><br><font style=\"font-size:11px;color:#6B7280\">{subtitle}</font>"


def slug_id(value: str) -> str:
    return re.sub(r"[^a-zA-Z0-9_-]", "-", value)


def build_drawio(diagram: Diagram) -> ET.ElementTree:
    max_col = max(node.col for node in diagram.nodes)
    max_row = max(node.row for node in diagram.nodes)
    lane_height = max(132, 72 + (max_row + 1) * 68)
    width = int(250 + max_col * 190 + 190)
    height = 100 + lane_height * len(LANES) + 30
    modified = datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")

    mxfile = ET.Element("mxfile", {
        "host": "app.diagrams.net",
        "modified": modified,
        "agent": "Codex",
        "version": "24.7.17",
        "type": "device",
    })
    page = ET.SubElement(mxfile, "diagram", {"id": slug_id(diagram.slug), "name": diagram.title})
    model = ET.SubElement(page, "mxGraphModel", {
        "dx": "1600", "dy": "900", "grid": "1", "gridSize": "10", "guides": "1",
        "tooltips": "1", "connect": "1", "arrows": "1", "fold": "1", "page": "1",
        "pageScale": "1", "pageWidth": str(max(1169, width + 40)), "pageHeight": str(max(827, height + 40)),
        "math": "0", "shadow": "0",
    })
    root = ET.SubElement(model, "root")
    ET.SubElement(root, "mxCell", {"id": "0"})
    ET.SubElement(root, "mxCell", {"id": "1", "parent": "0"})

    title = ET.SubElement(root, "mxCell", {
        "id": "title", "value": html.escape(diagram.title),
        "style": "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=24;fontStyle=1;fontColor=#2F3437;fontFamily=Helvetica;",
        "vertex": "1", "parent": "1",
    })
    ET.SubElement(title, "mxGeometry", {"x": "20", "y": "14", "width": str(width - 40), "height": "34", "as": "geometry"})
    subtitle = ET.SubElement(root, "mxCell", {
        "id": "subtitle", "value": html.escape(diagram.subtitle),
        "style": "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=13;fontColor=#6B7280;fontFamily=Helvetica;",
        "vertex": "1", "parent": "1",
    })
    ET.SubElement(subtitle, "mxGeometry", {"x": "20", "y": "48", "width": str(width - 40), "height": "24", "as": "geometry"})

    lane_ids: dict[str, str] = {}
    for index, (key, name, fill, stroke) in enumerate(LANES):
        lane_id = f"lane-{key}"
        lane_ids[key] = lane_id
        lane = ET.SubElement(root, "mxCell", {
            "id": lane_id, "value": name,
            "style": f"swimlane;horizontal=0;startSize=46;fillColor={fill};swimlaneFillColor=#FFFFFF;strokeColor={stroke};fontStyle=1;fontSize=14;fontColor=#2F3437;rounded=1;arcSize=6;collapsible=0;html=1;whiteSpace=wrap;fontFamily=Helvetica;",
            "vertex": "1", "parent": "1",
        })
        ET.SubElement(lane, "mxGeometry", {
            "x": "20", "y": str(84 + index * lane_height), "width": str(width), "height": str(lane_height), "as": "geometry",
        })

    for node in diagram.nodes:
        height_value = 84 if node.kind == "decision" else (66 if node.subtitle else 54)
        cell = ET.SubElement(root, "mxCell", {
            "id": node.id, "value": label_html(node), "style": node_style(node.kind),
            "vertex": "1", "parent": lane_ids[node.lane],
        })
        ET.SubElement(cell, "mxGeometry", {
            "x": str(int(70 + node.col * 190)), "y": str(38 + node.row * 68),
            "width": str(node.width), "height": str(height_value), "as": "geometry",
        })

    for index, edge in enumerate(diagram.edges, start=1):
        style = "edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=#68707A;strokeWidth=1.75;fontSize=12;fontStyle=1;fontColor=#4B5563;labelBackgroundColor=#FFFFFF;"
        if edge.dashed:
            style += "dashed=1;dashPattern=5 4;"
        cell = ET.SubElement(root, "mxCell", {
            "id": f"edge-{index}", "value": edge.label, "style": style,
            "edge": "1", "parent": "1", "source": edge.source, "target": edge.target,
        })
        ET.SubElement(cell, "mxGeometry", {"relative": "1", "as": "geometry"})

    return ET.ElementTree(mxfile)


def indent(tree: ET.ElementTree) -> None:
    ET.indent(tree, space="  ")


def write_outputs() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    combined = [
        "# Sprint 2 User Flows — Mermaid Source",
        "",
        "Each block can be pasted into draw.io via **Arrange → Insert → Advanced → Mermaid**.",
        "",
    ]

    for diagram in DIAGRAMS:
        mermaid = clean_mermaid(diagram.mermaid)
        (OUT / f"{diagram.slug}.mmd").write_text(mermaid, encoding="utf-8")

        tree = build_drawio(diagram)
        indent(tree)
        tree.write(OUT / f"{diagram.slug}.drawio", encoding="utf-8", xml_declaration=True)

        combined.extend([
            f"## {diagram.title}",
            "",
            "```mermaid",
            mermaid.rstrip(),
            "```",
            "",
        ])

    (OUT / "Sprint2-User-Flows-Mermaid.md").write_text("\n".join(combined), encoding="utf-8")

    rows = [
        "# Sprint 2 User Flow Diagrams",
        "",
        "Editable diagram sources for the SDR Meeting Preparation Agent.",
        "",
        "| Diagram | Mermaid | draw.io XML |",
        "|---|---|---|",
    ]
    for diagram in DIAGRAMS:
        rows.append(f"| {diagram.title} | [{diagram.slug}.mmd]({diagram.slug}.mmd) | [{diagram.slug}.drawio]({diagram.slug}.drawio) |")
    rows.extend([
        "",
        "## Import",
        "",
        "- Open a `.drawio` file directly in draw.io/diagrams.net for fully editable shapes, connectors, and swimlanes.",
        "- For Mermaid, paste a `.mmd` file into **Arrange → Insert → Advanced → Mermaid**.",
        "- The `.drawio` files use uncompressed mxGraph XML, so they can also be versioned and reviewed as text.",
        "",
        "## Visual system",
        "",
        "- Rounded rectangles: actions",
        "- Amber diamonds: decisions",
        "- Green rounded rectangles: ready/completed states",
        "- Gray rounded rectangles: draft/secondary outcomes",
        "- Swimlanes: SDR, System, AI / Orchestration, External Data",
        "",
    ])
    (OUT / "README.md").write_text("\n".join(rows), encoding="utf-8")


if __name__ == "__main__":
    write_outputs()
