# ClickUp handoff contract

## Source and boundary

Use Markdown for the delivery brief and a single canonical JSON task collection for task-level data. Generate both CSV and a readable task table from that collection to avoid drift. Treat the export as prepared for mapping, not as proof of a successful ClickUp import.

Verify current official documentation or the user's importer before relying on changed product behavior. Current reference pages checked on 2026-11-02:

- https://help.clickup.com/hc/en-us/articles/6310821748759-Prepare-a-spreadsheet-for-import
- https://help.clickup.com/hc/en-us/articles/6310876671255-Fields-supported-by-the-Spreadsheets-importer

Use a unique Task ID for each row. A parent's Subtask IDs cell lists its children's IDs, delimited with commas and without spaces. This enables subtasks with their own properties. Map these columns explicitly; do not substitute a Parent ID column and assume automatic hierarchy creation. Avoid unnecessary nested levels and confirm the workspace supports the depth used.

Preserve dependency IDs as text and provide a separate dependency checklist. Do not promise native dependency links from this CSV. Confirm hierarchy, assignees, dates, custom fields, statuses, and estimates in a small preview before importing the complete project. The skill itself does not perform an import.

## Canonical JSON

Use an object with a nonempty `project` string and a `tasks` array. Each task uses:

| Field | Contract |
|---|---|
| id | Stable unique string, letters/digits/hyphens/underscores; begin with a letter |
| parent_id | Another task ID or null; phases can be container tasks |
| type | task, milestone, or container |
| name | Concrete action and output; nonempty |
| phase | Phase label or empty string |
| description | Essential steps, context, and expected output; nonempty |
| acceptance_criteria | Nonempty string array; phase exit criteria for containers |
| owner | Confirmed assignee name or email; null if unknown |
| proposed_owner | Proposed role only, optional; not imported as an assignee |
| reviewer | Confirmed name or role, or null |
| status | Backlog, Ready, In Progress, Blocked, In Review, Done, or Cancelled |
| priority | Urgent, High, Normal, or Low |
| effort_hours | Nonnegative number or null; containers null, milestones 0 |
| estimate_confidence | High, Medium, Low, or Unknown |
| start_date / due_date | YYYY-MM-DD or null; no relative dates in these fields |
| dependency_ids | Array of unique existing task IDs; finish-to-start prerequisites |
| completion_evidence | Evidence string or null; preserve supplied Done claims and flag missing evidence |

Use `assets/example-project.json` as a synthetic format example, not a company-specific template or a promised delivery estimate. Reuse existing IDs, keep removed work Cancelled, and keep confirmed owner separate from a proposed role.

## Generate files

Require Node.js with ES-module support. Use no API keys or third-party dependencies.

```sh
node scripts/export-clickup.mjs path/to/tasks.json path/to/output-folder
```

The exporter validates basic fields, references, parent and dependency cycles, ISO dates, and explicit date ordering. It writes `clickup-tasks.csv`, `task-table.md`, and `clickup-mapping.md`. Refuse to overwrite these files unless `--force` is explicitly passed. This helper does not calculate capacity, critical paths, holiday calendars, inherited container schedules, or business feasibility; assess those in the planning workflow before export.

Native field mapping: Task ID, Task Name, Description content, Task assignee, Status, Priority, Start date, Due date, Subtask IDs, and List. Priority uses ClickUp's numeric mapping: 1 Urgent, 2 High, 3 Normal, 4 Low. Pick the importer's YYYY-MM-DD date format.

Map Planning Phase, Planning Type, Planning Reviewer, Planning Dependencies, Planning Estimate Confidence, and Planning Proposed Owner to text custom fields if wanted. Map Effort Hours to a Number custom field. Do not directly map decimal hours to native Time Estimate without confirming units and doing a sample import. Keep real assignees blank where unknown; never fabricate an email address.

Descriptions include acceptance criteria and supplied completion evidence in plain text. CSV quotes embedded commas, newlines, and quotes. The exporter adds a leading apostrophe to free text beginning with spreadsheet formula characters; inspect this during preview if it appears visibly in task text. Task IDs are restricted so sanitization cannot break relationship references.

## Before and after handoff

- Check the plan's capacity and dependency feasibility, proposed owners, readiness, estimate confidence, and approvals.
- Report structural errors and unresolved business inputs separately. Successful export proves file checks passed, not that every task is ready to start.
- Explain manual dependency setup and any mapping decisions. Do not hide unverified fields.
- Keep the JSON and Markdown plan together; regenerate rather than making independent edits to CSV.
- After a real import by the user, request its task-ID mapping before preparing changes. Do not recommend repeatedly importing the entire CSV as an update mechanism; it may duplicate tasks.
