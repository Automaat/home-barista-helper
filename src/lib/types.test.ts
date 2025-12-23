import { describe, it, expect } from 'vitest';
import type { Grinder, GrindSetting, BrewRecipe, TroubleshootingNode } from './types';

describe('Type Definitions', () => {
	describe('Grinder type', () => {
		it('accepts valid manual grinder', () => {
			const grinder: Grinder = {
				id: 'commandante-c40',
				name: 'C40 MK4',
				brand: 'Commandante',
				type: 'manual'
			};

			expect(grinder.type).toBe('manual');
		});

		it('accepts valid electric grinder', () => {
			const grinder: Grinder = {
				id: 'timemore-078s',
				name: 'Sculptor 078S',
				brand: 'Timemore',
				type: 'electric'
			};

			expect(grinder.type).toBe('electric');
		});

		it('accepts grinder with variants', () => {
			const grinder: Grinder = {
				id: 'commandante-c40-std',
				name: 'C40 MK4',
				brand: 'Commandante',
				type: 'manual',
				variants: ['Standard Axle', 'Red Clix']
			};

			expect(grinder.variants).toHaveLength(2);
		});
	});

	describe('GrindSetting type', () => {
		it('accepts clicks unit', () => {
			const setting: GrindSetting = {
				grinderId: 'commandante-c40',
				value: '25',
				unit: 'clicks'
			};

			expect(setting.unit).toBe('clicks');
		});

		it('accepts setting unit', () => {
			const setting: GrindSetting = {
				grinderId: 'timemore-078s',
				value: '1.2',
				unit: 'setting'
			};

			expect(setting.unit).toBe('setting');
		});

		it('accepts microns unit', () => {
			const setting: GrindSetting = {
				grinderId: 'timemore-078s',
				value: '400',
				unit: 'microns'
			};

			expect(setting.unit).toBe('microns');
		});

		it('accepts optional notes', () => {
			const setting: GrindSetting = {
				grinderId: 'commandante-c40',
				value: '25',
				unit: 'clicks',
				notes: 'Standard axle variant'
			};

			expect(setting.notes).toBe('Standard axle variant');
		});
	});

	describe('BrewRecipe type', () => {
		it('accepts valid espresso recipe', () => {
			const recipe: BrewRecipe = {
				brewMethod: 'espresso',
				roastLevel: 'medium',
				grindSetting: [
					{
						grinderId: 'timemore-078s',
						value: '1.5',
						unit: 'setting'
					}
				],
				ratio: '1:2',
				temperature: '93.5°C',
				time: '25-35s',
				steps: ['Lock dose (18g)', 'Set ratio 1:2', 'Pull shot']
			};

			expect(recipe.brewMethod).toBe('espresso');
			expect(recipe.roastLevel).toBe('medium');
		});

		it('accepts valid V60 recipe', () => {
			const recipe: BrewRecipe = {
				brewMethod: 'v60',
				roastLevel: 'light',
				grindSetting: [
					{
						grinderId: 'commandante-c40-std',
						value: '23',
						unit: 'clicks'
					}
				],
				ratio: '1:16',
				temperature: '96°C',
				time: '3:00-3:30',
				steps: ['Bloom 40g 30s', 'Pour to 300g by 2:00', 'Drain by 3:15']
			};

			expect(recipe.brewMethod).toBe('v60');
		});

		it('accepts multiple grinder settings', () => {
			const recipe: BrewRecipe = {
				brewMethod: 'chemex',
				roastLevel: 'dark',
				grindSetting: [
					{
						grinderId: 'commandante-c40-std',
						value: '45',
						unit: 'clicks'
					},
					{
						grinderId: 'commandante-c40-red',
						value: '65',
						unit: 'clicks'
					}
				],
				ratio: '1:15',
				temperature: '90°C',
				time: '3:30-4:00',
				steps: ['Bloom', 'Pour']
			};

			expect(recipe.grindSetting).toHaveLength(2);
		});
	});

	describe('TroubleshootingNode type', () => {
		it('accepts node with next node reference', () => {
			const node: TroubleshootingNode = {
				id: 'taste-check',
				question: 'How does your coffee taste?',
				answers: [
					{
						label: 'Sour',
						nextNode: 'under-extracted'
					},
					{
						label: 'Bitter',
						nextNode: 'over-extracted'
					}
				]
			};

			expect(node.answers).toHaveLength(2);
			expect(node.answers[0].nextNode).toBe('under-extracted');
		});

		it('accepts node with solution', () => {
			const node: TroubleshootingNode = {
				id: 'under-extracted',
				question: 'Under-extraction detected',
				answers: [
					{
						label: 'Fix grind',
						solution: 'Grind finer by 2-3 clicks',
						adjustment: 'grind_finer'
					}
				]
			};

			expect(node.answers[0].solution).toBe('Grind finer by 2-3 clicks');
			expect(node.answers[0].adjustment).toBe('grind_finer');
		});

		it('accepts answer without next node or solution', () => {
			const node: TroubleshootingNode = {
				id: 'initial',
				question: 'What is the issue?',
				answers: [
					{
						label: 'Taste is off'
					}
				]
			};

			expect(node.answers[0].label).toBe('Taste is off');
			expect(node.answers[0].nextNode).toBeUndefined();
			expect(node.answers[0].solution).toBeUndefined();
		});
	});
});
