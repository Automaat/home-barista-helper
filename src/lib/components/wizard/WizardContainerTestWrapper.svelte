<script lang="ts">
	import WizardContainer from './WizardContainer.svelte';

	let { testContent = 'Test' } = $props();
</script>

<WizardContainer>
	{testContent}
</WizardContainer>
