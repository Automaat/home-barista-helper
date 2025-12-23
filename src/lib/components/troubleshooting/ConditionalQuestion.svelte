<script lang="ts">
	import type { TroubleshootingNode } from '$lib/types';

	interface Props {
		node: TroubleshootingNode;
		onAnswer: (answer: TroubleshootingNode['answers'][0]) => void;
	}

	let { node, onAnswer }: Props = $props();
</script>

<div class="space-y-6">
	<div class="space-y-2">
		<h2 class="text-xl font-bold">{node.question}</h2>
	</div>

	<div class="grid gap-3">
		{#each node.answers as answer}
			<button
				onclick={() => onAnswer(answer)}
				class="min-h-[80px] w-full rounded-lg border-2 border-border bg-card p-4 text-left transition-all hover:border-primary hover:bg-accent active:scale-95"
				aria-label={answer.label}
			>
				<div class="space-y-1">
					<p class="font-semibold">{answer.label}</p>
					{#if answer.solution}
						<p class="text-sm text-muted-foreground">{answer.solution}</p>
					{/if}
				</div>
			</button>
		{/each}
	</div>
</div>
