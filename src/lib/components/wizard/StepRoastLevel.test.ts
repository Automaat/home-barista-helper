import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { get } from 'svelte/store';
import StepRoastLevel from './StepRoastLevel.svelte';
import { wizardStore } from '$lib/stores/wizard';

describe('StepRoastLevel', () => {
	const user = userEvent.setup();

	beforeEach(() => {
		wizardStore.reset();
	});

	it('renders roast level selection title', () => {
		render(StepRoastLevel);
		expect(screen.getByText('Select Roast Level')).toBeInTheDocument();
		expect(screen.getByText('What roast level is your coffee?')).toBeInTheDocument();
	});

	it('displays all three roast levels', () => {
		render(StepRoastLevel);
		expect(screen.getByText('Light Roast')).toBeInTheDocument();
		expect(screen.getByText('Medium Roast')).toBeInTheDocument();
		expect(screen.getByText('Dark Roast')).toBeInTheDocument();
	});

	it('displays roast level descriptions', () => {
		render(StepRoastLevel);
		expect(screen.getByText('Bright, acidic, fruity notes')).toBeInTheDocument();
		expect(screen.getByText('Balanced, sweet, smooth')).toBeInTheDocument();
		expect(screen.getByText('Bold, bitter, chocolatey')).toBeInTheDocument();
	});

	it('selects light roast and updates store', async () => {
		render(StepRoastLevel);
		const lightButton = screen.getByRole('button', { name: /Select Light Roast/ });

		await user.click(lightButton);

		const state = get(wizardStore);
		expect(state.roastLevel).toBe('light');
	});

	it('selects medium roast and updates store', async () => {
		render(StepRoastLevel);
		const mediumButton = screen.getByRole('button', { name: /Select Medium Roast/ });

		await user.click(mediumButton);

		const state = get(wizardStore);
		expect(state.roastLevel).toBe('medium');
	});

	it('selects dark roast and updates store', async () => {
		render(StepRoastLevel);
		const darkButton = screen.getByRole('button', { name: /Select Dark Roast/ });

		await user.click(darkButton);

		const state = get(wizardStore);
		expect(state.roastLevel).toBe('dark');
	});

	it('has minimum touch target size for mobile', () => {
		render(StepRoastLevel);
		const roastButtons = screen.getAllByRole('button', { name: /Select/ });

		roastButtons.forEach((button) => {
			expect(button).toHaveClass('min-h-[100px]');
		});
	});

	it('displays icons for each roast level', () => {
		render(StepRoastLevel);
		const buttons = screen.getAllByRole('button');

		buttons.forEach((button) => {
			expect(button.querySelector('svg')).toBeInTheDocument();
		});
	});

	it('has accessible aria labels', () => {
		render(StepRoastLevel);
		expect(screen.getByRole('button', { name: 'Select Light Roast' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Select Medium Roast' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Select Dark Roast' })).toBeInTheDocument();
	});

	it('renders buttons in correct order', () => {
		render(StepRoastLevel);
		const buttons = screen.getAllByRole('button');

		expect(buttons[0]).toHaveTextContent('Light Roast');
		expect(buttons[1]).toHaveTextContent('Medium Roast');
		expect(buttons[2]).toHaveTextContent('Dark Roast');
	});
});
