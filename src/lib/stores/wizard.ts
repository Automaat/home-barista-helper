import { writable } from 'svelte/store';
import type { BrewMethod, Grinder, RoastLevel } from '$lib/types';
import { browser } from '$app/environment';

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

const STORAGE_KEY = 'wizard-state';

function loadState(): WizardState {
	if (!browser) return initialState;
	try {
		const stored = sessionStorage.getItem(STORAGE_KEY);
		return stored ? JSON.parse(stored) : initialState;
	} catch {
		return initialState;
	}
}

function createWizardStore() {
	const { subscribe, set, update } = writable<WizardState>(loadState());

	function saveState(state: WizardState) {
		if (browser) {
			try {
				sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
			} catch {
				// Ignore storage errors
			}
		}
	}

	return {
		subscribe,
		setBrewMethod: (brewMethod: BrewMethod) =>
			update((state) => {
				const newState = { ...state, brewMethod, currentStep: 1 };
				saveState(newState);
				return newState;
			}),
		setRoastLevel: (roastLevel: RoastLevel) =>
			update((state) => {
				const newState = { ...state, roastLevel, currentStep: 2 };
				saveState(newState);
				return newState;
			}),
		setGrinder: (grinder: Grinder) =>
			update((state) => {
				const newState = { ...state, grinder, currentStep: 3 };
				saveState(newState);
				return newState;
			}),
		nextStep: () =>
			update((state) => {
				const newState = { ...state, currentStep: state.currentStep + 1 };
				saveState(newState);
				return newState;
			}),
		prevStep: () =>
			update((state) => {
				const newState = {
					...state,
					currentStep: Math.max(0, state.currentStep - 1)
				};
				saveState(newState);
				return newState;
			}),
		reset: () => {
			set(initialState);
			if (browser) {
				try {
					sessionStorage.removeItem(STORAGE_KEY);
				} catch {
					// Ignore storage errors
				}
			}
		}
	};
}

export const wizardStore = createWizardStore();
