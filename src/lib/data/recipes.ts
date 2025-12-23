import type { BrewRecipe, BrewMethod, RoastLevel } from '../types';

export const recipes: BrewRecipe[] = [
	// ESPRESSO - Timemore 078S
	{
		brewMethod: 'espresso',
		roastLevel: 'light',
		grindSetting: [{ grinderId: 'timemore-078s', value: '0.6-1.4', unit: 'setting' }],
		ratio: '1:2.5-1:4',
		temperature: '94-96°C',
		time: '28-40s',
		steps: [
			'Lock dose (18g)',
			'Set ratio 1:2.5 (18g → 45g)',
			'Grind fine (0.6-1.4)',
			'Target 28-35s extraction',
			'Taste: if sour, increase ratio to 1:3-1:4'
		]
	},
	{
		brewMethod: 'espresso',
		roastLevel: 'medium',
		grindSetting: [{ grinderId: 'timemore-078s', value: '1.5-2.0', unit: 'setting' }],
		ratio: '1:2',
		temperature: '93.5°C',
		time: '25-35s',
		steps: [
			'Lock dose (18g)',
			'Set ratio 1:2 (18g → 36g)',
			'Grind medium-fine (1.5-2.0)',
			'Target 25-35s extraction',
			'Adjust ratio if sour (increase) or bitter (decrease)'
		]
	},
	{
		brewMethod: 'espresso',
		roastLevel: 'dark',
		grindSetting: [{ grinderId: 'timemore-078s', value: '2.0-2.6', unit: 'setting' }],
		ratio: '1:1.5',
		temperature: '90-92°C',
		time: '22-28s',
		steps: [
			'Lock dose (18g)',
			'Set ratio 1:1.5 (18g → 27g)',
			'Grind coarser (2.0-2.6)',
			'Target 22-28s extraction',
			'Lower temp prevents over-extraction'
		]
	},

	// ESPRESSO - Commandante C40 Standard Axle
	{
		brewMethod: 'espresso',
		roastLevel: 'light',
		grindSetting: [{ grinderId: 'commandante-c40-std', value: '10-12', unit: 'clicks' }],
		ratio: '1:2.5-1:3',
		temperature: '94-96°C',
		time: '30-40s',
		steps: [
			'Lock dose (18g)',
			'Set ratio 1:2.5 (18g → 45g)',
			'Grind 10-12 clicks',
			'Target 30-40s extraction',
			'Taste: if sour, increase ratio to 1:3'
		]
	},
	{
		brewMethod: 'espresso',
		roastLevel: 'medium',
		grindSetting: [{ grinderId: 'commandante-c40-std', value: '12-14', unit: 'clicks' }],
		ratio: '1:2-1:2.5',
		temperature: '92-94°C',
		time: '25-35s',
		steps: [
			'Lock dose (18g)',
			'Set ratio 1:2 (18g → 36g)',
			'Grind 12-14 clicks',
			'Target 25-35s extraction',
			'Adjust ratio if sour (increase) or bitter (decrease)'
		]
	},
	{
		brewMethod: 'espresso',
		roastLevel: 'dark',
		grindSetting: [{ grinderId: 'commandante-c40-std', value: '14-16', unit: 'clicks' }],
		ratio: '1:1.5-1:2',
		temperature: '88-92°C',
		time: '22-30s',
		steps: [
			'Lock dose (18g)',
			'Set ratio 1:1.5 (18g → 27g)',
			'Grind 14-16 clicks',
			'Target 22-30s extraction',
			'Lower temp prevents over-extraction'
		]
	},

	// ESPRESSO - Commandante C40 Red Clix
	{
		brewMethod: 'espresso',
		roastLevel: 'light',
		grindSetting: [{ grinderId: 'commandante-c40-red', value: '18-20', unit: 'clicks' }],
		ratio: '1:2.5-1:3',
		temperature: '94-96°C',
		time: '30-40s',
		steps: [
			'Lock dose (18g)',
			'Set ratio 1:2.5 (18g → 45g)',
			'Grind 18-20 clicks (Red Clix)',
			'Target 30-40s extraction',
			'Taste: if sour, increase ratio to 1:3'
		]
	},
	{
		brewMethod: 'espresso',
		roastLevel: 'medium',
		grindSetting: [{ grinderId: 'commandante-c40-red', value: '20-22', unit: 'clicks' }],
		ratio: '1:2-1:2.5',
		temperature: '92-94°C',
		time: '25-35s',
		steps: [
			'Lock dose (18g)',
			'Set ratio 1:2 (18g → 36g)',
			'Grind 20-22 clicks (Red Clix)',
			'Target 25-35s extraction',
			'Adjust ratio if sour (increase) or bitter (decrease)'
		]
	},
	{
		brewMethod: 'espresso',
		roastLevel: 'dark',
		grindSetting: [{ grinderId: 'commandante-c40-red', value: '22-26', unit: 'clicks' }],
		ratio: '1:1.5-1:2',
		temperature: '88-92°C',
		time: '22-30s',
		steps: [
			'Lock dose (18g)',
			'Set ratio 1:1.5 (18g → 27g)',
			'Grind 22-26 clicks (Red Clix)',
			'Target 22-30s extraction',
			'Lower temp prevents over-extraction'
		]
	},

	// V60 - Commandante C40 Standard Axle
	{
		brewMethod: 'v60',
		roastLevel: 'light',
		grindSetting: [{ grinderId: 'commandante-c40-std', value: '22-25', unit: 'clicks' }],
		ratio: '1:16-1:17',
		temperature: '96°C',
		time: '3:00-3:30',
		steps: [
			'Set ratio 1:16 (20g → 320g)',
			'Grind 22-25 clicks',
			'Bloom: 40-50g water, wait 30-45s',
			'Pour slowly to 320g total by 2:00',
			'Drain should finish by 3:00-3:30'
		]
	},
	{
		brewMethod: 'v60',
		roastLevel: 'light',
		grindSetting: [{ grinderId: 'commandante-c40-red', value: '44-50', unit: 'clicks' }],
		ratio: '1:16-1:17',
		temperature: '96°C',
		time: '3:00-3:30',
		steps: [
			'Set ratio 1:16 (20g → 320g)',
			'Grind 44-50 clicks (Red Clix)',
			'Bloom: 40-50g water, wait 30-45s',
			'Pour slowly to 320g total by 2:00',
			'Drain should finish by 3:00-3:30'
		]
	},
	{
		brewMethod: 'v60',
		roastLevel: 'medium',
		grindSetting: [{ grinderId: 'commandante-c40-std', value: '25-28', unit: 'clicks' }],
		ratio: '1:15-1:16',
		temperature: '93°C',
		time: '2:45-3:15',
		steps: [
			'Set ratio 1:15 (20g → 300g)',
			'Grind 25-28 clicks',
			'Bloom: 40g water, wait 30-45s',
			'Pour to 300g by 2:00',
			'Drain by 2:45-3:15'
		]
	},
	{
		brewMethod: 'v60',
		roastLevel: 'medium',
		grindSetting: [{ grinderId: 'commandante-c40-red', value: '50-56', unit: 'clicks' }],
		ratio: '1:15-1:16',
		temperature: '93°C',
		time: '2:45-3:15',
		steps: [
			'Set ratio 1:15 (20g → 300g)',
			'Grind 50-56 clicks (Red Clix)',
			'Bloom: 40g water, wait 30-45s',
			'Pour to 300g by 2:00',
			'Drain by 2:45-3:15'
		]
	},
	{
		brewMethod: 'v60',
		roastLevel: 'dark',
		grindSetting: [{ grinderId: 'commandante-c40-std', value: '28-32', unit: 'clicks' }],
		ratio: '1:14-1:15',
		temperature: '90°C',
		time: '2:30-3:00',
		steps: [
			'Set ratio 1:15 (20g → 300g)',
			'Grind 28-32 clicks',
			'Bloom: 40g water, wait 30s',
			'Pour to 300g by 2:00',
			'Drain by 2:30-3:00'
		]
	},
	{
		brewMethod: 'v60',
		roastLevel: 'dark',
		grindSetting: [{ grinderId: 'commandante-c40-red', value: '56-64', unit: 'clicks' }],
		ratio: '1:14-1:15',
		temperature: '90°C',
		time: '2:30-3:00',
		steps: [
			'Set ratio 1:15 (20g → 300g)',
			'Grind 56-64 clicks (Red Clix)',
			'Bloom: 40g water, wait 30s',
			'Pour to 300g by 2:00',
			'Drain by 2:30-3:00'
		]
	},

	// CHEMEX - Commandante C40
	{
		brewMethod: 'chemex',
		roastLevel: 'light',
		grindSetting: [{ grinderId: 'commandante-c40-std', value: '25-28', unit: 'clicks' }],
		ratio: '1:16-1:17',
		temperature: '96°C',
		time: '4:00-4:45',
		steps: [
			'Set ratio 1:16 (30g → 480g)',
			'Grind 25-28 clicks',
			'Bloom: 90-120g water, wait 30-45s',
			'Pulse pours of 100-120g',
			'Total time 4:00-4:45'
		]
	},
	{
		brewMethod: 'chemex',
		roastLevel: 'light',
		grindSetting: [{ grinderId: 'commandante-c40-red', value: '50-56', unit: 'clicks' }],
		ratio: '1:16-1:17',
		temperature: '96°C',
		time: '4:00-4:45',
		steps: [
			'Set ratio 1:16 (30g → 480g)',
			'Grind 50-56 clicks (Red Clix)',
			'Bloom: 90-120g water, wait 30-45s',
			'Pulse pours of 100-120g',
			'Total time 4:00-4:45'
		]
	},
	{
		brewMethod: 'chemex',
		roastLevel: 'medium',
		grindSetting: [{ grinderId: 'commandante-c40-std', value: '28-31', unit: 'clicks' }],
		ratio: '1:15-1:16',
		temperature: '93°C',
		time: '3:30-4:15',
		steps: [
			'Set ratio 1:16 (30g → 480g)',
			'Grind 28-31 clicks',
			'Bloom: 90-120g water, wait 30-45s',
			'Pulse pours of 100-120g',
			'Total time 3:30-4:15'
		]
	},
	{
		brewMethod: 'chemex',
		roastLevel: 'medium',
		grindSetting: [{ grinderId: 'commandante-c40-red', value: '56-62', unit: 'clicks' }],
		ratio: '1:15-1:16',
		temperature: '93°C',
		time: '3:30-4:15',
		steps: [
			'Set ratio 1:16 (30g → 480g)',
			'Grind 56-62 clicks (Red Clix)',
			'Bloom: 90-120g water, wait 30-45s',
			'Pulse pours of 100-120g',
			'Total time 3:30-4:15'
		]
	},
	{
		brewMethod: 'chemex',
		roastLevel: 'dark',
		grindSetting: [{ grinderId: 'commandante-c40-std', value: '31-34', unit: 'clicks' }],
		ratio: '1:14-1:15',
		temperature: '90°C',
		time: '3:15-4:00',
		steps: [
			'Set ratio 1:15 (30g → 450g)',
			'Grind 31-34 clicks',
			'Bloom: 90g water, wait 30s',
			'Pulse pours of 100g',
			'Total time 3:15-4:00'
		]
	},
	{
		brewMethod: 'chemex',
		roastLevel: 'dark',
		grindSetting: [{ grinderId: 'commandante-c40-red', value: '62-68', unit: 'clicks' }],
		ratio: '1:14-1:15',
		temperature: '90°C',
		time: '3:15-4:00',
		steps: [
			'Set ratio 1:15 (30g → 450g)',
			'Grind 62-68 clicks (Red Clix)',
			'Bloom: 90g water, wait 30s',
			'Pulse pours of 100g',
			'Total time 3:15-4:00'
		]
	},

	// AEROPRESS - Commandante C40
	{
		brewMethod: 'aeropress',
		roastLevel: 'light',
		grindSetting: [{ grinderId: 'commandante-c40-std', value: '18-21', unit: 'clicks' }],
		ratio: '1:14-1:16',
		temperature: '92-96°C',
		time: '2:00-2:30',
		steps: [
			'Set recipe: 18g → 252g (1:14)',
			'Grind 18-21 clicks',
			'Add all water at once',
			'Stir 10s',
			'Steep 2:00-2:30',
			'Press slowly 20-30s'
		]
	},
	{
		brewMethod: 'aeropress',
		roastLevel: 'light',
		grindSetting: [{ grinderId: 'commandante-c40-red', value: '24-28', unit: 'clicks' }],
		ratio: '1:14-1:16',
		temperature: '92-96°C',
		time: '2:00-2:30',
		steps: [
			'Set recipe: 18g → 252g (1:14)',
			'Grind 24-28 clicks (Red Clix)',
			'Add all water at once',
			'Stir 10s',
			'Steep 2:00-2:30',
			'Press slowly 20-30s'
		]
	},
	{
		brewMethod: 'aeropress',
		roastLevel: 'medium',
		grindSetting: [{ grinderId: 'commandante-c40-std', value: '21-24', unit: 'clicks' }],
		ratio: '1:12-1:14',
		temperature: '88-92°C',
		time: '1:30-2:00',
		steps: [
			'Set recipe: 18g → 216g (1:12)',
			'Grind 21-24 clicks',
			'Add all water at once',
			'Stir 10s',
			'Steep 1:30-2:00',
			'Press slowly 20-30s'
		]
	},
	{
		brewMethod: 'aeropress',
		roastLevel: 'medium',
		grindSetting: [{ grinderId: 'commandante-c40-red', value: '28-32', unit: 'clicks' }],
		ratio: '1:12-1:14',
		temperature: '88-92°C',
		time: '1:30-2:00',
		steps: [
			'Set recipe: 18g → 216g (1:12)',
			'Grind 28-32 clicks (Red Clix)',
			'Add all water at once',
			'Stir 10s',
			'Steep 1:30-2:00',
			'Press slowly 20-30s'
		]
	},
	{
		brewMethod: 'aeropress',
		roastLevel: 'dark',
		grindSetting: [{ grinderId: 'commandante-c40-std', value: '24-28', unit: 'clicks' }],
		ratio: '1:10-1:12',
		temperature: '80-88°C',
		time: '1:00-1:30',
		steps: [
			'Set recipe: 18g → 180g (1:10)',
			'Grind 24-28 clicks',
			'Add all water at once',
			'Stir 10s',
			'Steep 1:00-1:30',
			'Press slowly 20-30s'
		]
	},
	{
		brewMethod: 'aeropress',
		roastLevel: 'dark',
		grindSetting: [{ grinderId: 'commandante-c40-red', value: '32-38', unit: 'clicks' }],
		ratio: '1:10-1:12',
		temperature: '80-88°C',
		time: '1:00-1:30',
		steps: [
			'Set recipe: 18g → 180g (1:10)',
			'Grind 32-38 clicks (Red Clix)',
			'Add all water at once',
			'Stir 10s',
			'Steep 1:00-1:30',
			'Press slowly 20-30s'
		]
	}
];

