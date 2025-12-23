<script lang="ts">
	import Button from './button.svelte';
	import type { ButtonProps } from './button.svelte';

	interface Props extends ButtonProps {
		text?: string;
	}

	let { text = 'Test', ...props }: Props = $props();
</script>

<Button {...props}>
	{text}
</Button>
