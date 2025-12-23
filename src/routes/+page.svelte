<script lang="ts">
	import * as m from '$lib/paraglide/messages';
</script>

<div class="flex min-h-screen flex-col items-center justify-center p-6 text-center">
	<h1 class="mb-4 text-4xl font-bold">{m.landing_title()}</h1>
	<p class="mb-8 text-lg text-gray-600">{m.landing_subtitle()}</p>
	<a
		href="/guide"
		class="rounded-lg bg-espresso px-8 py-4 text-lg font-semibold text-white hover:bg-espresso-dark"
	>
		{m.landing_start()}
	</a>
</div>
