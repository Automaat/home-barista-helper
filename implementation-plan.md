# Home Barista Dialing Guide - Implementation Plan

## Overview

Static website for home baristas learning to dial in coffee. Mobile-first, icon-based, multilingual (EN/PL).

## Tech Stack

- **Framework**: SvelteKit (adapter-static)
- **Styling**: Tailwind CSS (mobile-first)
- **UI**: shadcn-svelte
- **Icons**: Lucide Icons + custom SVGs
- **Animations**: Svelte Motion
- **i18n**: paraglide-sveltekit
- **Linting**: oxlint (strict)
- **Tools**: mise
- **Hosting**: Cloudflare Pages

## Coffee Color Scheme

```
Primary: #3E2723, #4E342E (Espresso brown)
Secondary: #D7CCC8, #EFEBE9 (Cream/Latte)
Accent: #6D4C41 (Coffee bean)
Highlight: #D4A574 (Crema gold)
Background: #F5F5F5 (Light cream)
Text: #1B0000 (Dark roast)
```

## Mobile-First Principles

- Design for 375px (iPhone SE) first
- Touch targets min 44px
- Single column on mobile
- Large tappable cards
- Bottom navigation
- Swipe gestures
- Progressive enhancement for desktop

---

## Phase 1: Project Setup

### 1.1 Initialize Project

```bash
npm create svelte@latest home-barista-helper
cd home-barista-helper
# Select: Skeleton project, TypeScript, ESLint, Prettier
```

### 1.2 Setup mise

Create `.mise.toml`:

```toml
[tools]
node = "22"
pnpm = "latest"

[tasks.dev]
run = "pnpm dev"

[tasks.build]
run = "pnpm build"

[tasks.lint]
run = "oxlint ."

[tasks.format]
run = "pnpm format"

[tasks.check]
run = "pnpm check"

[tasks.preview]
run = "pnpm preview"
```

### 1.3 Install Dependencies

```bash
mise install
pnpm install

# Core dependencies
pnpm add -D tailwindcss postcss autoprefixer
pnpm add -D @sveltejs/adapter-static
pnpm add lucide-svelte
pnpm add svelte-motion

# UI components
npx shadcn-svelte@latest init

# i18n
pnpm add -D @inlang/paraglide-sveltekit

# Linting
pnpm add -D oxlint
```

### 1.4 Configure Tailwind

`tailwind.config.js`:

```js
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				espresso: { DEFAULT: '#3E2723', dark: '#4E342E' },
				cream: { DEFAULT: '#D7CCC8', light: '#EFEBE9' },
				bean: '#6D4C41',
				crema: '#D4A574'
			}
		},
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1024px'
		}
	}
};
```

### 1.5 Configure oxlint

`oxlint.json`:

```json
{
	"rules": {
		"correctness": "error",
		"suspicious": "error",
		"perf": "warn"
	}
}
```

### 1.6 Configure SvelteKit

`svelte.config.js`:

```js
import adapter from '@sveltejs/adapter-static';

export default {
	kit: {
		adapter: adapter()
	}
};
```

---

## Phase 2: Data Structure

### 2.1 Create Type Definitions

`src/lib/types.ts`:

```typescript
export type RoastLevel = 'light' | 'medium' | 'dark';
export type BrewMethod = 'espresso' | 'v60' | 'chemex' | 'aeropress';

export interface Grinder {
	id: string;
	name: string;
	brand: string;
	type: 'manual' | 'electric';
	variants?: string[];
}

export interface GrindSetting {
	grinderId: string;
	value: string;
	unit: 'clicks' | 'setting' | 'microns';
	notes?: string;
}

export interface BrewRecipe {
	brewMethod: BrewMethod;
	roastLevel: RoastLevel;
	grindSetting: GrindSetting[];
	ratio: string;
	temperature: string;
	time: string;
	steps: string[];
}

export interface TroubleshootingNode {
	id: string;
	question: string;
	answers: {
		label: string;
		nextNode?: string;
		solution?: string;
		adjustment?: string;
	}[];
}
```

### 2.2 Grinder Database

`src/lib/data/grinders.ts`:

