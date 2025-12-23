<script lang="ts">
	import { troubleshootingTree } from '$lib/data/troubleshooting';
	import ConditionalQuestion from './ConditionalQuestion.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import { X, ChevronLeft, CheckCircle2 } from 'lucide-svelte';
	import type { TroubleshootingNode } from '$lib/types';

	interface Props {
		open?: boolean;
		onClose?: () => void;
	}

	let { open = false, onClose }: Props = $props();

	let currentNodeId = $state('root');
	let solution = $state<string | null>(null);

	const currentNode = $derived(troubleshootingTree.find((n) => n.id === currentNodeId) || null);

	function handleAnswer(answer: TroubleshootingNode['answers'][0]) {
		if (answer.solution) {
			solution = answer.solution;
		} else if (answer.nextNode) {
			currentNodeId = answer.nextNode;
		}
	}

	function reset() {
		currentNodeId = 'root';
		solution = null;
	}

	function close() {
		reset();
		onClose?.();
	}
</script>

{#if open}
	<div
		class="animate-fade-in fixed inset-0 z-50 flex items-end bg-background/80 backdrop-blur-sm md:items-center md:justify-center"
		onclick={(e) => {
			if (e.target === e.currentTarget) close();
		}}
		onkeydown={(e) => {
			if (e.key === 'Escape') {
				e.preventDefault();
				close();
			}
		}}
		tabindex="-1"
		role="dialog"
		aria-modal="true"
		aria-labelledby="troubleshoot-title"
	>
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<!-- Modal content - stopPropagation prevents backdrop click from closing -->
		<div
			class="animate-slide-up max-h-dvh w-full overflow-y-auto rounded-t-2xl bg-background md:max-h-[85dvh] md:max-w-2xl md:rounded-2xl"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
			role="document"
		>
			<!-- Header -->
			<div class="sticky top-0 z-10 flex items-center justify-between border-b bg-background p-4">
				<h1 id="troubleshoot-title" class="text-lg font-semibold">Troubleshooting</h1>
				<Button
					variant="ghost"
					size="icon"
					class="min-h-[44px] min-w-[44px]"
					onclick={close}
					aria-label="Close"
				>
					<X class="h-5 w-5" />
				</Button>
			</div>

			<!-- Content -->
			<div class="p-6">
				{#if solution}
					<!-- Solution Display -->
					<Card class="animate-scale-in border-green-500/50 bg-green-50 p-6 dark:bg-green-950/20">
						<div class="flex gap-4">
							<CheckCircle2
								class="animate-success h-6 w-6 shrink-0 text-green-600 dark:text-green-400"
							/>
							<div class="flex-1 space-y-4">
								<div>
									<h3 class="font-semibold text-green-900 dark:text-green-100">
										Recommended Solution
									</h3>
									<p class="mt-2 text-green-800 dark:text-green-200">{solution}</p>
								</div>
								<Button onclick={reset} class="w-full transition-transform active:scale-[0.98]">
									Try Another Issue
								</Button>
							</div>
						</div>
					</Card>
				{:else if currentNode}
					<!-- Question Display -->
					<div class="space-y-4">
						{#if currentNodeId !== 'root'}
							<Button variant="ghost" onclick={reset} class="gap-2">
								<ChevronLeft class="h-4 w-4" />
								Start Over
							</Button>
						{/if}
						<ConditionalQuestion node={currentNode} onAnswer={handleAnswer} />
					</div>
				{:else}
					<p class="text-center text-muted-foreground">
						Something went wrong. Please restart the troubleshooting process.
					</p>
					{console.error('Troubleshooting node not found:', currentNodeId)}
				{/if}
			</div>
		</div>
	</div>
{/if}
