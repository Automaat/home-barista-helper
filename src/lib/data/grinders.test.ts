import { describe, it, expect } from 'vitest';
import { grinders, getGrinderById, getGrindersByType, getGrindersByBrand } from './grinders';

describe('Grinder Database', () => {
	describe('grinders array', () => {
		it('contains all grinders from framework', () => {
			expect(grinders.length).toBeGreaterThan(0);
		});

		it('includes Timemore 078S', () => {
			const timemore078s = grinders.find((g) => g.id === 'timemore-078s');
			expect(timemore078s).toBeDefined();
			expect(timemore078s?.name).toBe('Sculptor 078S');
			expect(timemore078s?.brand).toBe('Timemore');
			expect(timemore078s?.type).toBe('electric');
		});

		it('includes Commandante C40 variants', () => {
			const c40Std = grinders.find((g) => g.id === 'commandante-c40-std');
			const c40Red = grinders.find((g) => g.id === 'commandante-c40-red');

			expect(c40Std).toBeDefined();
			expect(c40Red).toBeDefined();
			expect(c40Std?.variants).toContain('Standard Axle');
			expect(c40Red?.variants).toContain('Red Clix');
		});

		it('includes 1Zpresso grinders', () => {
			const jx = grinders.find((g) => g.id === '1zpresso-jx');
			const jxPro = grinders.find((g) => g.id === '1zpresso-jx-pro');

			expect(jx).toBeDefined();
			expect(jxPro).toBeDefined();
		});

		it('all grinders have required fields', () => {
			grinders.forEach((grinder) => {
				expect(grinder.id).toBeTruthy();
				expect(grinder.name).toBeTruthy();
				expect(grinder.brand).toBeTruthy();
				expect(['manual', 'electric']).toContain(grinder.type);
			});
		});
	});

	describe('getGrinderById', () => {
		it('returns grinder by id', () => {
			const grinder = getGrinderById('timemore-078s');
			expect(grinder?.name).toBe('Sculptor 078S');
		});

		it('returns undefined for non-existent id', () => {
			const grinder = getGrinderById('non-existent');
			expect(grinder).toBeUndefined();
		});
	});

	describe('getGrindersByType', () => {
		it('returns all manual grinders', () => {
			const manualGrinders = getGrindersByType('manual');
			expect(manualGrinders.length).toBeGreaterThan(0);
			manualGrinders.forEach((grinder) => {
				expect(grinder.type).toBe('manual');
			});
		});

		it('returns all electric grinders', () => {
			const electricGrinders = getGrindersByType('electric');
			expect(electricGrinders.length).toBeGreaterThan(0);
			electricGrinders.forEach((grinder) => {
				expect(grinder.type).toBe('electric');
			});
		});
	});

	describe('getGrindersByBrand', () => {
		it('returns all Timemore grinders', () => {
			const timemoreGrinders = getGrindersByBrand('Timemore');
			expect(timemoreGrinders.length).toBeGreaterThan(0);
			timemoreGrinders.forEach((grinder) => {
				expect(grinder.brand).toBe('Timemore');
			});
		});

		it('returns all Commandante grinders', () => {
			const commandanteGrinders = getGrindersByBrand('Commandante');
			expect(commandanteGrinders.length).toBeGreaterThan(0);
			commandanteGrinders.forEach((grinder) => {
				expect(grinder.brand).toBe('Commandante');
			});
		});

		it('returns empty array for non-existent brand', () => {
			const grinders = getGrindersByBrand('NonExistent');
			expect(grinders).toEqual([]);
		});
	});
});
