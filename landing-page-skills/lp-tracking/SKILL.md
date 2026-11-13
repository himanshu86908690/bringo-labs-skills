---
name: lp-tracking
description: "Plan, implement, or verify landing page measurement. Use for event definitions, attribution, consent, analytics, ad-platform conversions, CRM outcomes, and duplicate prevention."
---

# Landing page tracking

1. Before build, read the brief and configured tools. Record each event’s meaning, trigger, source of truth, allowed fields, attribution, consent behavior, deduplication strategy, destination, and test. Define reporting windows, denominators, and acquisition-cost calculations where relevant.
2. Define enquiry success as a receiving system’s acceptance. Distinguish form start, accepted enquiry, qualified enquiry, booking, held call, and sale when relevant. Tie downstream events to reliable record status. Preserve permitted campaign attribution and exclude contact details from general analytics payloads.
3. Open a tagged test link and complete the action through the page. Reconcile the destination record, attribution, and conversion count. Test rejection, repeat clicks, retries, confirmation refresh, and relevant consent choices. Check that a failure or repeat interaction does not inflate the success count.
4. Verify downstream outcome events only where the owner or integration supplies a status. Re-run the smoke test on the live campaign entry link after authorized deployment. Report each destination as planned, implemented, verified, or blocked, with exact simulation limits. Use comparable time windows and allow time for outcomes to mature.

## Reconcile reporting

Use consistent event names and document which system owns each metric. Compare a tagged test journey with the receiving record and the corresponding analytics event. Check for duplicate triggers when a browser tag, a server event, and an ad-platform integration can all report the same action. Document how they are reconciled in each destination. For rates and acquisition cost, use the same traffic cohort and comparable reporting window for numerator and denominator.

Use [Corey Haines Analytics](https://github.com/coreyhaines31/marketingskills/blob/main/skills/analytics/SKILL.md) for event and campaign attribution methods.
