<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { Coffee } from 'lucide-svelte';
</script>

<div
	class="flex min-h-dvh flex-col items-center justify-center bg-gradient-to-b from-background to-muted p-6 text-center"
>
	<!-- Coffee Icon with subtle animation -->
	<div class="mb-8 animate-pulse">
		<Coffee class="h-24 w-24 text-primary" strokeWidth={1.5} />
	</div>

	<!-- Hero Text -->
	<h1 class="mb-4 text-5xl font-bold tracking-tight sm:text-6xl">
		{m.landing_title()}
	</h1>
	<p class="mb-12 max-w-md text-lg text-muted-foreground sm:text-xl">
		{m.landing_subtitle()}
	</p>

	<!-- CTA Button - Touch optimized -->
	<a
		href="/guide"
		class="min-h-[56px] rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg transition-transform active:scale-95 sm:text-xl"
	>
		{m.landing_start()}
	</a>
</div>
