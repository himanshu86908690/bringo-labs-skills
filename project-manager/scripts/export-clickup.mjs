#!/usr/bin/env node
import { readFile, mkdir, writeFile, access } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';

const statuses = new Set(['Backlog', 'Ready', 'In Progress', 'Blocked', 'In Review', 'Done', 'Cancelled']);
const priorities = { Urgent: 1, High: 2, Normal: 3, Low: 4 };
const confidence = new Set(['High', 'Medium', 'Low', 'Unknown']);
const text = value => typeof value === 'string' && value.trim().length > 0;
const validDate = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)
  && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;

export function validatePlan(plan) {
  if (!plan || !text(plan.project) || !Array.isArray(plan.tasks) || !plan.tasks.length)
    throw new Error('Provide a project name and at least one task.');
  const byId = new Map();
  for (const t of plan.tasks) {
    if (!t || !/^[A-Za-z][A-Za-z0-9_-]*$/.test(t.id ?? '') || byId.has(t.id))
      throw new Error(`Invalid or duplicate task ID: ${t?.id}`);
    byId.set(t.id, t);
    if (!text(t.name) || !text(t.description) || !Array.isArray(t.acceptance_criteria)
      || !t.acceptance_criteria.length || !t.acceptance_criteria.every(text))
      throw new Error(`${t.id}: name, description, and acceptance criteria are required.`);
    if (!['task', 'milestone', 'container'].includes(t.type) || !statuses.has(t.status)
      || !Object.hasOwn(priorities, t.priority) || !confidence.has(t.estimate_confidence))
      throw new Error(`${t.id}: invalid type, status, priority, or estimate confidence.`);
    for (const k of ['owner', 'reviewer', 'proposed_owner', 'phase', 'completion_evidence'])
      if (t[k] != null && typeof t[k] !== 'string') throw new Error(`${t.id}: ${k} must be text or null.`);
    if (t.parent_id != null && typeof t.parent_id !== 'string') throw new Error(`${t.id}: invalid parent ID.`);
    if (t.effort_hours != null && (typeof t.effort_hours !== 'number'
      || !Number.isFinite(t.effort_hours) || t.effort_hours < 0)) throw new Error(`${t.id}: invalid effort.`);
    if (t.type === 'container' && t.effort_hours != null) throw new Error(`${t.id}: containers must not duplicate child effort.`);
    if (t.type === 'milestone' && t.effort_hours !== 0) throw new Error(`${t.id}: milestone effort must be zero.`);
    for (const k of ['start_date', 'due_date'])
      if (t[k] != null && !validDate(t[k])) throw new Error(`${t.id}: invalid ${k}.`);
    if (t.start_date && t.due_date && t.start_date > t.due_date) throw new Error(`${t.id}: start is after due date.`);
    if (!Array.isArray(t.dependency_ids) || t.dependency_ids.some(id => typeof id !== 'string')
      || new Set(t.dependency_ids).size !== t.dependency_ids.length)
      throw new Error(`${t.id}: dependency_ids must contain unique ID strings.`);
  }
  for (const t of plan.tasks) {
    if (plan.tasks.some(child => child.parent_id === t.id) && t.effort_hours != null)
      throw new Error(`${t.id}: parent effort must be null; estimate leaf tasks to avoid double counting.`);
    if (t.parent_id != null && (!byId.has(t.parent_id) || t.parent_id === t.id))
      throw new Error(`${t.id}: invalid parent reference.`);
    if (t.parent_id && byId.get(t.parent_id).type === 'milestone') throw new Error(`${t.id}: a milestone cannot be a parent.`);
    for (const id of t.dependency_ids) {
      if (!byId.has(id) || id === t.id) throw new Error(`${t.id}: invalid dependency ${id}.`);
      if (t.start_date && byId.get(id).due_date && byId.get(id).due_date > t.start_date)
        throw new Error(`${t.id}: starts before prerequisite ${id} is due to finish.`);
    }
  }
  function checkCycles(edges, label) {
    const active = new Set(), visited = new Set();
    function visit(id) {
      if (active.has(id)) throw new Error(`${label} cycle involving ${id}.`);
      if (visited.has(id)) return;
      active.add(id);
      for (const next of edges(byId.get(id))) visit(next);
      active.delete(id); visited.add(id);
    }
    for (const id of byId.keys()) visit(id);
  }
  checkCycles(t => t.parent_id ? [t.parent_id] : [], 'Parent');
  checkCycles(t => t.dependency_ids, 'Dependency');
  // A task cannot wait for completion of its own containing task.
  for (const t of plan.tasks) {
    let parent = t.parent_id;
    while (parent) {
      if (t.dependency_ids.includes(parent)) throw new Error(`${t.id}: depends on its own ancestor ${parent}.`);
      parent = byId.get(parent).parent_id;
    }
  }
  const warnings = [];
  for (const t of plan.tasks) {
    if (!text(t.owner)) warnings.push(`${t.id}: owner unassigned${t.proposed_owner ? ` (proposed: ${t.proposed_owner})` : ''}.`);
    if (!t.due_date) warnings.push(`${t.id}: due date not confirmed.`);
    if (t.type === 'task' && t.effort_hours == null) warnings.push(`${t.id}: effort not estimated.`);
    if (t.status === 'Done' && !text(t.completion_evidence)) warnings.push(`${t.id}: Done reported without acceptance evidence; verify.`);
    if (t.type === 'container' && t.dependency_ids.length) warnings.push(`${t.id}: container prerequisites need manual scheduling review.`);
  }
  return warnings;
}

