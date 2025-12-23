<script lang="ts">
	import { wizardStore } from '$lib/stores/wizard';
	import WizardContainer from '$lib/components/wizard/WizardContainer.svelte';
	import StepBrewMethod from '$lib/components/wizard/StepBrewMethod.svelte';
	import StepRoastLevel from '$lib/components/wizard/StepRoastLevel.svelte';
	import StepGrinder from '$lib/components/wizard/StepGrinder.svelte';
	import ResultsDisplay from '$lib/components/wizard/ResultsDisplay.svelte';
	import TroubleshootingTree from '$lib/components/troubleshooting/TroubleshootingTree.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { HelpCircle } from 'lucide-svelte';
	import { onMount } from 'svelte';

	const state = $derived($wizardStore);
	let showTroubleshooting = $state(false);

	onMount(() => {
		wizardStore.reset();
	});
</script>

<WizardContainer>
	{#if state.currentStep === 0}
		<StepBrewMethod />
	{:else if state.currentStep === 1}
		<StepRoastLevel />
	{:else if state.currentStep === 2}
		<StepGrinder />
	{:else if state.currentStep === 3}
		<div class="relative">
			<ResultsDisplay />
			<div class="fixed bottom-20 right-4 z-10">
				<Button
					onclick={() => (showTroubleshooting = true)}
					size="lg"
					class="min-h-[56px] min-w-[56px] gap-2 rounded-full shadow-lg"
					aria-label="Open troubleshooting"
				>
					<HelpCircle class="h-6 w-6" />
					<span class="hidden sm:inline">Troubleshoot</span>
				</Button>
			</div>
		</div>
	{/if}
</WizardContainer>

<TroubleshootingTree open={showTroubleshooting} onClose={() => (showTroubleshooting = false)} />
