<script lang="ts">
	import { wizardStore } from '$lib/stores/wizard';
	import { Circle } from 'lucide-svelte';
	import type { RoastLevel } from '$lib/types';

	const roasts: Array<{
		value: RoastLevel;
		label: string;
		description: string;
		color: string;
	}> = [
		{
			value: 'light',
			label: 'Light Roast',
			description: 'Bright, acidic, fruity notes',
			color: 'text-amber-600'
		},
		{
			value: 'medium',
			label: 'Medium Roast',
			description: 'Balanced, sweet, smooth',
			color: 'text-amber-800'
		},
		{
			value: 'dark',
			label: 'Dark Roast',
			description: 'Bold, bitter, chocolatey',
			color: 'text-amber-950'
		}
	];

	function selectRoast(roast: RoastLevel) {
		wizardStore.setRoastLevel(roast);
	}
</script>

<div class="space-y-6">
	<div class="space-y-2">
		<h1 class="text-2xl font-bold">Select Roast Level</h1>
		<p class="text-muted-foreground">What roast level is your coffee?</p>
	</div>

	<div class="grid gap-4">
		{#each roasts as roast}
			<button
				onclick={() => selectRoast(roast.value)}
				class="min-h-[100px] w-full rounded-lg border-2 border-border bg-card p-6 text-left transition-all hover:border-primary hover:bg-accent active:scale-[0.97]"
				aria-label="Select {roast.label}"
			>
				<div class="flex items-center gap-4">
					<Circle
						class="h-12 w-12 fill-current transition-transform active:scale-90 {roast.color}"
					/>
					<div class="flex-1">
						<h2 class="text-xl font-semibold">{roast.label}</h2>
						<p class="text-sm text-muted-foreground">{roast.description}</p>
					</div>
				</div>
			</button>
		{/each}
	</div>
</div>
