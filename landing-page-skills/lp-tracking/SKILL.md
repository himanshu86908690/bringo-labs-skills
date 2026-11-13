---
name: lp-tracking
description: "Plan, implement, or verify landing page measurement. Use for event definitions, attribution, consent, analytics, ad-platform conversions, CRM outcomes, and duplicate prevention."
---

# Landing page tracking

1. Before build, read the brief and configured tools. Record each event’s name, meaning, trigger, source of truth, allowed fields, attribution, consent behavior, deduplication strategy, destination, and test.
2. Define enquiry success as a receiving system’s acceptance. Distinguish form start, accepted enquiry, qualified enquiry, booking, held call, and sale when relevant. Tie downstream events to reliable record status. Preserve permitted campaign attribution and exclude contact details from general analytics payloads.
3. Open a tagged test link and complete the action through the page. Reconcile the destination record, attribution, and conversion count. Test rejection, repeat clicks, retries, confirmation refresh, and relevant consent choices. Check duplicates across browser tags, server events, and ad integrations when they report the same action. A failed attempt or repeated confirmation must leave the accepted count unchanged.
4. Verify downstream outcome events only where the owner or integration supplies a status. Re-run the smoke test on the live campaign entry link after authorized deployment. Report each destination as planned, implemented, verified, or blocked, with exact simulation limits. Match traffic cohorts and reporting windows for rates and acquisition cost. Allow time for sales outcomes to mature.

Use [Corey Haines Analytics](https://github.com/coreyhaines31/marketingskills/blob/main/skills/analytics/SKILL.md) for event and campaign attribution methods.