```typescript
export const grinders: Grinder[] = [
	// Timemore
	{ id: 'timemore-078s', name: 'Sculptor 078S', brand: 'Timemore', type: 'electric' },
	{ id: 'timemore-064', name: 'Sculptor 064', brand: 'Timemore', type: 'electric' },

	// Commandante
	{
		id: 'commandante-c40-std',
		name: 'C40 MK4',
		brand: 'Commandante',
		type: 'manual',
		variants: ['Standard Axle']
	},
	{
		id: 'commandante-c40-red',
		name: 'C40 MK4',
		brand: 'Commandante',
		type: 'manual',
		variants: ['Red Clix']
	},

	// Baratza
	{ id: 'baratza-encore', name: 'Encore', brand: 'Baratza', type: 'electric' },
	{ id: 'baratza-virtuoso', name: 'Virtuoso+', brand: 'Baratza', type: 'electric' },

	// 1Zpresso
	{ id: '1zpresso-jx', name: 'JX', brand: '1Zpresso', type: 'manual' },
	{ id: '1zpresso-jx-pro', name: 'JX-Pro', brand: '1Zpresso', type: 'manual' },
	{ id: '1zpresso-k-plus', name: 'K-Plus', brand: '1Zpresso', type: 'manual' },
	{ id: '1zpresso-k-max', name: 'K-Max', brand: '1Zpresso', type: 'manual' },

	// Fellow
	{ id: 'fellow-ode-gen2', name: 'Ode Gen 2', brand: 'Fellow', type: 'electric' },

	// Wilfa
	{ id: 'wilfa-svart', name: 'Svart', brand: 'Wilfa', type: 'electric' },
	{ id: 'wilfa-uniform', name: 'Uniform', brand: 'Wilfa', type: 'electric' }
];
```

### 2.3 Recipe Database

`src/lib/data/recipes.ts`:
Transform bulletproof-dialing-framework.md data into structured recipes.

### 2.4 Troubleshooting Tree

`src/lib/data/troubleshooting.ts`:
Create conditional decision tree from framework.

---

## Phase 3: Core Components

### 3.1 Wizard Store

`src/lib/stores/wizard.ts`:

```typescript
import { writable } from 'svelte/store';

export const wizardState = writable({
	brewMethod: null,
	roastLevel: null,
	grinder: null,
	currentStep: 0
});
```

### 3.2 Wizard Container

`src/lib/components/wizard/WizardContainer.svelte`:

- Progress indicator
- Step navigation
- Back button
- State management

### 3.3 Step Components

Create for each step:

- `StepBrewMethod.svelte` - 4 large cards (Espresso/V60/Chemex/Aeropress)
- `StepRoastLevel.svelte` - 3 large cards (Light/Medium/Dark)
- `StepGrinder.svelte` - Search + scrollable list
- `ResultsDisplay.svelte` - Expandable sections + fixed bottom button

### 3.4 Troubleshooting Components

- `TroubleshootingTree.svelte` - Full-screen modal
- `ConditionalQuestion.svelte` - Large buttons for answers

---

## Phase 4: i18n Setup

### 4.1 Configure Paraglide

```bash
pnpm dlx @inlang/paraglide-js init
```

### 4.2 Translation Files

`src/lib/i18n/en.json`:

```json
{
	"landing.title": "Dial In Your Perfect Cup",
	"landing.start": "Start Guide",
	"brewMethod.title": "Choose Your Brew Method",
	"brewMethod.espresso": "Espresso",
	"brewMethod.v60": "Hario V60",
	"roast.title": "Select Roast Level",
	"roast.light": "Light Roast",
	"grinder.title": "Choose Your Grinder",
	"results.grind": "Grind Setting",
	"troubleshoot.button": "Troubleshoot"
}
```

`src/lib/i18n/pl.json`:

```json
{
	"landing.title": "Idealnie Zaparzona Kawa",
	"landing.start": "Rozpocznij",
	"brewMethod.title": "Wybierz Metodę Parzenia",
	"brewMethod.espresso": "Espresso",
	"brewMethod.v60": "Hario V60",
	"roast.title": "Wybierz Stopień Palenia",
	"roast.light": "Jasne Palenie",
	"grinder.title": "Wybierz Młynek",
	"results.grind": "Ustawienie Mielenia",
	"troubleshoot.button": "Rozwiązywanie Problemów"
}
```

### 4.3 Language Routing

Setup routes: `src/routes/[lang]/`

---

## Phase 5: UI Implementation

### 5.1 Landing Page

`src/routes/[lang]/+page.svelte`:

- Full-screen hero
- Large start button
- Language toggle
- Coffee-themed animation

### 5.2 Wizard Page

`src/routes/[lang]/guide/+page.svelte`:

- Integrate WizardContainer
- Load steps dynamically
- Progress tracking
- Back navigation

### 5.3 Mobile Styles

Mobile-first CSS:

```css
/* Default = mobile */
.card {
	@apply w-full p-6 mb-4;
}

/* Desktop enhancements */
@screen md {
	.card {
		@apply w-1/2;
	}
}
```

### 5.4 Touch Optimizations

- 44px minimum touch targets
- :active states (not :hover)
- Fast tap response
- Prevent double-tap zoom

---

## Phase 6: Icons & Graphics

### 6.1 Lucide Icons

Import from `lucide-svelte`:

- Coffee cup (espresso)
- Droplet (pour-over)
- Circle variations (roast levels)
- Gauge (adjustments)

### 6.2 Custom SVGs

