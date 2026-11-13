---
name: lp-orchestrator
description: "Run, resume, or launch a complete landing page project. Coordinate strategy, copy, design, development, tracking, and conversion review using one project brief. For a narrowly scoped request, route to the relevant specialist."
---

# Landing page orchestration

## Start or resume

1. Read the current project brief and supplied evidence first. Identify requested scope, environment, existing artifacts, and approvals already given. Resume at the first incomplete prerequisite within scope.
2. Build the brief using [project brief](references/project-brief.md). Distinguish confirmed facts, working assumptions, and open decisions. Ask together only for missing decisions that materially change the requested deliverable and cannot be safely inferred. Continue independent work.
3. Use the client’s existing tools and receiving system. For a new project without a stack, use a simple reversible staging implementation suited to the form or checkout. Record the choice and dependencies.
4. Use the named specialist if available. For a folder-based stack, read the matching sibling SKILL.md if accessible and follow it. If neither route is available, use the milestone below to carry out the scoped work and report the missing specialist. Skill routing is an instruction handoff. Use separate agents only when requested or when applicable instructions authorize them.

## Route by dependency

| Stage | Skill | Evidence to advance |
| --- | --- | --- |
| Strategy | lp-strategist | Priority audience, traffic message, offer, proof status, one primary action, and success definition are documented. |
| Measurement plan | lp-tracking | Event triggers, attribution, receiving system, outcome owner, and test steps are defined before implementation. |
| Copy | lp-content | Complete page copy and action flow trace back to the brief. Claims are supported or excluded from publishable copy. |
| Design | lp-designer | Mobile and desktop decisions cover hierarchy, proof, action flow, and form states. |
| Build | lp-developer | Staging works through the normal user entry point. Success, error, retry, and duplicate behavior are checked. |
| Verify | lp-tracking and lp-cro-auditor | Trace a test through the actual receiving system where available. Recheck offer, claims, terms, CTA, action path, notifications, accessibility, performance, privacy, and applicable redirects or indexing. Resolve release blockers. |
| Launch | lp-orchestrator with lp-developer | Confirm authorization and target, save rollback details, deploy, then repeat the journey on the live campaign URL before sending traffic. Hand over the URL, editable access, QA evidence, metric definitions, follow-up and content owners, and the first review date. |
| Learn | lp-cro-auditor | Establish a baseline for submissions and downstream outcomes where observed. Prioritize a measured improvement and set a review date. |

## Keep decisions current

For a focused edit, run the relevant specialist and only the downstream checks the edit affects. An offer or CTA change can affect copy, design, submission behavior, and event definitions. A presentation-only edit typically needs visual and accessibility checks. Update the brief and reopen affected milestones using evidence.

Proceed autonomously with research, drafts, code, staging, and reversible tests within the authorized scope. Apply authorization already given for publication. Confirm an unresolved offer, permission to use material claims, or live launch only when the decision is necessary and still open. Do not treat a simulated integration, preview, or tool inspection as live verification. Do not contact client leads as part of a test. Use a designated test route or clearly marked test record.

At handoff, give the current status, artifact locations, evidence, material assumptions, and any remaining action with an owner. Use the [source routing map](references/source-routing.md) to select upstream guidance when needed.