const cell = value => {
  let s = value == null ? '' : String(value);
  if (/^\s*[=+@-]/.test(s) || /^[\t\r]/.test(s)) s = "'" + s;
  return '"' + s.replaceAll('"', '""') + '"';
};
const md = value => String(value ?? '').replaceAll('|', '\\|').replace(/\r?\n/g, ' ');

export function renderPlan(plan) {
  const warnings = validatePlan(plan);
  const headers = ['Task ID', 'Task Name', 'Description content', 'Task assignee', 'Status', 'Priority',
    'Start date', 'Due date', 'Subtask IDs', 'List', 'Planning Phase', 'Planning Type', 'Effort Hours',
    'Planning Dependencies', 'Planning Reviewer', 'Planning Estimate Confidence', 'Planning Proposed Owner'];
  const rows = plan.tasks.map(t => [t.id, t.name,
    `${t.description}\n\nAcceptance criteria:\n${t.acceptance_criteria.map(x => `- ${x}`).join('\n')}`
      + (t.completion_evidence ? `\n\nCompletion evidence: ${t.completion_evidence}` : ''),
    t.owner, t.status, priorities[t.priority], t.start_date, t.due_date,
    plan.tasks.filter(child => child.parent_id === t.id).map(child => child.id).join(','),
    plan.project, t.phase, t.type, t.effort_hours, t.dependency_ids.join(','), t.reviewer,
    t.estimate_confidence, t.proposed_owner]);
  const csv = '\uFEFF' + [headers, ...rows].map(row => row.map(cell).join(',')).join('\r\n') + '\r\n';
  const table = `# ${plan.project}\n\n| ID | Parent | Task | Owner / proposed role | Status | Effort h | Start | Due | Prerequisites |\n|---|---|---|---|---|---|---|---|---|\n`
    + plan.tasks.map(t => [t.id, t.parent_id, t.name, t.owner || (t.proposed_owner ? `Proposed: ${t.proposed_owner}` : 'Unassigned'),
      t.status, t.effort_hours, t.start_date, t.due_date, t.dependency_ids.join(',')].map(md).join(' | ')).map(r => `| ${r} |`).join('\n') + '\n';
  const dependencies = plan.tasks.filter(t => t.dependency_ids.length)
    .map(t => `- ${t.id} must wait for: ${t.dependency_ids.join(', ')}.`).join('\n') || '- None.';
  const mapping = `# ClickUp mapping and checks\n\nPrepared export; no ClickUp import has been performed.\n\n`
    + `Map Task ID and Subtask IDs explicitly to create hierarchy. Use comma as the multi-value delimiter.\n`
    + `Map Description content as plain text. Map Task assignee only to confirmed users.\n`
    + `Map Priority: 1 Urgent, 2 High, 3 Normal, 4 Low. Select YYYY-MM-DD for dates.\n`
    + `Map Effort Hours to a Number custom field, not unverified native Time Estimate units.\n`
    + `Map Planning columns to optional Text custom fields. Planning Dependencies does not create native links.\n`
    + `Preview a small sample and verify hierarchy, statuses, owners, dates, text, and numeric fields before full import.\n`
    + `Do not repeatedly import this file to update existing tasks without a verified update workflow.\n\n`
    + `## Native dependency links to establish manually\n\n${dependencies}\n\n`
    + `## Unresolved inputs and checks\n\n${warnings.map(w => `- ${w}`).join('\n') || '- Basic file checks passed; confirm capacity and acceptance separately.'}\n`;
  return { csv, table, mapping, warnings };
}

async function main() {
  const args = process.argv.slice(2);
  const force = args.includes('--force');
  const positional = args.filter(a => a !== '--force');
  if (positional.length !== 2) throw new Error('Usage: node export-clickup.mjs tasks.json output-folder [--force]');
  const inputPath = resolve(positional[0]), outputDir = resolve(positional[1]);
  const plan = JSON.parse(await readFile(inputPath, 'utf8'));
  const output = renderPlan(plan);
  const files = [['clickup-tasks.csv', output.csv], ['task-table.md', output.table], ['clickup-mapping.md', output.mapping]];
  for (const [name] of files) {
    const destination = join(outputDir, name);
    if (destination === inputPath) throw new Error('Output would overwrite input.');
    if (!force) {
      let exists = false;
      try { await access(destination); exists = true; } catch (e) { if (e.code !== 'ENOENT') throw e; }
      if (exists) throw new Error(`Refusing to overwrite ${name}; use a new folder or --force.`);
    }
  }
  await mkdir(outputDir, { recursive: true });
  for (const [name, contents] of files) await writeFile(join(outputDir, name), contents, { encoding: 'utf8', flag: force ? 'w' : 'wx' });
  console.log(`Exported ${plan.tasks.length} task rows; ${output.warnings.length} unresolved-input warnings. See clickup-mapping.md.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href)
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
