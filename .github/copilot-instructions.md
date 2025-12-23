# Code Review Instructions

## Project Context

**Stack:**

- Language/Framework: TypeScript, SvelteKit, Svelte 5
- UI: Tailwind CSS v4, mobile-first
- Testing: Vitest, @testing-library/svelte
- Linting: oxlint, prettier
- Build System: Vite, pnpm
- Internationalization: Paraglide (English/Polish)

**Core Purpose:**
Mobile-first wizard app for coffee brewing (espresso, V60, Chemex, Aeropress) with grinder-specific settings.

**Conventions:**

- Error Handling: Return errors, don't throw (`value | Error`)
- Reactivity: Svelte 5 runes only (`$state`, `$derived`, `$effect`, `$props`)
- Testing: TDD required (test-first workflow)
- Mobile: 44px touch targets, <1s first paint on 3G
- Coffee Domain: Reference `bulletproof-dialing-framework.md`

**Critical Areas (Extra Scrutiny):**

- Mobile UX (touch targets, viewport, performance)
- Coffee calculations (brew ratios, grind settings, temperature)
- Wizard flow state management
- Svelte 5 rune usage (no Svelte 4 patterns)
- Coffee domain accuracy (terminology, ranges, troubleshooting)

---

## Review Before CI Completes

You review PRs immediately, before CI finishes. Do NOT flag issues that CI will catch.

**CI Already Checks:**

- Code formatting (prettier)
- Linting rules (oxlint, eslint-plugin-svelte)
- Type errors (TypeScript compiler, svelte-check)

---

## Review Priority Levels

### 🔴 CRITICAL (Must Block PR)

**Correctness Issues** (90%+ confidence)

- [ ] Logic errors in brew calculations (ratios, temperatures, times)
- [ ] Svelte 4 patterns (breaking change - must use Svelte 5 runes)
- [ ] Breaking mobile UX (touch targets <44px, poor viewport handling)
- [ ] Coffee domain errors (incorrect terminology, impossible settings)
- [ ] Data loss/corruption in wizard state
- [ ] Null/undefined dereferences

**Security** (95%+ confidence)

- [ ] XSS vulnerabilities in user input
- [ ] Secrets in code (API keys if any external services added)
- [ ] Sensitive data exposure

### 🟡 HIGH (Request Changes)

**Maintainability** (80%+ confidence)

- [ ] Missing tests for new features (TDD required)
- [ ] Complex calculations without tests
- [ ] Public APIs/components without comments
- [ ] Poor naming (unclear intent)
- [ ] Coffee settings not from `bulletproof-dialing-framework.md`
- [ ] Incorrect Svelte 5 patterns
- [ ] Over-engineering (stores when component state works)

**Mobile-First Violations** (85%+ confidence)

- [ ] Touch targets <44px
- [ ] Desktop-first approach (no mobile validation)
- [ ] Heavy animations (spring physics, many simultaneous)
- [ ] Non-mobile input types (missing `inputmode`)
- [ ] Fixed viewport heights (`100vh` instead of `100dvh`)
- [ ] Font-size <16px on inputs (causes iOS zoom)

### 🟢 MEDIUM (Suggest/Comment)

**Performance** (70%+ confidence)

- [ ] Unnecessary re-renders
- [ ] Large bundles (check imports)
- [ ] Blocking operations
- [ ] Missing lazy-loading for routes

**Best Practices** (65%+ confidence)

- [ ] Suboptimal Svelte patterns
- [ ] Better standard library alternative
- [ ] Component could be simplified

### ⚪ LOW (Optional/Skip)

Don't comment on:

- Personal style preferences
- Minor optimizations with no measurable impact
- Refactoring unrelated to the change
- Anything below confidence threshold

---

## Code Quality Standards

### Naming

- Variables/Functions: camelCase
- Components: PascalCase
- Constants: UPPER_SNAKE_CASE
- Meaningful names (intent clear without comments)

### Error Handling

- Return errors, don't throw: `function parse(input: string): number | Error`
- NEVER: unchecked promise rejections, bare try/catch without handling
- User-facing errors: clear messages for brewing troubleshooting

### Testing (TDD Required)

- **Coverage:** Aim for high coverage on calculations
- **Required tests:**
  - [ ] New features have unit tests FIRST
  - [ ] Brew calculations tested
  - [ ] Wizard flow tested
  - [ ] Mobile touch targets validated
  - [ ] Edge cases covered
- **Test quality:**
  - Clear test names (`it('calculates 1:2 espresso ratio')`)
  - Isolated (no shared state)
  - Fast (no unnecessary delays)

### Documentation

- [ ] Public functions/components documented
- [ ] Complex brewing calculations explained
- [ ] Non-obvious mobile decisions have comments
- [ ] Coffee domain references noted

---

## Svelte 5 Guidelines (CRITICAL)

### ✅ REQUIRED: Svelte 5 Runes

