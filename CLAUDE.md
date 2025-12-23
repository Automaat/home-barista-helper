# Home Barista Helper

Mobile-first interactive coffee dialing guide. Wizard-based app for espresso, V60, Chemex, Aeropress brewing.

**Tech Stack:** SvelteKit, TypeScript, Tailwind v4, Vitest, oxlint, mise

**Purpose:** Help home baristas dial in coffee with grinder-specific settings and troubleshooting.

---

## Project Structure

```
├── src/
│   ├── lib/                 # Shared components, utilities
│   ├── routes/              # SvelteKit routes (file-based)
│   │   ├── +layout.svelte   # Root layout
│   │   ├── +layout.ts       # Layout config (prerender)
│   │   └── +page.svelte     # Home page
│   ├── app.css              # Tailwind styles
│   └── app.html             # HTML template
├── .mise.toml               # Tool versions and tasks
├── bulletproof-dialing-framework.md  # Coffee domain reference
└── vitest.config.ts         # Test config
```

**Key Files:**
- `bulletproof-dialing-framework.md` - Complete coffee brewing reference (grinders, methods, troubleshooting)
- `.mise.toml` - Dev tools (Node 22, pnpm)

---

## Development Workflow

### Before Coding

1. ASK questions - clarify requirements, mobile UX impact
2. Research patterns - check existing components
3. Plan - use Plan Mode (Shift+Tab twice) for features
4. **Write tests FIRST** - TDD required
5. Implement - incremental, mobile-first

### TDD: Test → Red → Green → Refactor

**ALWAYS:** Test FIRST, verify mobile viewport

### Workflow

**Explore → Plan → Test → Code → Verify**

Plan Mode for: wizard flows, new features, multi-component changes

---

## TypeScript/Svelte 5 Conventions

### Code Style

- **Formatter:** Prettier
- **Linter:** oxlint + prettier
- **Naming:** camelCase (variables), PascalCase (components)
- **TypeScript:** strict mode

### Linter Errors

**ALWAYS:**
- Fix properly, research if unclear
- Fix root cause, not symptoms

**NEVER:**
- Use `// eslint-disable`, `// @ts-ignore`
- Ignore warnings
- Work around linter

### Svelte 5 Runes (REQUIRED)

```svelte
let count = $state(0);                  // Reactive state
let doubled = $derived(count * 2);      // Derived
$effect(() => console.log(count));      // Effects

// Props
let { grindSize, method }: Props = $props();
```

**NEVER Svelte 4:**
```svelte
❌ let count = 0;           // Old reactivity
❌ $: doubled = count * 2;  // Old derived
❌ export let prop;         // Old props
```

### Error Handling

Return errors, don't throw:
```typescript
function parse(input: string): number | Error {
  const value = parseFloat(input);
  return isNaN(value) ? new Error('Invalid') : value;
}
```

---

## Mobile-First Principles

**PRIMARY CONCERN** - All features prioritize mobile UX.

### Requirements

- Touch targets: **44x44px minimum**
- First paint: <1s on 3G
- Bundle: minimal
- Viewport: test mobile (DevTools)

### Animations

**AVOID heavy svelte-motion** - performance critical.

✅ OK: Subtle transitions (<200ms), simple opacity/transform
❌ AVOID: Spring physics, multiple simultaneous, complex transforms

### Responsive

```css
/* Mobile-first (default) */
.component { ... }

/* Enhancement */
@media (min-width: 768px) { ... }
```

---

## Coffee Domain Knowledge

**REFERENCE:** `bulletproof-dialing-framework.md` (ALWAYS consult)

**Philosophy:** Change ONE variable at a time → Test → Taste → Adjust

### Terminology

| Term | Definition |
|------|------------|
| **Dial in** | Adjust grind/temp/ratio for desired taste |
| **Under-extracted** | Sour, weak → finer, hotter, longer |
| **Over-extracted** | Bitter, harsh → coarser, cooler, shorter |
| **Channeling** | Uneven extraction (water finds easy path) |
| **Brew ratio** | Coffee:water (1:2 = 18g→36g) |
| **Roast level** | Light (dense) / Medium / Dark (porous) |

### Grinders

**Timemore 078S** (Espresso): Light 0.6-1.4 | Medium 1.5-2.0 | Dark 2.0-2.6
⚠️ Calibration: Many units shipped 1-2 holes too coarse

**Commandante C40** (Filter): V60 23-32 | Chemex 40-45 | Aeropress 10-28

### Brew Methods

| Method | Ratio | Time | Temp | Notes |
|--------|-------|------|------|-------|
| **Espresso** | 1:1.5-1:2.5 | 25-35s | 90-96°C | Lighter = longer/hotter |
| **V60** | 1:15-1:16 | 2:45-3:15 | 90-96°C | Inc. 30-45s bloom |
| **Chemex** | 1:15-1:17 | 3:30-4:30 | 90-96°C | Coarser than V60 |
| **Aeropress** | 1:6-1:16 | 1-4min | 80-96°C | Style-dependent |

### Roast Impact

**CRITICAL:** Roast affects ALL variables.

Light: FINER grind, HIGHER temp (+94°C), LONGER time, 1:16-1:17
Dark: COARSER grind, LOWER temp (88-92°C), SHORTER time, 1:14-1:15

**Switching:** Light↔Dark = ±2-3 clicks, ±2-4°C, ±15-30s

### Troubleshooting

