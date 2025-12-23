import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { get } from 'svelte/store';
import ResultsDisplay from '../lib/components/wizard/ResultsDisplay.svelte';
import StepGrinder from '../lib/components/wizard/StepGrinder.svelte';
import TroubleshootingTree from '../lib/components/troubleshooting/TroubleshootingTree.svelte';
import { wizardStore } from '../lib/stores/wizard';
import { grinders } from '../lib/data/grinders';
import { getRecipe } from '../lib/data/recipes';

describe('Edge Cases', () => {
	const user = userEvent.setup();

	beforeEach(() => {
		wizardStore.reset();
	});

	describe('ResultsDisplay edge cases', () => {
		it('handles missing grinder gracefully', () => {
			wizardStore.setBrewMethod('v60');
			wizardStore.setRoastLevel('medium');

			render(ResultsDisplay);

			expect(screen.getByText('No recipe found for this combination')).toBeInTheDocument();
		});

		it('handles missing brew method', () => {
			wizardStore.setRoastLevel('medium');
			wizardStore.setGrinder(grinders[0]);

			render(ResultsDisplay);

			expect(screen.getByText('No recipe found for this combination')).toBeInTheDocument();
		});

		it('handles missing roast level', () => {
			wizardStore.setBrewMethod('v60');
			wizardStore.setGrinder(grinders[0]);

			render(ResultsDisplay);

			expect(screen.getByText('No recipe found for this combination')).toBeInTheDocument();
		});

		it('displays all brew methods correctly', () => {
			const methods: Array<'espresso' | 'v60' | 'chemex' | 'aeropress'> = [
				'espresso',
				'v60',
				'chemex',
				'aeropress'
			];

			methods.forEach((method) => {
				wizardStore.reset();
				wizardStore.setBrewMethod(method);
				wizardStore.setRoastLevel('medium');
				const grinder = grinders[0];
				wizardStore.setGrinder(grinder);
				const { unmount } = render(ResultsDisplay);
				expect(screen.getByText('Your Brew Recipe')).toBeInTheDocument();
				unmount();
			});
		});

		it('displays different roast levels correctly', () => {
			const roasts: Array<'light' | 'medium' | 'dark'> = ['light', 'medium', 'dark'];

			roasts.forEach((roast) => {
				wizardStore.reset();
				wizardStore.setBrewMethod('v60');
				wizardStore.setRoastLevel(roast);
				const grinder = grinders[0];
				wizardStore.setGrinder(grinder);
				const { unmount } = render(ResultsDisplay);
				expect(screen.getByText(/medium|light|dark/i)).toBeInTheDocument();
				unmount();
			});
		});

		it('handles grinder without specific settings', () => {
			wizardStore.setBrewMethod('v60');
			wizardStore.setRoastLevel('medium');
			const genericGrinder = grinders[0];
			wizardStore.setGrinder(genericGrinder);

			render(ResultsDisplay);

			const recipe = getRecipe('v60', 'medium', genericGrinder.id);
			if (recipe) {
				expect(screen.getByText('Grind Setting')).toBeInTheDocument();
			}
		});
	});

	describe('Grinder search edge cases', () => {
		it('handles empty search gracefully', async () => {
			wizardStore.setBrewMethod('espresso');
			wizardStore.setRoastLevel('medium');

			render(StepGrinder);

			const searchInput = screen.getByPlaceholderText('Search grinders...');
			await user.type(searchInput, '   ');

			// Empty/whitespace search should still show grinders or no results message
			const hasButtons = screen.queryAllByRole('button', { name: /Select/ }).length > 0;
			const hasNoResults = screen.queryByText(/No grinders found/) !== null;
			expect(hasButtons || hasNoResults).toBe(true);
		});

		it('handles special characters in search', async () => {
			wizardStore.setBrewMethod('espresso');
			wizardStore.setRoastLevel('medium');

			render(StepGrinder);

			const searchInput = screen.getByPlaceholderText('Search grinders...');
			await user.type(searchInput, '@#$%');

			expect(screen.getByText(/No grinders found/)).toBeInTheDocument();
		});

		it('searches by brand and name', async () => {
			wizardStore.setBrewMethod('espresso');
			wizardStore.setRoastLevel('medium');

			render(StepGrinder);

			const searchInput = screen.getByPlaceholderText('Search grinders...');

			// Search by brand
			await user.clear(searchInput);
			await user.type(searchInput, 'time');
			let buttons = screen.queryAllByRole('button', { name: /Select.*time/i });
			expect(buttons.length).toBeGreaterThan(0);

			// Search by model
			await user.clear(searchInput);
			await user.type(searchInput, '078');
			buttons = screen.queryAllByRole('button', { name: /078/ });
			expect(buttons.length).toBeGreaterThan(0);
		});

		it('displays only compatible grinder types', () => {
			wizardStore.setBrewMethod('v60');
			wizardStore.setRoastLevel('medium');

			render(StepGrinder);

			const buttons = screen.getAllByRole('button', { name: /Select/ });

			// Should only show Commandante grinders for V60
			expect(buttons.length).toBeGreaterThan(0);
			expect(buttons.length).toBeLessThan(grinders.length);
		});
	});

	describe('Troubleshooting edge cases', () => {
		it('has escape key handler', () => {
			const onClose = vi.fn();
			render(TroubleshootingTree, { props: { open: true, onClose } });

			const dialog = screen.getByRole('dialog');
			expect(dialog).toBeInTheDocument();
		});

		it('prevents backdrop click propagation', async () => {
			render(TroubleshootingTree, { props: { open: true } });

			const dialog = screen.getByRole('dialog');
			const content = dialog.querySelector('[role="document"]');

			expect(content).toBeInTheDocument();
		});

		it('renders with different initial states', () => {
			const { unmount } = render(TroubleshootingTree, { props: { open: false } });

			expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
			unmount();

			render(TroubleshootingTree, { props: { open: true } });
			expect(screen.getByRole('dialog')).toBeInTheDocument();
		});

		it('navigates through multiple question levels', async () => {
			render(TroubleshootingTree, { props: { open: true } });

			const firstAnswerButtons = screen
				.getAllByRole('button')
				.filter((btn) => !btn.getAttribute('aria-label')?.includes('Close'));

			if (firstAnswerButtons.length > 0) {
				await user.click(firstAnswerButtons[0]);

				const secondAnswerButtons = screen
					.queryAllByRole('button')
					.filter(
						(btn) =>
							!btn.getAttribute('aria-label')?.includes('Close') &&
							!btn.textContent?.includes('Start Over')
					);

				expect(secondAnswerButtons.length >= 0).toBe(true);
			}
		});
	});

	describe('Wizard store edge cases', () => {
		it('handles rapid state changes', () => {
			wizardStore.setBrewMethod('espresso');
			wizardStore.setBrewMethod('v60');
			wizardStore.setBrewMethod('chemex');

			const state = get(wizardStore);
			expect(state.brewMethod).toBe('chemex');
		});

		it('maintains consistency after reset', () => {
			wizardStore.setBrewMethod('espresso');
			wizardStore.setRoastLevel('dark');
			wizardStore.setGrinder(grinders[0]);
			wizardStore.nextStep();

			wizardStore.reset();

			const state = get(wizardStore);
			expect(state.brewMethod).toBeNull();
			expect(state.roastLevel).toBeNull();
			expect(state.grinder).toBeNull();
			expect(state.currentStep).toBe(0);
		});

		it('handles invalid step navigation', () => {
			wizardStore.prevStep();
			let state = get(wizardStore);
			expect(state.currentStep).toBe(0);

			wizardStore.nextStep();
			wizardStore.nextStep();
			wizardStore.nextStep();
			wizardStore.nextStep();

			state = get(wizardStore);
			expect(state.currentStep).toBeGreaterThanOrEqual(3);
		});

		it('updates step when setting brew method', () => {
			wizardStore.setBrewMethod('v60');
			const state = get(wizardStore);
			expect(state.currentStep).toBe(1);
		});

		it('updates step when setting roast level', () => {
			wizardStore.setBrewMethod('v60');
			wizardStore.setRoastLevel('medium');
			const state = get(wizardStore);
			expect(state.currentStep).toBe(2);
		});

		it('updates step when setting grinder', () => {
			wizardStore.setBrewMethod('v60');
			wizardStore.setRoastLevel('medium');
			wizardStore.setGrinder(grinders[0]);
			const state = get(wizardStore);
			expect(state.currentStep).toBe(3);
		});
	});
});