```svelte
<script lang="ts">
	// Reactive state
	let step = $state(0);

	// Derived values
	let canNext = $derived(step < 3);

	// Effects
	$effect(() => {
		console.log(`Step changed: ${step}`);
	});

	// Props
	interface Props {
		grindSize: number;
		method: string;
	}
	let { grindSize, method }: Props = $props();
</script>
```

### ❌ FORBIDDEN: Svelte 4 Patterns

```svelte
<script lang="ts">
	// WRONG - Old reactivity
	let count = 0;

	// WRONG - Old derived
	$: doubled = count * 2;

	// WRONG - Old props
	export let prop;

	// WRONG - Old store syntax in components
	$: console.log($storeValue);
</script>
```

**Flag immediately:** Any `export let`, `$:`, or old reactive patterns.

---

## TypeScript Guidelines

### Types

- Explicit on public APIs and complex functions
- Avoid `any`, use `unknown` if needed
- Type guards for narrowing
- Strict mode enabled

### Async

- async/await over raw Promises
- Handle rejections properly
- No blocking operations

---

## Mobile-First Guidelines (CRITICAL)

### Touch Targets

```svelte
<!-- ✅ Good: 44px minimum -->
<button class="min-h-[44px] min-w-[44px] text-lg"> Next </button>

<!-- ❌ Bad: Too small for touch -->
<button class="h-8 text-sm">Next</button>
```

### Input Types

```svelte
<!-- ✅ Good: Proper mobile keyboard -->
<input type="number" inputmode="decimal" class="min-h-[44px] text-base" />

<!-- ❌ Bad: Wrong keyboard, triggers zoom -->
<input type="text" class="h-8 text-sm" />
```

### Viewport

```svelte
<!-- ✅ Good: Dynamic viewport height -->
<div class="h-dvh">...</div>

<!-- ❌ Bad: Fixed height (mobile Safari issues) -->
<div class="h-screen">...</div>
```

### Animations

```svelte
<!-- ✅ Good: Subtle, fast transitions -->
<div class="transition-opacity duration-150">...</div>

<!-- ❌ Bad: Heavy spring physics -->
<Motion spring={{ stiffness: 100 }}>...</Motion>
```

---

## Coffee Domain Guidelines (CRITICAL)

### Accuracy Requirements

- [ ] Terminology from `bulletproof-dialing-framework.md`
- [ ] Temperature in Celsius only
- [ ] Ratios as 1:X format (e.g., 1:16, not 16:1)
- [ ] Grinder settings match framework doc
- [ ] One variable changed at a time in troubleshooting

### Valid Ranges (Examples)

**Espresso (Timemore 078S):**

- Light roast: 0.6-1.4 clicks
- Medium roast: 1.5-2.0 clicks
- Dark roast: 2.0-2.6 clicks
- Temperature: 90-96°C
- Time: 25-35 seconds
- Ratio: 1:1.5 to 1:2.5

**V60 (Commandante C40):**

- Grind: 23-32 clicks
- Temperature: 90-96°C
- Time: 2:45-3:15 (including bloom)
- Ratio: 1:15 to 1:16

### ✅ Good: Accurate Coffee Code

```typescript
interface EspressoSettings {
	grindSize: number; // 0.6-2.6 for Timemore 078S
	temperature: number; // Celsius: 90-96
	brewTime: number; // seconds: 25-35
	ratio: string; // format: "1:2"
}

// Reference framework doc
const TIMEMORE_078S_LIGHT_MIN = 0.6;
const TIMEMORE_078S_LIGHT_MAX = 1.4;
```

### ❌ Bad: Coffee Domain Errors

```typescript
// WRONG: Temperature in Fahrenheit
const temp = 203; // Should be Celsius (95°C)

// WRONG: Ratio backwards
const ratio = '2:1'; // Should be "1:2"

// WRONG: Made-up grind setting
const grind = 5.3; // Not in framework doc range

// WRONG: No single source of truth
const settings = {
	grindSize: 1.2 // Not from bulletproof-dialing-framework.md
};
```

**Flag immediately:** Any coffee settings not from framework doc, Fahrenheit, incorrect ratios.

---

## Architecture Patterns

**Follow these patterns:**

- Component state over stores (wizard: simple `step` number)
- Linear wizard flow (no routing, no state machines for simple flows)
- Pure functions for calculations
- Grinder database from framework doc (single source of truth)

**Avoid these anti-patterns:**

- Complex state management when component state works
- Over-engineering wizard (routing/state machines for linear flow)
- Desktop-first components
- Made-up coffee settings
- Svelte 4 patterns
- Heavy animations
- God components (keep <150 lines)

---

## Review Examples

### ✅ Good: Svelte 5 Runes

```svelte
<script lang="ts">
	let step = $state(0);
	let canNext = $derived(step < 3);
	let canBack = $derived(step > 0);

	function nextStep() {
		if (canNext) step++;
	}
</script>

{#if step === 0}
	<GrinderSelection />
{:else if step === 1}
	<BrewMethod />
{:else}
	<Results />
{/if}

<button onclick={() => step--} disabled={!canBack} class="min-h-[44px]"> Back </button>
<button onclick={nextStep} disabled={!canNext} class="min-h-[44px]"> Next </button>
```

