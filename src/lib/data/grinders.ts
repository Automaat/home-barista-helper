import type { Grinder } from '../types';

export const grinders: Grinder[] = [
	// Timemore
	{ id: 'timemore-078s', name: 'Sculptor 078S', brand: 'Timemore', type: 'electric' },
	{ id: 'timemore-064', name: 'Sculptor 064', brand: 'Timemore', type: 'electric' },

	// Commandante
	{
		id: 'commandante-c40-std',
		name: 'C40 MK4',
		brand: 'Commandante',
		type: 'manual',
		variants: ['Standard Axle']
	},
	{
		id: 'commandante-c40-red',
		name: 'C40 MK4',
		brand: 'Commandante',
		type: 'manual',
		variants: ['Red Clix']
	},

	// Baratza
	{ id: 'baratza-encore', name: 'Encore', brand: 'Baratza', type: 'electric' },
	{ id: 'baratza-virtuoso', name: 'Virtuoso+', brand: 'Baratza', type: 'electric' },

	// 1Zpresso
	{ id: '1zpresso-jx', name: 'JX', brand: '1Zpresso', type: 'manual' },
	{ id: '1zpresso-jx-pro', name: 'JX-Pro', brand: '1Zpresso', type: 'manual' },
	{ id: '1zpresso-k-plus', name: 'K-Plus', brand: '1Zpresso', type: 'manual' },
	{ id: '1zpresso-k-max', name: 'K-Max', brand: '1Zpresso', type: 'manual' },

	// Fellow
	{ id: 'fellow-ode-gen2', name: 'Ode Gen 2', brand: 'Fellow', type: 'electric' },

	// Sage/Breville
	{ id: 'sage-barista-pro', name: 'Barista Pro', brand: 'Sage', type: 'electric' },

	// Wilfa
	{ id: 'wilfa-svart', name: 'Svart', brand: 'Wilfa', type: 'electric' },
	{ id: 'wilfa-uniform', name: 'Uniform', brand: 'Wilfa', type: 'electric' }
];

export function getGrinderById(id: string): Grinder | undefined {
	return grinders.find((g) => g.id === id);
}

export function getGrindersByType(type: 'manual' | 'electric'): Grinder[] {
	return grinders.filter((g) => g.type === type);
}

export function getGrindersByBrand(brand: string): Grinder[] {
	return grinders.filter((g) => g.brand === brand);
}
