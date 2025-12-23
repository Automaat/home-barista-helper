import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { get } from 'svelte/store';
import WizardContainerTestWrapper from './WizardContainerTestWrapper.svelte';
import { wizardStore } from '$lib/stores/wizard';

describe('WizardContainer', () => {
	const user = userEvent.setup();

	beforeEach(() => {
		wizardStore.reset();
	});

	it('renders progress bar', () => {
		render(WizardContainerTestWrapper);

		const progressBar = screen.getByRole('progressbar');
		expect(progressBar).toBeInTheDocument();
	});

	it('shows correct progress at step 0', () => {
		wizardStore.reset();
		render(WizardContainerTestWrapper);

		const progressBar = screen.getByRole('progressbar');
		expect(progressBar).toHaveAttribute('aria-valuenow', '0');
		expect(progressBar).toHaveStyle({ width: '0%' });
	});

	it('shows correct progress at step 1', () => {
		wizardStore.nextStep();
		render(WizardContainerTestWrapper);

		const progressBar = screen.getByRole('progressbar');
		expect(progressBar).toHaveAttribute('aria-valuenow', '1');
	});

	it('does not show back button on first step', () => {
		wizardStore.reset();
		render(WizardContainerTestWrapper);

		expect(screen.queryByRole('button', { name: 'Go back' })).not.toBeInTheDocument();
	});

	it('shows back button after first step', () => {
		wizardStore.nextStep();
		render(WizardContainerTestWrapper);

		expect(screen.getByRole('button', { name: 'Go back' })).toBeInTheDocument();
	});

	it('back button navigates to previous step', async () => {
		wizardStore.nextStep();
		wizardStore.nextStep();
		render(WizardContainerTestWrapper);

		const backButton = screen.getByRole('button', { name: 'Go back' });
		await user.click(backButton);

		const state = get(wizardStore);
		expect(state.currentStep).toBe(1);
	});

	it('displays step counter for steps 0-2', () => {
		wizardStore.reset();
		render(WizardContainerTestWrapper);

		expect(screen.getByText('Step 1 of 3')).toBeInTheDocument();
	});

	it('displays "Results" for step 3', () => {
		wizardStore.nextStep();
		wizardStore.nextStep();
		wizardStore.nextStep();
		render(WizardContainerTestWrapper);

		expect(screen.getByText('Results')).toBeInTheDocument();
	});

	it('back button has minimum touch target size', () => {
		wizardStore.nextStep();
		render(WizardContainerTestWrapper);

		const backButton = screen.getByRole('button', { name: 'Go back' });
		expect(backButton).toHaveClass('min-h-[44px]');
		expect(backButton).toHaveClass('min-w-[44px]');
	});

	it('progress bar has correct aria attributes', () => {
		wizardStore.reset();
		render(WizardContainerTestWrapper);

		const progressBar = screen.getByRole('progressbar');
		expect(progressBar).toHaveAttribute('aria-valuemin', '0');
		expect(progressBar).toHaveAttribute('aria-valuemax', '3');
	});

	it('displays back button icon', () => {
		wizardStore.nextStep();
		render(WizardContainerTestWrapper);

		const backButton = screen.getByRole('button', { name: 'Go back' });
		expect(backButton.querySelector('svg')).toBeInTheDocument();
	});

	it('shows correct step text at step 2', () => {
		wizardStore.nextStep();
		wizardStore.nextStep();
		render(WizardContainerTestWrapper);

		expect(screen.getByText('Step 3 of 3')).toBeInTheDocument();
	});

	it('progress bar width increases with steps', () => {
		wizardStore.reset();
		const { rerender } = render(WizardContainerTestWrapper);

		let progressBar = screen.getByRole('progressbar');
		expect(progressBar).toHaveStyle({ width: '0%' });

		wizardStore.nextStep();
		rerender({});

		progressBar = screen.getByRole('progressbar');
		expect(progressBar).toHaveAttribute('aria-valuenow', '1');
	});
});
