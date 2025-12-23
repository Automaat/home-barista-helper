import type { TroubleshootingNode } from '../types';

export const troubleshootingTree: TroubleshootingNode[] = [
	{
		id: 'root',
		question: 'How does your coffee taste?',
		answers: [
			{
				label: 'Sour',
				nextNode: 'under-extracted'
			},
			{
				label: 'Bitter',
				nextNode: 'over-extracted'
			},
			{
				label: 'Both sour and bitter',
				nextNode: 'uneven-extraction'
			},
			{
				label: 'Weak or watery',
				nextNode: 'weak'
			},
			{
				label: 'Harsh or astringent',
				nextNode: 'harsh'
			}
		]
	},
	{
		id: 'under-extracted',
		question: 'Under-extraction: Coffee tastes sour. Choose adjustment:',
		answers: [
			{
				label: 'Grind finer',
				solution: 'Grind 2-3 clicks finer (manual) or 1 step finer (electric)',
				adjustment: 'grind_finer'
			},
			{
				label: 'Increase temperature',
				solution: 'Raise temperature by 2-4°C',
				adjustment: 'temp_higher'
			},
			{
				label: 'Extend brew time',
				solution: 'Add 15-30 seconds to brew time',
				adjustment: 'time_longer'
			},
			{
				label: 'Increase ratio (more water)',
				solution: 'Increase ratio (e.g., 1:15 → 1:16)',
				adjustment: 'ratio_higher'
			}
		]
	},
	{
		id: 'over-extracted',
		question: 'Over-extraction: Coffee tastes bitter. Choose adjustment:',
		answers: [
			{
				label: 'Grind coarser',
				solution: 'Grind 2-3 clicks coarser (manual) or 1 step coarser (electric)',
				adjustment: 'grind_coarser'
			},
			{
				label: 'Decrease temperature',
				solution: 'Lower temperature by 2-4°C',
				adjustment: 'temp_lower'
			},
			{
				label: 'Reduce brew time',
				solution: 'Reduce brew time by 15-30 seconds',
				adjustment: 'time_shorter'
			},
			{
				label: 'Decrease ratio (less water)',
				solution: 'Decrease ratio (e.g., 1:16 → 1:15)',
				adjustment: 'ratio_lower'
			}
		]
	},
	{
		id: 'uneven-extraction',
		question: 'Uneven extraction detected (sour + bitter). What is your brew method?',
		answers: [
			{
				label: 'Espresso',
				nextNode: 'uneven-espresso'
			},
			{
				label: 'Pour-over (V60/Chemex)',
				nextNode: 'uneven-pourover'
			},
			{
				label: 'AeroPress',
				nextNode: 'uneven-aeropress'
			}
		]
	},
	{
		id: 'uneven-espresso',
		question: 'Espresso: Fix puck preparation',
		answers: [
			{
				label: 'Improve distribution',
				solution: 'Use WDT tool to break clumps, distribute evenly',
				adjustment: 'technique'
			},
			{
				label: 'Level and tamp',
				solution: 'Ensure level tamp with consistent pressure (~15kg)',
				adjustment: 'technique'
			},
			{
				label: 'Check for channeling',
				solution: 'Inspect spent puck for holes, adjust prep if found',
				adjustment: 'technique'
			}
		]
	},
	{
		id: 'uneven-pourover',
		question: 'Pour-over: Fix pour technique',
		answers: [
			{
				label: 'Improve pour pattern',
				solution: 'Pour in slow, steady circles from center to edge',
				adjustment: 'technique'
			},
			{
				label: 'Check bed levelness',
				solution: 'Ensure coffee bed is level before pouring',
				adjustment: 'technique'
			},
			{
				label: 'Adjust pour speed',
				solution: 'Pour slower and more consistently',
				adjustment: 'technique'
			}
		]
	},
	{
		id: 'uneven-aeropress',
		question: 'AeroPress: Fix brewing technique',
		answers: [
			{
				label: 'Improve stirring',
				solution: 'Stir gently for 10 seconds to ensure even saturation',
				adjustment: 'technique'
			},
			{
				label: 'Level coffee bed',
				solution: 'Tap AeroPress gently to level grounds before adding water',
				adjustment: 'technique'
			},
			{
				label: 'Consistent press',
				solution: 'Press slowly and steadily (20-30 seconds)',
				adjustment: 'technique'
			}
		]
	},
	{
		id: 'weak',
		question: 'Weak/watery coffee. Choose adjustment:',
		answers: [
			{
				label: 'Grind finer',
				solution: 'Grind 2-3 clicks finer for more extraction',
				adjustment: 'grind_finer'
			},
			{
				label: 'Use more coffee',
				solution: 'Increase dose by 1-2g',
				adjustment: 'dose_more'
			},
			{
				label: 'Increase temperature',
				solution: 'Raise temperature by 2-4°C',
				adjustment: 'temp_higher'
			}
		]
	},
	{
		id: 'harsh',
		question: 'Harsh/astringent coffee. Choose adjustment:',
		answers: [
			{
				label: 'Grind coarser',
				solution: 'Grind 2-3 clicks coarser to reduce fines over-extraction',
				adjustment: 'grind_coarser'
			},
			{
				label: 'Lower temperature',
				solution: 'Reduce temperature by 2-4°C',
				adjustment: 'temp_lower'
			},
			{
				label: 'Consider better grinder',
				solution: 'Harshness often from fines - upgrade grinder if persistent',
				adjustment: 'equipment'
			}
		]
	}
];

export function getNodeById(id: string): TroubleshootingNode | undefined {
	return troubleshootingTree.find((n) => n.id === id);
}

export function getRootNode(): TroubleshootingNode {
	const root = troubleshootingTree.find((n) => n.id === 'root');
	if (!root) {
		throw new Error('Root node not found in troubleshooting tree');
	}
	return root;
}