### ❌ Bad: Svelte 4 Patterns

```svelte
<script lang="ts">
	// WRONG: Old reactivity
	let step = 0;
	$: canNext = step < 3;

	// WRONG: Old props
	export let grindSize;
</script>
```

---

### ✅ Good: Mobile Touch Target

```svelte
<button class="min-h-[44px] min-w-[44px] px-6 text-lg" onclick={() => handleSubmit()}>
	Start Brewing
</button>
```

### ❌ Bad: Too Small for Touch

```svelte
<!-- Touch target too small -->
<button class="h-8 px-2 text-sm" onclick={() => handleSubmit()}> Start </button>
```

---

### ✅ Good: Error Handling

```typescript
function parseGrindSize(input: string): number | Error {
	const value = parseFloat(input);
	if (isNaN(value)) {
		return new Error('Grind size must be a number');
	}
	if (value < 0.6 || value > 2.6) {
		return new Error('Grind size out of range for Timemore 078S');
	}
	return value;
}
```

### ❌ Bad: Throwing Errors

```typescript
function parseGrindSize(input: string): number {
	const value = parseFloat(input);
	if (isNaN(value)) throw new Error('Invalid'); // WRONG: throws
	return value;
}
```

---

### ✅ Good: TDD Test Structure

```typescript
import { describe, it, expect } from 'vitest';
import { calculateBrewRatio } from '$lib/calculations';

describe('calculateBrewRatio', () => {
	it('calculates 1:2 espresso ratio correctly', () => {
		expect(calculateBrewRatio(18, 36)).toBe('1:2');
	});

	it('handles edge case: zero coffee weight', () => {
		const result = calculateBrewRatio(0, 36);
		expect(result instanceof Error).toBe(true);
	});
});
```

---

## Maintainer Priorities

**What matters most to this project:**

1. **Mobile UX:** All features must work perfectly on mobile (44px targets, fast load)
2. **Coffee Accuracy:** Settings from `bulletproof-dialing-framework.md` only
3. **TDD:** Test-first for calculations and critical flows
4. **Svelte 5:** No Svelte 4 patterns (project uses runes exclusively)
5. **Simplicity:** Component state over complex state management

**Trade-offs we accept:**

- Code verbosity for clarity (explicit over clever)
- Some duplication over premature abstraction
- Slightly larger bundles for better mobile UX (e.g., better touch feedback)

---

## Confidence Threshold

Only flag issues you're **80% or more confident** about.

**Exceptions (95%+ required):**

- Security vulnerabilities
- Svelte 4 patterns (always block - project is Svelte 5 only)
- Coffee domain errors contradicting framework doc
- Mobile touch targets <44px

If uncertain:

- Phrase as question: "Could this cause...?"
- Suggest investigation: "Consider checking..."
- Don't block PR on speculation

---

## Review Tone

- **Constructive:** Explain WHY, not just WHAT
- **Specific:** Point to exact file:line
- **Actionable:** Suggest fix or alternative
- **Respectful:** Assume good intent

**Example:**
❌ "This is wrong"
✅ "In `src/lib/Wizard.svelte:23`, `export let step` uses Svelte 4 props pattern. This project requires Svelte 5 runes. Use `let { step }: Props = $props()` instead."

---

## Out of Scope

Do NOT review:

- [ ] Code formatting (prettier handles)
- [ ] Import ordering (oxlint handles)
- [ ] Type errors (TypeScript compiler handles)
- [ ] Personal style preferences
- [ ] Unrelated code (focus on PR changes)
- [ ] Future improvements (unless critical)

---

## Special Cases

**When PR is:**

- **Hotfix:** Focus only on correctness + coffee accuracy
- **Refactor:** Ensure behavior unchanged (tests prove it)
- **Dependency update:** Check breaking changes, test coverage
- **Coffee data update:** Verify against `bulletproof-dialing-framework.md`
- **Mobile UX:** Extra scrutiny on touch targets, viewport, performance

---

## Checklist Summary

Before approving PR, verify:

- [ ] No Svelte 4 patterns (must use Svelte 5 runes)
- [ ] Touch targets ≥44px
- [ ] Tests exist (TDD followed)
- [ ] Coffee settings from framework doc
- [ ] Error handling adequate
- [ ] Mobile-first approach
- [ ] No over-engineering
- [ ] Temperature in Celsius
- [ ] Ratios in 1:X format
- [ ] Changes match PR intent

---

## Additional Context

**See also:**

- `CLAUDE.md` - Full project guide
- `bulletproof-dialing-framework.md` - Coffee domain reference
- `README.md` - Project overview

**Key Resources:**

- [SvelteKit Docs](https://kit.svelte.dev/)
- [Svelte 5 Runes](https://svelte.dev/docs/svelte/what-are-runes)
- [Tailwind v4](https://tailwindcss.com/)
