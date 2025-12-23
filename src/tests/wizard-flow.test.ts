import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { get } from 'svelte/store';
import GuidePage from '../routes/guide/+page.svelte';
import { wizardStore } from '$lib/stores/wizard';

describe('Wizard Flow E2E', () => {
	const user = userEvent.setup();

	beforeEach(() => {
		wizardStore.reset();
	});

	it('completes full espresso workflow', async () => {
		render(GuidePage);

		// Step 0: Select brew method
		const espressoButton = screen.getByRole('button', { name: /espresso/i });
		await user.click(espressoButton);

		let state = get(wizardStore);
		expect(state.brewMethod).toBe('espresso');
		expect(state.currentStep).toBe(1);
	});

	it('completes full V60 workflow', async () => {
		render(GuidePage);

		await user.click(screen.getByRole('button', { name: /V60/i }));

		const state = get(wizardStore);
		expect(state.brewMethod).toBe('v60');
	});

	it('navigates back through wizard', async () => {
		render(GuidePage);

		// Go to step 1
		await user.click(screen.getByRole('button', { name: /espresso/i }));
		let state = get(wizardStore);
		expect(state.currentStep).toBe(1);

		// Go back to step 0
		wizardStore.prevStep();
		state = get(wizardStore);
		expect(state.currentStep).toBe(0);
	});

	it('shows progress throughout wizard', async () => {
		render(GuidePage);

		const progressBar = screen.getByRole('progressbar');
		expect(progressBar).toHaveAttribute('aria-valuenow', '0');

		await user.click(screen.getByRole('button', { name: /espresso/i }));
		let state = get(wizardStore);
		expect(state.currentStep).toBe(1);
	});

	it('selects brew method and advances step', async () => {
		render(GuidePage);

		await user.click(screen.getByRole('button', { name: /chemex/i }));

		const state = get(wizardStore);
		expect(state.brewMethod).toBe('chemex');
		expect(state.currentStep).toBe(1);
	});

	it('maintains brew method selection', async () => {
		render(GuidePage);

		await user.click(screen.getByRole('button', { name: /aeropress/i }));

		const state = get(wizardStore);
		expect(state.brewMethod).toBe('aeropress');
		expect(state.roastLevel).toBeNull();
		expect(state.grinder).toBeNull();
	});
});
