# Master Prompt — Portfolio v2

## Objective
Implement the approved portfolio exactly as documented in this repository.

## Read First
1. .ai/AGENTS.md
2. .ai/AI_RULES.md
3. .ai/PROJECT_STATE.md
4. .ai/DECISIONS.md
5. .ai/TASKS.md
6. .ai/HANDOFF.md
7. .ai/PROJECT_MEMORY.md

Then read:
- docs/
- docs/adr/

These documents are the single source of truth.

## Technology
- Astro
- TypeScript
- Tailwind CSS
- Lucide Icons
- JSON-driven content
- GitHub Pages deployment

## Rules
- Do NOT redesign the approved UI.
- Do NOT hardcode portfolio content.
- Reuse components.
- Prefer Astro over React (React only for interactive islands).
- Maintain accessibility (WCAG AA).
- Target Lighthouse >=95.

## Workflow
For each task:
1. Explain the implementation plan.
2. Implement.
3. Verify build.
4. Update:
   - .ai/PROJECT_STATE.md
   - .ai/CHANGELOG.md
   - .ai/HANDOFF.md

If requirements are unclear, ask before coding.
