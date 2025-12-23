import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { get } from 'svelte/store';
import StepGrinder from './StepGrinder.svelte';
import { wizardStore } from '$lib/stores/wizard';

describe('StepGrinder', () => {
	const user = userEvent.setup();

	beforeEach(() => {
		wizardStore.reset();
	});

	it('renders grinder selection title', () => {
		render(StepGrinder);
		expect(screen.getByText('Choose Your Grinder')).toBeInTheDocument();
		expect(screen.getByText('Select your coffee grinder')).toBeInTheDocument();
	});

	it('displays search input with correct attributes', () => {
		render(StepGrinder);
		const searchInput = screen.getByPlaceholderText('Search grinders...');
		expect(searchInput).toBeInTheDocument();
		expect(searchInput).toHaveAttribute('type', 'text');
	});

	it('displays all grinders initially', () => {
		render(StepGrinder);
		const buttons = screen.getAllByRole('button', { name: /Select/ });
		expect(buttons.length).toBeGreaterThan(0);
	});

	it('filters grinders by name', async () => {
		render(StepGrinder);
		const searchInput = screen.getByPlaceholderText('Search grinders...');

		await user.type(searchInput, '078S');

		expect(screen.getByText(/Timemore.*078S/)).toBeInTheDocument();
		expect(screen.queryByText(/Comandante.*C40/)).not.toBeInTheDocument();
	});

	it('filters grinders by brand case-insensitive', async () => {
		render(StepGrinder);
		const searchInput = screen.getByPlaceholderText('Search grinders...');

		await user.type(searchInput, 'timemore');

		expect(screen.getByText(/Timemore.*078S/)).toBeInTheDocument();
		expect(screen.queryByText(/Comandante.*C40/)).not.toBeInTheDocument();
	});

	it('shows no results message when search has no matches', async () => {
		render(StepGrinder);
		const searchInput = screen.getByPlaceholderText('Search grinders...');

		await user.type(searchInput, 'nonexistent');

		expect(screen.getByText(/No grinders found matching "nonexistent"/)).toBeInTheDocument();
	});

	it('selects grinder and updates store on click', async () => {
		render(StepGrinder);
		const grinderButtons = screen.getAllByRole('button', { name: /Select/ });

		await user.click(grinderButtons[0]);

		const state = get(wizardStore);
		expect(state.grinder).toBeDefined();
		expect(state.grinder?.id).toBeTruthy();
	});

	it('displays grinder types', () => {
		render(StepGrinder);
		const grinderButtons = screen.getAllByRole('button', { name: /Select/ });

		expect(grinderButtons.length).toBeGreaterThan(0);
	});

	it('has minimum touch target size for mobile', () => {
		render(StepGrinder);
		const grinderButtons = screen.getAllByRole('button', { name: /Select/ });

		grinderButtons.forEach((button) => {
			expect(button).toHaveClass('min-h-[68px]');
		});
	});

	it('displays search icon', () => {
		render(StepGrinder);
		const searchInput = screen.getByPlaceholderText('Search grinders...');
		const container = searchInput.parentElement;

		expect(container?.querySelector('svg')).toBeInTheDocument();
	});

});
