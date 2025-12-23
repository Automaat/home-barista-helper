import { describe, it, expect } from 'vitest';
import { recipes, getRecipe, getRecipesByBrewMethod, getAvailableGrinderIds } from './recipes';

describe('Recipe Database', () => {
	describe('recipes array', () => {
		it('contains recipes for all brew methods', () => {
			const methods = ['espresso', 'v60', 'chemex', 'aeropress'];
			methods.forEach((method) => {
				const methodRecipes = recipes.filter((r) => r.brewMethod === method);
				expect(methodRecipes.length).toBeGreaterThan(0);
			});
		});

		it('contains recipes for all roast levels', () => {
			const roasts = ['light', 'medium', 'dark'];
			roasts.forEach((roast) => {
				const roastRecipes = recipes.filter((r) => r.roastLevel === roast);
				expect(roastRecipes.length).toBeGreaterThan(0);
			});
		});

		it('all recipes have required fields', () => {
			recipes.forEach((recipe) => {
				expect(recipe.brewMethod).toBeTruthy();
				expect(recipe.roastLevel).toBeTruthy();
				expect(recipe.grindSetting.length).toBeGreaterThan(0);
				expect(recipe.ratio).toBeTruthy();
				expect(recipe.temperature).toBeTruthy();
				expect(recipe.time).toBeTruthy();
				expect(recipe.steps.length).toBeGreaterThan(0);
			});
		});
	});

	describe('getRecipe', () => {
		it('returns espresso recipe for medium roast with Timemore 078S', () => {
			const recipe = getRecipe('espresso', 'medium', 'timemore-078s');
			expect(recipe).toBeDefined();
			expect(recipe?.brewMethod).toBe('espresso');
			expect(recipe?.roastLevel).toBe('medium');
			expect(recipe?.grindSetting[0].grinderId).toBe('timemore-078s');
		});

		it('returns V60 recipe for light roast with Commandante', () => {
			const recipe = getRecipe('v60', 'light', 'commandante-c40-std');
			expect(recipe).toBeDefined();
			expect(recipe?.brewMethod).toBe('v60');
			expect(recipe?.roastLevel).toBe('light');
		});

		it('returns undefined for unknown grinder', () => {
			const recipe = getRecipe('espresso', 'medium', 'unknown-grinder');
			expect(recipe).toBeUndefined();
		});

		it('returns undefined for non-existent combination', () => {
			const recipe = getRecipe('espresso', 'light', 'commandante-c40-std');
			expect(recipe).toBeUndefined();
		});
	});

	describe('getRecipesByBrewMethod', () => {
		it('returns all espresso recipes', () => {
			const espressoRecipes = getRecipesByBrewMethod('espresso');
			expect(espressoRecipes.length).toBeGreaterThan(0);
			espressoRecipes.forEach((recipe) => {
				expect(recipe.brewMethod).toBe('espresso');
			});
		});

		it('returns all V60 recipes', () => {
			const v60Recipes = getRecipesByBrewMethod('v60');
			expect(v60Recipes.length).toBeGreaterThan(0);
			v60Recipes.forEach((recipe) => {
				expect(recipe.brewMethod).toBe('v60');
			});
		});
	});

	describe('Espresso recipes accuracy', () => {
		it('light roast has correct Timemore 078S range', () => {
			const recipe = getRecipe('espresso', 'light', 'timemore-078s');
			expect(recipe?.grindSetting[0].value).toMatch(/0\.[6-9]|1\.[0-4]/);
		});

		it('medium roast has correct ratio', () => {
			const recipe = getRecipe('espresso', 'medium', 'timemore-078s');
			expect(recipe?.ratio).toContain('1:2');
		});

		it('dark roast has lower temperature', () => {
			const recipe = getRecipe('espresso', 'dark', 'timemore-078s');
			expect(recipe?.temperature).toContain('90-92°C');
		});
	});

	describe('V60 recipes accuracy', () => {
		it('light roast has finer grind than dark', () => {
			const lightRecipe = getRecipe('v60', 'light', 'commandante-c40-std');
			const darkRecipe = getRecipe('v60', 'dark', 'commandante-c40-std');

			const lightGrind = parseInt(lightRecipe?.grindSetting[0].value || '0');
			const darkGrind = parseInt(darkRecipe?.grindSetting[0].value || '0');

			expect(lightGrind).toBeLessThan(darkGrind);
		});

		it('light roast uses boiling water', () => {
			const recipe = getRecipe('v60', 'light', 'commandante-c40-std');
			expect(recipe?.temperature).toContain('96°C');
		});
	});

	describe('getAvailableGrinderIds', () => {
		it('returns only Timemore 078S for espresso', () => {
			const grinderIds = getAvailableGrinderIds('espresso', 'medium');
			expect(grinderIds).toContain('timemore-078s');
			expect(grinderIds).not.toContain('commandante-c40-std');
			expect(grinderIds).not.toContain('commandante-c40-red');
		});

		it('returns Commandante grinders for V60', () => {
			const grinderIds = getAvailableGrinderIds('v60', 'medium');
			expect(grinderIds).toContain('commandante-c40-std');
			expect(grinderIds).toContain('commandante-c40-red');
			expect(grinderIds).not.toContain('timemore-078s');
		});

		it('returns Commandante grinders for Chemex', () => {
			const grinderIds = getAvailableGrinderIds('chemex', 'light');
			expect(grinderIds).toContain('commandante-c40-std');
			expect(grinderIds).toContain('commandante-c40-red');
			expect(grinderIds).not.toContain('timemore-078s');
		});

		it('returns Commandante grinders for Aeropress', () => {
			const grinderIds = getAvailableGrinderIds('aeropress', 'dark');
			expect(grinderIds).toContain('commandante-c40-std');
			expect(grinderIds).toContain('commandante-c40-red');
			expect(grinderIds).not.toContain('timemore-078s');
		});

		it('returns empty array for non-existent combination', () => {
			const grinderIds = getAvailableGrinderIds('invalid-method' as any, 'invalid-roast' as any);
			expect(grinderIds.length).toBe(0);
		});
	});
});
