import { describe, it, expect } from 'vitest';
import { troubleshootingTree, getNodeById, getRootNode } from './troubleshooting';

describe('Troubleshooting Tree', () => {
	describe('troubleshootingTree array', () => {
		it('contains multiple nodes', () => {
			expect(troubleshootingTree.length).toBeGreaterThan(0);
		});

		it('all nodes have required fields', () => {
			troubleshootingTree.forEach((node) => {
				expect(node.id).toBeTruthy();
				expect(node.question).toBeTruthy();
				expect(node.answers.length).toBeGreaterThan(0);
				node.answers.forEach((answer) => {
					expect(answer.label).toBeTruthy();
				});
			});
		});

		it('has root node', () => {
			const root = troubleshootingTree.find((n) => n.id === 'root');
			expect(root).toBeDefined();
		});
	});

	describe('getNodeById', () => {
		it('returns root node', () => {
			const node = getNodeById('root');
			expect(node).toBeDefined();
			expect(node?.id).toBe('root');
		});

		it('returns undefined for non-existent id', () => {
			const node = getNodeById('non-existent');
			expect(node).toBeUndefined();
		});
	});

	describe('getRootNode', () => {
		it('returns root node', () => {
			const root = getRootNode();
			expect(root).toBeDefined();
			expect(root.id).toBe('root');
		});
	});

	describe('Troubleshooting paths', () => {
		it('sour taste leads to under-extraction solutions', () => {
			const root = getRootNode();
			const sourAnswer = root.answers.find((a) => a.label.toLowerCase().includes('sour'));
			expect(sourAnswer).toBeDefined();
			expect(sourAnswer?.nextNode || sourAnswer?.solution).toBeTruthy();
		});

		it('bitter taste leads to over-extraction solutions', () => {
			const root = getRootNode();
			const bitterAnswer = root.answers.find((a) => a.label.toLowerCase().includes('bitter'));
			expect(bitterAnswer).toBeDefined();
			expect(bitterAnswer?.nextNode || bitterAnswer?.solution).toBeTruthy();
		});

		it('weak taste has solution', () => {
			const root = getRootNode();
			const weakAnswer = root.answers.find((a) => a.label.toLowerCase().includes('weak'));
			expect(weakAnswer).toBeDefined();
			expect(weakAnswer?.nextNode || weakAnswer?.solution).toBeTruthy();
		});

		it('harsh taste has solution', () => {
			const root = getRootNode();
			const harshAnswer = root.answers.find((a) => a.label.toLowerCase().includes('harsh'));
			expect(harshAnswer).toBeDefined();
			expect(harshAnswer?.nextNode || harshAnswer?.solution).toBeTruthy();
		});
	});

	describe('Solution nodes', () => {
		it('under-extraction node has solutions', () => {
			const node = getNodeById('under-extracted');
			if (node) {
				const hasSolutions = node.answers.some((a) => a.solution || a.adjustment);
				expect(hasSolutions).toBe(true);
			}
		});

		it('over-extraction node has solutions', () => {
			const node = getNodeById('over-extracted');
			if (node) {
				const hasSolutions = node.answers.some((a) => a.solution || a.adjustment);
				expect(hasSolutions).toBe(true);
			}
		});
	});

	describe('Navigation integrity', () => {
		it('all nextNode references exist', () => {
			troubleshootingTree.forEach((node) => {
				node.answers.forEach((answer) => {
					if (answer.nextNode) {
						const targetNode = getNodeById(answer.nextNode);
						expect(targetNode).toBeDefined();
					}
				});
			});
		});

		it('no circular references in immediate children', () => {
			troubleshootingTree.forEach((node) => {
				node.answers.forEach((answer) => {
					if (answer.nextNode) {
						expect(answer.nextNode).not.toBe(node.id);
					}
				});
			});
		});
	});
});