/**
 * Get recipe for brew method, roast level, and grinder.
 *
 * @param brewMethod - Brew method (espresso, v60, chemex, aeropress)
 * @param roastLevel - Roast level (light, medium, dark)
 * @param grinderId - Grinder ID (e.g., 'commandante-c40-std', 'timemore-078s')
 * @returns Recipe if found, or undefined if no exact match exists
 */
export function getRecipe(
	brewMethod: BrewMethod,
	roastLevel: RoastLevel,
	grinderId: string
): BrewRecipe | undefined {
	return recipes.find(
		(r) =>
			r.brewMethod === brewMethod &&
			r.roastLevel === roastLevel &&
			r.grindSetting.some((gs) => gs.grinderId === grinderId)
	);
}

export function getRecipesByBrewMethod(brewMethod: BrewMethod): BrewRecipe[] {
	return recipes.filter((r) => r.brewMethod === brewMethod);
}

/**
 * Get grinder IDs that have recipes for the given brew method and roast level.
 *
 * @param brewMethod - Brew method (espresso, v60, chemex, aeropress)
 * @param roastLevel - Roast level (light, medium, dark)
 * @returns Array of grinder IDs that have recipes for this combination
 */
export function getAvailableGrinderIds(brewMethod: BrewMethod, roastLevel: RoastLevel): string[] {
	const grinderIds = new Set<string>();

	recipes
		.filter((r) => r.brewMethod === brewMethod && r.roastLevel === roastLevel)
		.forEach((r) => {
			r.grindSetting.forEach((gs) => grinderIds.add(gs.grinderId));
		});

	return Array.from(grinderIds);
}