Create for:

- V60 cone silhouette
- Chemex silhouette
- Aeropress silhouette
- Coffee beans (3 shades)

Store in: `static/icons/`

---

## Phase 7: Animations

### 7.1 Page Transitions

```svelte
<script>
	import { Motion } from 'svelte-motion';
</script>

<Motion
	initial={{ opacity: 0, y: 20 }}
	animate={{ opacity: 1, y: 0 }}
	transition={{ duration: 0.3 }}
>
	<!-- content -->
</Motion>
```

### 7.2 Interactive Feedback

- Card tap animations
- Button press feedback
- Loading states
- Success animations

---

## Phase 8: Deployment

### 8.1 Build Configuration

```bash
mise run build
mise run preview  # Test locally
```

### 8.2 GitHub Setup

```bash
git init
git add .
git commit -s -S -m "Initial commit: Home barista dialing guide"
gh repo create home-barista-helper --public --source=. --remote=origin
git push -u origin main
```

### 8.3 Cloudflare Pages

1. Login to Cloudflare Dashboard
2. Pages → Create Project
3. Connect GitHub repo
4. Build settings:
   - Build command: `pnpm build`
   - Build output: `build`
5. Deploy

---

## Phase 9: Testing & Polish

### 9.1 Mobile Testing

- Test on real devices (iOS/Android)
- Chrome DevTools mobile emulation
- Safari iOS simulator
- Touch target sizes
- Loading performance

### 9.2 Cross-browser

- Chrome, Firefox, Safari, Edge
- Mobile Safari, Chrome Mobile

### 9.3 Accessibility

- Keyboard navigation
- Screen reader testing
- Color contrast
- Focus indicators

### 9.4 Performance

- Lighthouse audit (target: 90+)
- Core Web Vitals
- Bundle size optimization

---

## Implementation Checklist

### Setup

- [ ] Initialize SvelteKit project
- [ ] Configure mise (.mise.toml)
- [ ] Install all dependencies
- [ ] Configure Tailwind (mobile-first)
- [ ] Setup oxlint (strict config)
- [ ] Configure adapter-static
- [ ] Setup paraglide-sveltekit

### Data

- [ ] Create type definitions
- [ ] Build grinder database
- [ ] Transform recipe data from framework
- [ ] Create troubleshooting tree
- [ ] Validate all data structures

### Components

- [ ] Wizard store (state management)
- [ ] WizardContainer component
- [ ] StepBrewMethod component
- [ ] StepRoastLevel component
- [ ] StepGrinder component
- [ ] ResultsDisplay component
- [ ] TroubleshootingTree component
- [ ] ConditionalQuestion component

### i18n

- [ ] Configure paraglide
- [ ] Create en.json (all strings)
- [ ] Create pl.json (full translation)
- [ ] Setup language routing
- [ ] Language selector component
- [ ] localStorage persistence

### Pages

- [ ] Landing page ([lang]/+page.svelte)
- [ ] Wizard page ([lang]/guide/+page.svelte)
- [ ] Troubleshoot page ([lang]/troubleshoot/+page.svelte)
- [ ] 404 page

### Styling

- [ ] Mobile-first base styles
- [ ] Coffee color scheme
- [ ] Touch-optimized components
- [ ] Desktop enhancements
- [ ] Dark mode (optional)

### Icons

- [ ] Import Lucide icons
- [ ] Create custom brew method SVGs
- [ ] Create roast level icons
- [ ] Optimize all SVGs

### Animations

- [ ] Page transitions
- [ ] Card interactions
- [ ] Button feedback
- [ ] Loading states
- [ ] Success states

### Deployment

- [ ] Build production bundle
- [ ] Test preview locally
- [ ] Create GitHub repo
- [ ] Connect Cloudflare Pages
- [ ] Configure build settings
- [ ] Deploy to production
- [ ] Verify live site

### Testing

- [ ] Mobile device testing
- [ ] Cross-browser testing
- [ ] Accessibility audit
- [ ] Lighthouse performance
- [ ] i18n switching works
- [ ] All user flows work

### Polish

- [ ] Copy review (EN/PL)
- [ ] Fix any linter errors
- [ ] Optimize bundle size
- [ ] Add meta tags (SEO)
- [ ] Favicon + app icons
- [ ] README documentation

---

## Success Criteria

- ✅ Loads < 2s on 3G
- ✅ Works on all major mobile browsers
- ✅ Lighthouse score > 90
- ✅ All touch targets ≥ 44px
- ✅ Both languages work perfectly
- ✅ No oxlint errors
- ✅ Mobile-first, progressively enhanced
- ✅ Icons only (no images)
- ✅ Beautiful coffee-themed design

---

## Notes

- Focus on mobile experience first
- Keep it simple and fast
- Icons over images
- Test on real devices early
- Deploy early, iterate often
