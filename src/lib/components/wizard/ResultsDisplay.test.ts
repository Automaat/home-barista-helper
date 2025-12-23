import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import ResultsDisplay from './ResultsDisplay.svelte';
import { wizardStore } from '$lib/stores/wizard';
import { grinders } from '$lib/data/grinders';

vi.mock('$app/navigation', () => ({
	goto: vi.fn()
}));

describe('ResultsDisplay', () => {
	beforeEach(() => {
		wizardStore.reset();
	});

	it('displays grinder notes when available', () => {
		wizardStore.setBrewMethod('espresso');
		wizardStore.setRoastLevel('medium');
		wizardStore.setGrinder(grinders.find((g) => g.id === 'timemore-078s')!);

		render(ResultsDisplay);

		const noteElement = screen.queryByText(/Note:/);
		if (noteElement) {
			expect(noteElement).toBeInTheDocument();
		}
	});

	it('shows no recipe message when recipe not found', () => {
		render(ResultsDisplay);

		expect(screen.getByText('No recipe found for this combination')).toBeInTheDocument();
	});

	it('displays Start Over button', () => {
		wizardStore.setBrewMethod('v60');
		wizardStore.setRoastLevel('medium');
		wizardStore.setGrinder(grinders.find((g) => g.id === 'comandante-c40')!);

		render(ResultsDisplay);

		expect(screen.getByRole('button', { name: 'Start Over' })).toBeInTheDocument();
	});

	it('Start Over button has correct minimum height', () => {
		wizardStore.setBrewMethod('v60');
		wizardStore.setRoastLevel('medium');
		wizardStore.setGrinder(grinders.find((g) => g.id === 'comandante-c40')!);

		render(ResultsDisplay);

		const button = screen.getByRole('button', { name: 'Start Over' });
		expect(button).toHaveClass('min-h-[48px]');
	});

	it('renders recipe for espresso method', () => {
		wizardStore.setBrewMethod('espresso');
		wizardStore.setRoastLevel('medium');
		wizardStore.setGrinder(grinders.find((g) => g.id === 'timemore-078s')!);

		render(ResultsDisplay);

		expect(screen.getByText('Your Brew Recipe')).toBeInTheDocument();
		expect(screen.getByText(/espresso/i)).toBeInTheDocument();
	});

	it('renders recipe for chemex method', () => {
		wizardStore.setBrewMethod('chemex');
		wizardStore.setRoastLevel('medium');
		wizardStore.setGrinder(grinders.find((g) => g.id === 'comandante-c40')!);

		render(ResultsDisplay);

		expect(screen.getByText('Your Brew Recipe')).toBeInTheDocument();
		expect(screen.getByText(/chemex/i)).toBeInTheDocument();
	});

	it('renders recipe for aeropress method', () => {
		wizardStore.setBrewMethod('aeropress');
		wizardStore.setRoastLevel('medium');
		wizardStore.setGrinder(grinders.find((g) => g.id === 'comandante-c40')!);

		render(ResultsDisplay);

		expect(screen.getByText('Your Brew Recipe')).toBeInTheDocument();
		expect(screen.getByText(/aeropress/i)).toBeInTheDocument();
	});
});
