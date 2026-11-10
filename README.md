# Bringo Labs Skills

Reusable AI workflows for business strategy and execution.

## Skills

| Skill | Purpose | Entry point |
| --- | --- | --- |
| Brand Strategist | Research and diagnose brand challenges; develop positioning, messaging, identity direction, and implementation plans. | [brand-strategist/SKILL.md](brand-strategist/SKILL.md) |
| Project Manager | Existing project-management workflow. | [project-manager](project-manager/) |
| Website Strategist | Research, plan, write, design, build, audit, and optimize conversion-focused websites and landing pages. | [website-strategist/SKILL.md](website-strategist/SKILL.md) |

## Brand Strategist

The skill supports complete brand strategy, brand audits, positioning, messaging, identity direction, rebranding, naming, and brand architecture. It distinguishes evidence from assumptions and connects promises to actual delivery capabilities.

### Files

- [Core instructions](brand-strategist/SKILL.md).
- [Discovery questions, interview prompts, validation methods, and usage examples](brand-strategist/references/discovery-and-validation.md).
- [Brand Strategy Playbook template](brand-strategist/references/strategy-playbook-template.md).
- [Skill interface metadata](brand-strategist/agents/openai.yaml).

### Use

For an agent supporting SKILL.md folders, provide the complete `brand-strategist` folder through that agent's supported skill-loading workflow. Publishing this repository does not automatically install the skill in ChatGPT or another application.

For an instruction-based assistant, provide the core instructions and attach the reference files as supporting knowledge, subject to the platform's size limits.

Example request:

> Use the Brand Strategist skill to understand our business and develop a practical brand strategy. Start with the materials provided, ask only questions that materially change the recommendation, and produce positioning, proof, messaging examples, an identity brief, and a validation plan. Label assumptions clearly.

Useful inputs include the offering, audience, business objective, website or sales materials, customer feedback, competitors, actual proof, resources, and constraints. Missing evidence should lead to a provisional strategy and learning plan.

### Scope and validation

The core workflow was exercised on two fictional briefs: a small bookkeeping business and an established community cycling brand. These are limited behavior checks, not evidence of business results or broad validation. Identity directions are briefs until actual design assets are produced. Customer validation, font licensing, accessibility checks, and legal clearance must be represented according to what has actually been completed.
