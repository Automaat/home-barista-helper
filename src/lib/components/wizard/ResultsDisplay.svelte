<script lang="ts">
	import { wizardStore } from '$lib/stores/wizard';
	import { getRecipe } from '$lib/data/recipes';
	import Button from '$lib/components/ui/button/button.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import { Settings2, Thermometer, Clock, Scale } from 'lucide-svelte';

	const state = $derived($wizardStore);
	const recipe = $derived(
		state.brewMethod && state.roastLevel && state.grinder
			? getRecipe(state.brewMethod, state.roastLevel, state.grinder.id)
			: null
	);

	const grindSetting = $derived(
		recipe?.grindSetting.find((gs) => gs.grinderId === state.grinder?.id) || recipe?.grindSetting[0]
	);
</script>

<div class="space-y-6 pb-24">
	<div class="space-y-2">
		<h1 class="text-2xl font-bold">Your Brew Recipe</h1>
		<p class="text-muted-foreground">
			{state.brewMethod} · {state.roastLevel} roast · {state.grinder?.name}
		</p>
	</div>

	{#if recipe}
		<!-- Key Parameters -->
		<div class="grid gap-4 sm:grid-cols-2">
			<Card class="p-4">
				<div class="flex items-center gap-3">
					<div class="rounded-full bg-primary/10 p-2">
						<Settings2 class="h-5 w-5 text-primary" />
					</div>
					<div>
						<p class="text-sm text-muted-foreground">Grind Setting</p>
						<p class="text-lg font-semibold">
							{grindSetting?.value}
							{#if grindSetting?.unit === 'clicks'}clicks{/if}
						</p>
					</div>
				</div>
			</Card>

			<Card class="p-4">
				<div class="flex items-center gap-3">
					<div class="rounded-full bg-primary/10 p-2">
						<Scale class="h-5 w-5 text-primary" />
					</div>
					<div>
						<p class="text-sm text-muted-foreground">Ratio</p>
						<p class="text-lg font-semibold">{recipe.ratio}</p>
					</div>
				</div>
			</Card>

			<Card class="p-4">
				<div class="flex items-center gap-3">
					<div class="rounded-full bg-primary/10 p-2">
						<Thermometer class="h-5 w-5 text-primary" />
					</div>
					<div>
						<p class="text-sm text-muted-foreground">Temperature</p>
						<p class="text-lg font-semibold">{recipe.temperature}</p>
					</div>
				</div>
			</Card>

			<Card class="p-4">
				<div class="flex items-center gap-3">
					<div class="rounded-full bg-primary/10 p-2">
						<Clock class="h-5 w-5 text-primary" />
					</div>
					<div>
						<p class="text-sm text-muted-foreground">Time</p>
						<p class="text-lg font-semibold">{recipe.time}</p>
					</div>
				</div>
			</Card>
		</div>

		<!-- Brewing Steps -->
		<Card class="p-6">
			<h2 class="mb-4 text-lg font-semibold">Brewing Steps</h2>
			<ol class="space-y-3">
				{#each recipe.steps as step, i}
					<li class="flex gap-3">
						<span
							class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
						>
							{i + 1}
						</span>
						<span class="pt-0.5">{step}</span>
					</li>
				{/each}
			</ol>
		</Card>

		{#if grindSetting?.notes}
			<Card class="border-amber-500/50 bg-amber-50 p-4 dark:bg-amber-950/20">
				<p class="text-sm">
					<strong class="text-amber-900 dark:text-amber-100">Note:</strong>
					<span class="text-amber-800 dark:text-amber-200">{grindSetting.notes}</span>
				</p>
			</Card>
		{/if}
	{:else}
		<Card class="p-8 text-center">
			<p class="text-muted-foreground">No recipe found for this combination</p>
		</Card>
	{/if}

	<!-- Fixed Bottom Actions -->
	<div class="fixed bottom-0 left-0 right-0 border-t bg-background p-4">
		<Button class="min-h-[48px] w-full text-base" onclick={() => (window.location.href = '/')}>
			Start Over
		</Button>
	</div>
</div>
