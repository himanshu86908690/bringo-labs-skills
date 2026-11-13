---
name: lp-developer
description: "Build, fix, stage, or deploy a landing page and its form, booking, checkout, or CRM integration. Use for responsive implementation, accessibility, web quality, and functional tests."
---

# Landing page development

1. Read the design, copy, measurement plan, project conventions, and integration contracts. Reuse the client stack and approved vendors. Use staging and designated test destinations. Keep credentials server-side and implement the project's agreed privacy and consent behavior.
2. Build responsive semantic UI with accessible labels, visible focus, autocomplete where appropriate, and reduced-motion behavior. Preserve the approved offer and CTA.
3. Connect the real action path to the receiving record and any agreed assignment and notification. Validate inputs on the receiving side. Show success only after acceptance. Handle failed submissions, retries, double-clicks, and a lost response after acceptance using the receiving system’s duplicate controls. Preserve recoverable inputs where appropriate.
4. Test the normal entry path on narrow and wide viewports. Check links, keyboard and touch operation, invalid input, success, failure, retry, duplicate protection, receiving records, assignment, and notifications as applicable. Give lp-tracking the supported test route and evidence. Label mock-only results.
5. Review source with [Vercel Web Interface Guidelines](https://github.com/vercel-labs/agent-skills/blob/main/skills/web-design-guidelines/SKILL.md). Apply [Vercel React guidance](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/SKILL.md) to React or Next.js when investigating fetch waterfalls, bundle cost, or avoidable renders. Use [Addy Osmani Web Quality Audit](https://github.com/addyosmani/web-quality-skills/blob/main/skills/web-quality-audit/SKILL.md) for measured performance and accessibility. Use Lighthouse or a browser trace when available. Record the URL, viewport, conditions, manual accessibility checks, and failing element. Distinguish lab runs, inspection, and URL- or origin-level field data. Rerun the same check after the fix.
6. Deliver the staging URL or preview, test evidence, and limitations. On authorized launch, preserve rollback, deploy to the approved target, and verify the complete journey on the live entry link.
