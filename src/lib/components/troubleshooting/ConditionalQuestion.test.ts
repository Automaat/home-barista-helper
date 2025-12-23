import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import ConditionalQuestion from './ConditionalQuestion.svelte';
import type { TroubleshootingNode } from '$lib/types';

describe('ConditionalQuestion', () => {
	const user = userEvent.setup();

	const mockNode: TroubleshootingNode = {
		id: 'test-node',
		question: 'What is the problem?',
		answers: [
			{ label: 'Too sour', nextNode: 'sour-solutions' },
			{ label: 'Too bitter', solution: 'Use coarser grind' },
			{ label: 'Weak coffee', nextNode: 'weak-solutions' }
		]
	};

	it('renders question text', () => {
		render(ConditionalQuestion, { props: { node: mockNode, onAnswer: vi.fn() } });

		expect(screen.getByText('What is the problem?')).toBeInTheDocument();
	});

	it('renders all answer options', () => {
		render(ConditionalQuestion, { props: { node: mockNode, onAnswer: vi.fn() } });

		expect(screen.getByText('Too sour')).toBeInTheDocument();
		expect(screen.getByText('Too bitter')).toBeInTheDocument();
		expect(screen.getByText('Weak coffee')).toBeInTheDocument();
	});

	it('calls onAnswer when answer clicked', async () => {
		const onAnswer = vi.fn();
		render(ConditionalQuestion, { props: { node: mockNode, onAnswer } });

		const button = screen.getByRole('button', { name: 'Too sour' });
		await user.click(button);

		expect(onAnswer).toHaveBeenCalledWith(mockNode.answers[0]);
	});

	it('displays solution text when answer has solution', () => {
		render(ConditionalQuestion, { props: { node: mockNode, onAnswer: vi.fn() } });

		expect(screen.getByText('Use coarser grind')).toBeInTheDocument();
	});

	it('has accessible aria labels', () => {
		render(ConditionalQuestion, { props: { node: mockNode, onAnswer: vi.fn() } });

		expect(screen.getByRole('button', { name: 'Too sour' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Too bitter' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Weak coffee' })).toBeInTheDocument();
	});

	it('has minimum touch target size', () => {
		render(ConditionalQuestion, { props: { node: mockNode, onAnswer: vi.fn() } });

		const buttons = screen.getAllByRole('button');
		buttons.forEach((button) => {
			expect(button).toHaveClass('min-h-[80px]');
		});
	});

	it('renders with single answer', () => {
		const singleAnswerNode: TroubleshootingNode = {
			id: 'single',
			question: 'Single option?',
			answers: [{ label: 'Only choice', solution: 'Done' }]
		};

		render(ConditionalQuestion, { props: { node: singleAnswerNode, onAnswer: vi.fn() } });

		expect(screen.getByText('Only choice')).toBeInTheDocument();
		expect(screen.getByText('Done')).toBeInTheDocument();
	});

	it('calls onAnswer with correct answer object', async () => {
		const onAnswer = vi.fn();
		render(ConditionalQuestion, { props: { node: mockNode, onAnswer } });

		await user.click(screen.getByRole('button', { name: 'Too bitter' }));
		expect(onAnswer).toHaveBeenCalledWith(mockNode.answers[1]);

		await user.click(screen.getByRole('button', { name: 'Weak coffee' }));
		expect(onAnswer).toHaveBeenCalledWith(mockNode.answers[2]);
	});

	it('renders answers without solution text when not present', () => {
		render(ConditionalQuestion, { props: { node: mockNode, onAnswer: vi.fn() } });

		const sourButton = screen.getByRole('button', { name: 'Too sour' });
		expect(sourButton).toHaveTextContent('Too sour');
		expect(sourButton).not.toHaveTextContent('Use coarser grind');
	});
});
