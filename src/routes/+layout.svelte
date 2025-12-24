<script lang="ts">
	import '../app.css';
	import { afterNavigate } from '$app/navigation';
	import { browser } from '$app/environment';
	import { GA_MEASUREMENT_ID } from '$lib/config';

	// Load Google Analytics script on client
	if (browser && GA_MEASUREMENT_ID) {
		const script = document.createElement('script');
		script.async = true;
		script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
		document.head.appendChild(script);

		window.dataLayer = window.dataLayer || [];
		function gtag(...args: any[]) {
			window.dataLayer.push(args);
		}
		window.gtag = gtag;

		gtag('js', new Date());
		gtag('config', GA_MEASUREMENT_ID, {
			page_path: window.location.pathname,
			anonymize_ip: true
		});
	}

	// Track SPA navigation
	afterNavigate((navigation) => {
		if (
			browser &&
			GA_MEASUREMENT_ID &&
			typeof window.gtag !== 'undefined' &&
			navigation.to?.url.pathname
		) {
			window.gtag('config', GA_MEASUREMENT_ID, {
				page_path: navigation.to.url.pathname
			});
		}
	});
</script>

<slot />