| Taste | Solution |
|-------|----------|
| **Sour** | Finer, hotter, longer, more water |
| **Bitter** | Coarser, cooler, shorter, less water |
| **Sour+Bitter** | Fix puck prep / pour technique |
| **Weak** | Finer, more coffee, hotter |
| **Harsh** | Coarser, cooler |

### Domain Rules

✅ ALWAYS: Celsius, ratios as 1:X, reference framework doc
❌ NEVER: Make up settings, Fahrenheit, change multiple variables

---

## Simplicity Principles

### Anti-Patterns

❌ Complex state (stores when component state works)
❌ Svelte 4 patterns (class components, `$:`, `export let`)
❌ Heavy animations (spring physics, many simultaneous)
❌ Desktop-first (<44px targets, hover-primary)
❌ Over-engineering wizard (routing/state machines for linear flow)
❌ Incorrect coffee terms (made-up settings, Fahrenheit, 2:1 ratios)

### Enforcement

✅ Component state > stores
✅ Svelte 5 runes only
✅ Mobile viewport first, 44px+ touch targets
✅ Reference `bulletproof-dialing-framework.md`
✅ One variable at a time

**Checks:**
1. Component state instead of store?
2. Svelte 5 pattern?
3. Works mobile viewport?
4. Touch targets 44px+?
5. Coffee terminology accurate?

**If unsure:** STOP, ask.

### Patterns

**Wizard:** Linear state (`step` number), no routing, Next/Back buttons
**Grinder:** Database from framework doc, single source of truth
**Calculations:** Pure functions, TDD for brew math

---

## Code Generation Rules

### ALWAYS

- TDD: test FIRST
- Incremental: 20-50 lines
- Mobile viewport validation
- Complete code (no placeholders)
- Coffee accuracy (reference doc)
- Svelte 5 runes

### NEVER

- >100 lines per change
- Big changes single step
- Modify unrelated code
- Assume (ASK)
- Skip tests
- Desktop-first

### TDD

Test → Red → Green → Refactor → Verify mobile → Check performance

---

## Common Commands

### Development

```bash
# Start dev server
mise run dev

# Run tests (watch mode)
pnpm test:watch

# Run tests (once)
mise run test

# Type check
mise run check

# Lint
mise run lint

# Format
mise run format

# Build
mise run build

# Preview build
mise run preview
```

### Testing

```bash
# Watch mode (TDD)
pnpm test:watch

# UI mode
pnpm test:ui

# Run once (CI)
mise run test
```

### Git

**Branch:** `feat/description`, `fix/description`
**Commits:** Conventional (feat/fix/test/refactor/style/docs)
**Signing:** ALWAYS `-s -S`

```bash
git commit -s -S -m "feat: add ratio calculator"
```

---

## Testing Patterns

**TDD required for:** Brew calculations, domain logic, wizard flow

**Structure:**
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';

describe('BrewCalculator', () => {
  it('calculates 1:2 ratio', () => {
    expect(calculateRatio(18, 36)).toBe('1:2');
  });
});

describe('GrinderSelector', () => {
  it('displays grinders', () => {
    render(GrinderSelector);
    expect(screen.getByText('Timemore 078S')).toBeInTheDocument();
  });
});
```

**Mobile testing:**
```typescript
it('touch target ≥44px', () => {
  render(Button);
  const el = screen.getByRole('button');
  expect(parseInt(getComputedStyle(el).height)).toBeGreaterThanOrEqual(44);
});
```

---

## Component Patterns

### Wizard (Linear)

```svelte
<script lang="ts">
  let step = $state(0);
  let canNext = $derived(step < 3);
  let canBack = $derived(step > 0);
</script>

{#if step === 0}<GrinderSelection />
{:else if step === 1}<BrewMethod />
{:else}<Results />{/if}

<button onclick={() => step--} disabled={!canBack}>Back</button>
<button onclick={() => step++} disabled={!canNext}>Next</button>
```

### Mobile Input

```svelte
<input type="number" class="min-h-[44px] text-lg" inputmode="decimal" />
```

### Grinder Database

```typescript
// lib/grinders.ts - reference framework doc
export const grinders = {
  'timemore-078s': { name: 'Timemore 078S', type: 'espresso', /* ... */ },
  'commandante-c40': { name: 'Commandante C40', type: 'filter', /* ... */ },
};
```

---

## Known Issues & Gotchas

**Tailwind v4:** CSS variables, `@tailwind` directives, check v3→v4 migration
**Svelte 5:** Runes required, `$props()` not `export let`, `$:` deprecated
**Mobile Safari:** Use `100dvh` not `100vh`, font-size <16px causes input zoom
**i18n:** Paraglide English/Polish, see paraglide-sveltekit docs

**Coffee:**
- Timemore 078S: calibration varies (1-2 holes too coarse)
- Roast affects ALL variables (can't change grind only)
- One variable at a time (scientific method)
- Temperature: Celsius only

---

## Resources

- `bulletproof-dialing-framework.md` - Coffee reference (ALWAYS consult)
- [SvelteKit](https://kit.svelte.dev/) | [Svelte 5 Runes](https://svelte.dev/docs/svelte/what-are-runes)
- [Tailwind v4](https://tailwindcss.com/) | [Vitest](https://vitest.dev/)

---

## Maintenance

**Update when:** New brew method, grinder added, patterns emerge, UX issues
**Keep:** <500 lines, mobile-first, TDD, coffee accuracy, Svelte 5
**Review:** Monthly, after features, when framework doc updates
