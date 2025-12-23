<script lang="ts">
	import { wizardStore } from '$lib/stores/wizard';
	import Card from '$lib/components/ui/card/card.svelte';
	import { Coffee, Droplet } from 'lucide-svelte';
	import type { BrewMethod } from '$lib/types';

	const methods: Array<{ value: BrewMethod; label: string; icon: typeof Coffee }> = [
		{ value: 'espresso', label: 'Espresso', icon: Coffee },
		{ value: 'v60', label: 'Hario V60', icon: Droplet },
		{ value: 'chemex', label: 'Chemex', icon: Droplet },
		{ value: 'aeropress', label: 'Aeropress', icon: Coffee }
	];

	function selectMethod(method: BrewMethod) {
		wizardStore.setBrewMethod(method);
	}
</script>

<div class="space-y-6">
	<div class="space-y-2">
		<h1 class="text-2xl font-bold">Choose Your Brew Method</h1>
		<p class="text-muted-foreground">Select how you'll be brewing your coffee</p>
	</div>

	<div class="grid gap-4 md:grid-cols-2">
		{#each methods as method}
			<button
				onclick={() => selectMethod(method.value)}
				class="min-h-[120px] w-full rounded-lg border-2 border-border bg-card p-6 text-left transition-all hover:border-primary hover:bg-accent active:scale-[0.97] md:min-h-[140px]"
				aria-label="Select {method.label}"
			>
				<div class="flex items-center gap-4">
					<div class="rounded-full bg-primary/10 p-3">
						<svelte:component this={method.icon} class="h-8 w-8 text-primary" />
					</div>
					<h2 class="text-xl font-semibold">{method.label}</h2>
				</div>
			</button>
		{/each}
	</div>
</div>
