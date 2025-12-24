export type RoastLevel = 'light' | 'medium' | 'dark';
export type BrewMethod = 'espresso' | 'v60' | 'chemex' | 'aeropress' | 'moka';

export interface Grinder {
	id: string;
	name: string;
	brand: string;
	type: 'manual' | 'electric';
	variants?: string[];
}

export interface GrindSetting {
	grinderId: string;
	value: string;
	unit: 'clicks' | 'setting' | 'microns';
	notes?: string;
}

export interface BrewRecipe {
	brewMethod: BrewMethod;
	roastLevel: RoastLevel;
	grindSetting: GrindSetting[];
	ratio: string;
	temperature: string;
	time: string;
	steps: string[];
}

export interface TroubleshootingNode {
	id: string;
	question: string;
	answers: {
		label: string;
		nextNode?: string;
		solution?: string;
		adjustment?: string;
	}[];
}
