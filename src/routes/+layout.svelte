<script lang="ts">
	import '../app.css';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';

	afterNavigate(() => {
		if (typeof gtag !== 'undefined') {
			gtag('config', 'G-3FQW6N7ZJE', {
				page_path: $page.url.pathname
			});
		}
	});
</script>

<slot />
