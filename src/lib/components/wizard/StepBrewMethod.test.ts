import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { get } from 'svelte/store';
import StepBrewMethod from './StepBrewMethod.svelte';
import { wizardStore } from '$lib/stores/wizard';

describe('StepBrewMethod', () => {
	beforeEach(() => {
		wizardStore.reset();
		vi.clearAllMocks();
	});

	it('renders all brew method options', () => {
		render(StepBrewMethod);
		expect(screen.getByText('Choose Your Brew Method')).toBeInTheDocument();
		expect(screen.getByLabelText('Select Espresso')).toBeInTheDocument();
		expect(screen.getByLabelText('Select Hario V60')).toBeInTheDocument();
		expect(screen.getByLabelText('Select Chemex')).toBeInTheDocument();
		expect(screen.getByLabelText('Select Aeropress')).toBeInTheDocument();
	});

	it('has touch-friendly buttons', () => {
		render(StepBrewMethod);
		const button = screen.getByLabelText('Select Espresso');
		expect(button).toHaveClass('min-h-[120px]');
	});

	it('updates store when method selected', async () => {
		const user = userEvent.setup();
		render(StepBrewMethod);

		const espressoBtn = screen.getByLabelText('Select Espresso');
		await user.click(espressoBtn);

		expect(get(wizardStore).brewMethod).toBe('espresso');
	});

	it('displays descriptive heading', () => {
		render(StepBrewMethod);
		expect(screen.getByText("Select how you'll be brewing your coffee")).toBeInTheDocument();
	});
});
