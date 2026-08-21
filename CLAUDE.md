# AGENTS.md

Project-specific rules. General behavior (principles, discovery, state, communication, debugging, testing/writing style, response format) lives in the global CLAUDE.md.

---

## Code Standards

Default unless told otherwise:

- TypeScript only — no JS. Add proper types/interfaces. Import everything used.
- ES modules only — never CommonJS. Set `"type": "module"` in package.json.
- Node.js: built-in `--experimental-strip-types` (not ts-node/tsx) and `--env-file` (not dotenv).
- `fetch()` over axios — assume full support, no polyfills.
- Web servers: frameworks using standard Web Request + Response — never Express.
- Latest versions of all libraries.
- Tailwind v4 — never v3.
- Biome over ESLint/Prettier.
- Vite for build tooling when needed.
- Function declarations over expressions.
- Pointer events over touch/mouse events.
- Modern HTML (`<dialog>`, popover) is fair game.
- CSS: Grid over Flexbox when both fit. Avoid `position: absolute`. Use nesting, custom properties, container queries, subgrid, color functions.
- Never use ad-hoc Python/JS scripts to test or debug — use what's in the project or a browser agent.

---

## Agents

Prefer subagents for discrete tasks. Have them report back the list of tasks completed.

---

## UI Work

Use Chrome DevTools MCP for visual confirmation, debugging, and testing of running apps.
Install: `claude mcp add chrome-devtools npx chrome-devtools-mcp@latest`
For cross-browser verification before release, fall back to Playwright MCP.
