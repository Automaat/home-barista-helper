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

	let showTroubleshooting = $state(false);
</script>

<WizardContainer>
	{#if $wizardStore.currentStep === 0}
		<div class="animate-slide-up">
			<StepBrewMethod />
		</div>
	{:else if $wizardStore.currentStep === 1}
		<div class="animate-slide-up">
			<StepRoastLevel />
		</div>
	{:else if $wizardStore.currentStep === 2}
		<div class="animate-slide-up">
			<StepGrinder />
		</div>
	{:else if $wizardStore.currentStep === 3}
		<div class="relative animate-slide-up">
			<ResultsDisplay />
			<div class="fixed bottom-20 right-4 z-10">
				<Button
					onclick={() => (showTroubleshooting = true)}
					size="lg"
					class="min-h-[56px] min-w-[56px] gap-2 rounded-full shadow-lg transition-transform active:scale-[0.97]"
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
