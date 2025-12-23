<script lang="ts">
	import { wizardStore } from '$lib/stores/wizard';
	import Button from '$lib/components/ui/button/button.svelte';
	import { ChevronLeft } from 'lucide-svelte';

	interface Props {
		children: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	const state = $derived($wizardStore);
	const canGoBack = $derived(state.currentStep > 0);
	const progress = $derived((state.currentStep / 3) * 100);
</script>

<div class="flex min-h-dvh flex-col bg-background">
	<!-- Progress Bar -->
	<div class="w-full bg-muted">
		<div
			class="h-1 bg-primary transition-all duration-300"
			style="width: {progress}%"
			role="progressbar"
			aria-valuenow={state.currentStep}
			aria-valuemin={0}
			aria-valuemax={3}
		></div>
	</div>

	<!-- Header with Back Button -->
	<header class="flex items-center gap-4 p-4">
		{#if canGoBack}
			<Button
				variant="ghost"
				size="icon"
				class="min-h-[44px] min-w-[44px]"
				onclick={() => wizardStore.prevStep()}
				aria-label="Go back"
			>
				<ChevronLeft class="h-6 w-6" />
			</Button>
		{/if}
		<div class="flex-1">
			<p class="text-sm text-muted-foreground">
				{#if state.currentStep < 3}
					Step {state.currentStep + 1} of 3
				{:else}
					Results
				{/if}
			</p>
		</div>
	</header>

	<!-- Main Content -->
	<main class="flex-1 p-4">
		{@render children()}
	</main>
</div>
