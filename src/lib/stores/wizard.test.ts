import { describe, it, expect, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import { wizardStore } from './wizard';
import type { BrewMethod, Grinder, RoastLevel } from '$lib/types';

describe('wizardStore', () => {
	beforeEach(() => {
		wizardStore.reset();
	});

	describe('initial state', () => {
		it('starts with null values and step 0', () => {
			const state = get(wizardStore);
			expect(state).toEqual({
				brewMethod: null,
				roastLevel: null,
				grinder: null,
				currentStep: 0
			});
		});
	});

	describe('setBrewMethod', () => {
		it('sets brew method and advances to step 1', () => {
			wizardStore.setBrewMethod('espresso');
			const state = get(wizardStore);
			expect(state.brewMethod).toBe('espresso');
			expect(state.currentStep).toBe(1);
		});

		it('supports all brew methods', () => {
			const methods: BrewMethod[] = ['espresso', 'v60', 'chemex', 'aeropress'];
			methods.forEach((method) => {
				wizardStore.reset();
				wizardStore.setBrewMethod(method);
				expect(get(wizardStore).brewMethod).toBe(method);
			});
		});
	});

	describe('setRoastLevel', () => {
		it('sets roast level and advances to step 2', () => {
			wizardStore.setRoastLevel('medium');
			const state = get(wizardStore);
			expect(state.roastLevel).toBe('medium');
			expect(state.currentStep).toBe(2);
		});

		it('supports all roast levels', () => {
			const roasts: RoastLevel[] = ['light', 'medium', 'dark'];
			roasts.forEach((roast) => {
				wizardStore.reset();
				wizardStore.setRoastLevel(roast);
				expect(get(wizardStore).roastLevel).toBe(roast);
			});
		});
	});

	describe('setGrinder', () => {
		it('sets grinder and advances to step 3', () => {
			const grinder: Grinder = {
				id: 'timemore-078s',
				name: 'Sculptor 078S',
				brand: 'Timemore',
				type: 'electric'
			};
			wizardStore.setGrinder(grinder);
			const state = get(wizardStore);
			expect(state.grinder).toEqual(grinder);
			expect(state.currentStep).toBe(3);
		});
	});

	describe('nextStep', () => {
		it('increments current step', () => {
			wizardStore.nextStep();
			expect(get(wizardStore).currentStep).toBe(1);
			wizardStore.nextStep();
			expect(get(wizardStore).currentStep).toBe(2);
		});

		it('does not clear existing state when advancing', () => {
			wizardStore.setBrewMethod('v60');
			wizardStore.nextStep();
			const state = get(wizardStore);
			expect(state.brewMethod).toBe('v60');
			expect(state.currentStep).toBe(2);
		});
	});

	describe('prevStep', () => {
		it('decrements current step', () => {
			wizardStore.setBrewMethod('espresso');
			wizardStore.setRoastLevel('light');
			wizardStore.prevStep();
			expect(get(wizardStore).currentStep).toBe(1);
		});

		it('does not go below step 0', () => {
			wizardStore.prevStep();
			expect(get(wizardStore).currentStep).toBe(0);
			wizardStore.prevStep();
			expect(get(wizardStore).currentStep).toBe(0);
		});

		it('preserves state when going back', () => {
			wizardStore.setBrewMethod('chemex');
			wizardStore.setRoastLevel('dark');
			wizardStore.prevStep();
			const state = get(wizardStore);
			expect(state.brewMethod).toBe('chemex');
			expect(state.roastLevel).toBe('dark');
		});
	});

	describe('reset', () => {
		it('clears all state and returns to step 0', () => {
			wizardStore.setBrewMethod('aeropress');
			wizardStore.setRoastLevel('medium');
			const grinder: Grinder = {
				id: 'commandante-c40-std',
				name: 'C40 MK4',
				brand: 'Commandante',
				type: 'manual',
				variants: ['Standard Axle']
			};
			wizardStore.setGrinder(grinder);

			wizardStore.reset();

			expect(get(wizardStore)).toEqual({
				brewMethod: null,
				roastLevel: null,
				grinder: null,
				currentStep: 0
			});
		});
	});

	describe('complete workflow', () => {
		it('handles full wizard flow', () => {
			const grinder: Grinder = {
				id: '1zpresso-jx-pro',
				name: 'JX-Pro',
				brand: '1Zpresso',
				type: 'manual'
			};

			wizardStore.setBrewMethod('v60');
			expect(get(wizardStore).currentStep).toBe(1);

			wizardStore.setRoastLevel('light');
			expect(get(wizardStore).currentStep).toBe(2);

			wizardStore.setGrinder(grinder);
			expect(get(wizardStore).currentStep).toBe(3);

			const finalState = get(wizardStore);
			expect(finalState).toEqual({
				brewMethod: 'v60',
				roastLevel: 'light',
				grinder,
				currentStep: 3
			});
		});
	});
});
