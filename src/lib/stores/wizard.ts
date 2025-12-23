import { writable } from 'svelte/store';
import type { BrewMethod, Grinder, RoastLevel } from '$lib/types';

export interface WizardState {
	brewMethod: BrewMethod | null;
	roastLevel: RoastLevel | null;
	grinder: Grinder | null;
	currentStep: number;
}

const initialState: WizardState = {
	brewMethod: null,
	roastLevel: null,
	grinder: null,
	currentStep: 0
};

function createWizardStore() {
	const { subscribe, set, update } = writable<WizardState>(initialState);

	return {
		subscribe,
		setBrewMethod: (brewMethod: BrewMethod) =>
			update((state) => ({ ...state, brewMethod, currentStep: 1 })),
		setRoastLevel: (roastLevel: RoastLevel) =>
			update((state) => ({ ...state, roastLevel, currentStep: 2 })),
		setGrinder: (grinder: Grinder) => update((state) => ({ ...state, grinder, currentStep: 3 })),
		nextStep: () => update((state) => ({ ...state, currentStep: state.currentStep + 1 })),
		prevStep: () =>
			update((state) => ({
				...state,
				currentStep: Math.max(0, state.currentStep - 1)
			})),
		reset: () => set(initialState)
	};
}

export const wizardStore = createWizardStore();
