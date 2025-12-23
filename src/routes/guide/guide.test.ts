import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import GuidePage from './+page.svelte';
import { wizardStore } from '$lib/stores/wizard';

describe('Guide Page', () => {
	const user = userEvent.setup();

	beforeEach(() => {
		wizardStore.reset();
	});

	it('renders wizard container', () => {
		render(GuidePage);
		expect(screen.getByRole('progressbar')).toBeInTheDocument();
	});

	it('displays StepBrewMethod at step 0', () => {
		wizardStore.reset();
		render(GuidePage);

		expect(screen.getByText(/Choose.*Method/i)).toBeInTheDocument();
	});

	it('displays StepRoastLevel at step 1', () => {
		wizardStore.nextStep();
		render(GuidePage);

		expect(screen.getByRole('heading', { name: /Select Roast Level/i })).toBeInTheDocument();
	});

	it('displays StepGrinder at step 2', () => {
		wizardStore.nextStep();
		wizardStore.nextStep();
		render(GuidePage);

		expect(screen.getByRole('heading', { name: /Choose Your Grinder/i })).toBeInTheDocument();
	});

	it('displays ResultsDisplay at step 3', () => {
		wizardStore.nextStep();
		wizardStore.nextStep();
		wizardStore.nextStep();
		render(GuidePage);

		expect(screen.getByRole('heading', { name: /Your Brew Recipe|No recipe/i })).toBeInTheDocument();
	});

	it('displays troubleshooting button at results step', () => {
		wizardStore.nextStep();
		wizardStore.nextStep();
		wizardStore.nextStep();
		render(GuidePage);

		expect(screen.getByRole('button', { name: /troubleshoot/i })).toBeInTheDocument();
	});

	it('opens troubleshooting modal when button clicked', async () => {
		wizardStore.nextStep();
		wizardStore.nextStep();
		wizardStore.nextStep();
		render(GuidePage);

		const troubleshootButton = screen.getByRole('button', { name: /troubleshoot/i });
		await user.click(troubleshootButton);

		expect(screen.getByRole('dialog')).toBeInTheDocument();
		expect(screen.getByText('Troubleshooting')).toBeInTheDocument();
	});

	it('closes troubleshooting modal on close', async () => {
		wizardStore.nextStep();
		wizardStore.nextStep();
		wizardStore.nextStep();
		render(GuidePage);

		const troubleshootButton = screen.getByRole('button', { name: /troubleshoot/i });
		await user.click(troubleshootButton);

		expect(screen.getByRole('dialog')).toBeInTheDocument();

		const closeButton = screen.getByRole('button', { name: 'Close' });
		await user.click(closeButton);

		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
	});

	it('troubleshoot button has help icon', () => {
		wizardStore.nextStep();
		wizardStore.nextStep();
		wizardStore.nextStep();
		render(GuidePage);

		const button = screen.getByRole('button', { name: /troubleshoot/i });
		expect(button.querySelector('svg')).toBeInTheDocument();
	});

	it('troubleshoot button has minimum size for mobile', () => {
		wizardStore.nextStep();
		wizardStore.nextStep();
		wizardStore.nextStep();
		render(GuidePage);

		const button = screen.getByRole('button', { name: /troubleshoot/i });
		expect(button).toHaveClass('min-h-[56px]');
		expect(button).toHaveClass('min-w-[56px]');
	});


	it('troubleshooting modal is closed by default', () => {
		render(GuidePage);
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
	});
});
