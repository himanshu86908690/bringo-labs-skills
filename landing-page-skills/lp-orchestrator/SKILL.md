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

Use the [source routing map](references/source-routing.md) when a specialist needs deeper guidance.

## Landing page design principles

Apply the relevant principles and record decisions in the project brief.

### 1. Mirror Test — copy and messaging

- Write the first screen around **Person, Pain, Promise**. Name the intended visitor, reflect the problem that brought them here, and give them a credible reason to act. Make the offer, benefit, and one primary next step clear.
- Use actual customer language from sales notes, interviews, search terms, or campaign copy. Match the headline to the visitor’s entry message and intent. Translate features into outcomes and support consequential claims with evidence. Label inferred buyer language as a working assumption.
- Read the mobile first screen at a representative width. When target visitors are available, ask them to explain who the page serves, what they get, and what they would do next without coaching. Use observed behavior and conversion data to guide revisions.

### 2. Highlighter Rule — color and hierarchy

- Specify exact brand color values and roles for the background, structure, text, and action. Use one accent to mark the primary CTA and a few details that genuinely help people navigate or decide.
- Use 60–30–10 as a composition guide for dominant background, supporting structure, and accent. Adjust to fit the brand and keep text, controls, and focus states readable. Check that the CTA is easy to pick out in the first viewport.

### 3. Front–Middle–Back — depth and composition

- Give the hero a back layer for relevant imagery or a restrained graphic, a middle layer for the message and proof, and a front layer for the primary action. Use size, spacing, alignment, and contrast to establish those roles.
- Use overlap or soft shadow selectively when it helps separate layers. Vary section composition by its job. Check on narrow and wide screens that layers preserve reading order, legibility, and access to the CTA.
- For a layered hero or a scroll-led demonstration, consult [ScrollCraft](https://github.com/nateherkai/scroll-craft/blob/main/plugins/nateherk-design/skills/scroll-craft/SKILL.md) for typography, spacing, depth, and responsive scroll composition. Apply the guidance that serves the visitor’s task. The principles here work independently of the upstream skill.

### 4. Motion With a Job — animation

- Give each animation a specific purpose, such as demonstrating the product, explaining a transition, or drawing attention to an important change. Use at most one dominant animated element per viewport. Keep the headline, offer, and CTA available on first render.
- Use scroll effects only where they help explain something. Honor `prefers-reduced-motion` with a complete static state. Provide a pause or motion toggle when the experience warrants it. Test both motion settings and remove effects that interfere with reading, input, or navigation.

### 5. Free Sample — interactive value

- Start with one purchase question prospects actually ask. If a short quiz, estimator, or tool can answer it better than static copy, show a useful result immediately using the smallest set of inputs. Explain key assumptions for any estimate.
- Keep the primary conversion path accessible alongside the tool. Verify calculations, invalid input, empty states, keyboard access, and mobile behavior before release. Skip the tool when it adds effort without resolving a real decision.

### 6. AI execution — brief, build, verify

- Before generating layouts, specify the priority audience, pain, desired outcome, approved proof, exact CTA, palette, typography, spacing, visual priorities, and motion limits. Use real content. Review whether each major visual choice helps visitors understand the offer, trust the evidence, or take the next step.
- Before marking visual QA complete, inspect the rendered page on mobile and desktop. Check the first screen, CTA and proof placement, text wrapping, contrast, focus, and the complete action flow. Record the viewports and findings. When rendering or buyer validation is unavailable, mark the affected check as pending.
- Report lift only when comparable project data supports it. Treat results from other businesses as hypotheses.

## Keep decisions current

For a focused edit, run the relevant specialist and only the downstream checks the edit affects. An offer or CTA change can affect copy, design, submission behavior, and event definitions. A presentation-only edit typically needs visual and accessibility checks. Update the brief and reopen affected milestones using evidence.

Proceed autonomously with research, drafts, code, staging, and reversible tests within the authorized scope. Apply authorization already given for publication. Confirm an unresolved offer, permission to use material claims, or live launch only when the decision is necessary and still open. Do not treat a simulated integration, preview, or tool inspection as live verification. Do not contact client leads as part of a test. Use a designated test route or clearly marked test record.

At handoff, give the current status, artifact locations, evidence, material assumptions, and any remaining action with an owner.
