<script lang="ts">
	import { wizardStore } from '$lib/stores/wizard';
	import { grinders } from '$lib/data/grinders';
	import { Search } from 'lucide-svelte';
	import type { Grinder } from '$lib/types';

	let searchQuery = $state('');

	const filteredGrinders = $derived(
		grinders.filter(
			(g) =>
				g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				g.brand.toLowerCase().includes(searchQuery.toLowerCase())
		)
	);

	function selectGrinder(grinder: Grinder) {
		wizardStore.setGrinder(grinder);
	}
</script>

<div class="space-y-6">
	<div class="space-y-2">
		<h1 class="text-2xl font-bold">Choose Your Grinder</h1>
		<p class="text-muted-foreground">Select your coffee grinder</p>
	</div>

	<!-- Search Input -->
	<div class="relative">
		<Search class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
		<input
			type="text"
			bind:value={searchQuery}
			placeholder="Search grinders..."
			class="min-h-[44px] w-full rounded-lg border-2 border-border bg-card pl-10 pr-4 text-base outline-none ring-ring focus:border-primary focus:ring-2"
		/>
	</div>

	<!-- Grinder List -->
	<div class="space-y-2 overflow-y-auto" style="max-height: 60dvh;">
		{#each filteredGrinders as grinder (grinder.id)}
			<button
				onclick={() => selectGrinder(grinder)}
				class="min-h-[68px] w-full rounded-lg border-2 border-border bg-card p-4 text-left transition-all hover:border-primary hover:bg-accent active:scale-95"
				aria-label="Select {grinder.brand} {grinder.name}"
			>
				<div class="flex items-center justify-between">
					<div>
						<h3 class="font-semibold">{grinder.brand} {grinder.name}</h3>
						<p class="text-sm text-muted-foreground capitalize">
							{grinder.type}
							{#if grinder.variants}
								· {grinder.variants.join(', ')}
							{/if}
						</p>
					</div>
				</div>
			</button>
		{:else}
			<div class="py-8 text-center text-muted-foreground">
				No grinders found matching "{searchQuery}"
			</div>
		{/each}
	</div>
</div>
