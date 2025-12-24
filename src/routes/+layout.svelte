<script lang="ts">
	import '../app.css';
	import { afterNavigate } from '$app/navigation';
	import { browser } from '$app/environment';
	import { PUBLIC_GA_MEASUREMENT_ID } from '$env/static/public';

	// Load Google Analytics script on client
	if (browser && PUBLIC_GA_MEASUREMENT_ID) {
		const script = document.createElement('script');
		script.async = true;
		script.src = `https://www.googletagmanager.com/gtag/js?id=${PUBLIC_GA_MEASUREMENT_ID}`;
		document.head.appendChild(script);

		window.dataLayer = window.dataLayer || [];
		function gtag(...args: any[]) {
			window.dataLayer.push(args);
		}
		window.gtag = gtag;

		gtag('js', new Date());
		gtag('config', PUBLIC_GA_MEASUREMENT_ID, {
			page_path: window.location.pathname,
			anonymize_ip: true
		});
	}

	// Track SPA navigation
	afterNavigate((navigation) => {
		if (typeof gtag !== 'undefined' && navigation.to?.url.pathname) {
			gtag('config', PUBLIC_GA_MEASUREMENT_ID, {
				page_path: navigation.to.url.pathname
			});
		}
	});
</script>

<slot />
