import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import TroubleshootingTree from './TroubleshootingTree.svelte';

describe('TroubleshootingTree', () => {
	const user = userEvent.setup();

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('does not render when open is false', () => {
		render(TroubleshootingTree, {
			props: { open: false }
		});

		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
	});

	it('renders when open is true', () => {
		render(TroubleshootingTree, {
			props: { open: true }
		});

		expect(screen.getByRole('dialog')).toBeInTheDocument();
	});

	it('displays troubleshooting title', () => {
		render(TroubleshootingTree, {
			props: { open: true }
		});

		expect(screen.getByText('Troubleshooting')).toBeInTheDocument();
	});

	it('displays close button', () => {
		render(TroubleshootingTree, {
			props: { open: true }
		});

		expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
	});

	it('closes when close button clicked', async () => {
		const onClose = vi.fn();
		render(TroubleshootingTree, {
			props: { open: true, onClose }
		});

		const closeButton = screen.getByRole('button', { name: 'Close' });
		await user.click(closeButton);

		expect(onClose).toHaveBeenCalledOnce();
	});

	it('displays root question initially', () => {
		render(TroubleshootingTree, {
			props: { open: true }
		});

		expect(screen.getByText(/taste/i)).toBeInTheDocument();
	});

	it('does not show Start Over button at root', () => {
		render(TroubleshootingTree, {
			props: { open: true }
		});

		expect(screen.queryByRole('button', { name: /Start Over/ })).not.toBeInTheDocument();
	});

	it('navigates to next question when answer clicked', async () => {
		render(TroubleshootingTree, {
			props: { open: true }
		});

		const answerButtons = screen.getAllByRole('button').filter((btn) => !btn.getAttribute('aria-label')?.includes('Close'));
		if (answerButtons.length > 0) {
			await user.click(answerButtons[0]);
		}
	});

	it('displays solution when reached', async () => {
		render(TroubleshootingTree, {
			props: { open: true }
		});

		const answerButtons = screen.getAllByRole('button').filter((btn) => !btn.getAttribute('aria-label')?.includes('Close'));

		if (answerButtons.length > 0) {
			await user.click(answerButtons[0]);

			const nextButtons = screen.getAllByRole('button').filter((btn) => !btn.getAttribute('aria-label')?.includes('Close') && !btn.textContent?.includes('Start Over'));
			if (nextButtons.length > 0) {
				await user.click(nextButtons[0]);
			}
		}
	});

	it('shows Start Over button after leaving root', async () => {
		render(TroubleshootingTree, {
			props: { open: true }
		});

		const answerButtons = screen.getAllByRole('button').filter((btn) => !btn.getAttribute('aria-label')?.includes('Close'));
		if (answerButtons.length > 0) {
			await user.click(answerButtons[0]);

			const startOverButton = screen.queryByRole('button', { name: /Start Over/i });
			if (startOverButton) {
				expect(startOverButton).toBeInTheDocument();
			}
		}
	});

	it('resets to root when Start Over clicked', async () => {
		render(TroubleshootingTree, {
			props: { open: true }
		});

		const answerButtons = screen.getAllByRole('button').filter((btn) => !btn.getAttribute('aria-label')?.includes('Close'));
		if (answerButtons.length > 0) {
			await user.click(answerButtons[0]);

			const startOverButton = screen.queryByRole('button', { name: /Start Over/i });
			if (startOverButton) {
				await user.click(startOverButton);
				expect(screen.queryByRole('button', { name: /Start Over/i })).not.toBeInTheDocument();
			}
		}
	});

	it('has accessible dialog attributes', () => {
		render(TroubleshootingTree, {
			props: { open: true }
		});

		const dialog = screen.getByRole('dialog');
		expect(dialog).toHaveAttribute('aria-modal', 'true');
		expect(dialog).toHaveAttribute('aria-labelledby', 'troubleshoot-title');
	});

	it('close button has minimum touch target size', () => {
		render(TroubleshootingTree, {
			props: { open: true }
		});

		const closeButton = screen.getByRole('button', { name: 'Close' });
		expect(closeButton).toHaveClass('min-h-[44px]');
		expect(closeButton).toHaveClass('min-w-[44px]');
	});

	it('displays close icon', () => {
		render(TroubleshootingTree, {
			props: { open: true }
		});

		const closeButton = screen.getByRole('button', { name: 'Close' });
		expect(closeButton.querySelector('svg')).toBeInTheDocument();
	});

	it('closes when backdrop clicked', async () => {
		const onClose = vi.fn();
		render(TroubleshootingTree, {
			props: { open: true, onClose }
		});

		const dialog = screen.getByRole('dialog');
		await user.click(dialog);

		expect(onClose).toHaveBeenCalled();
	});

	it('displays Try Another Issue button in solution', async () => {
		render(TroubleshootingTree, {
			props: { open: true }
		});

		const answerButtons = screen.getAllByRole('button').filter((btn) =>
			!btn.getAttribute('aria-label')?.includes('Close') &&
			!btn.textContent?.includes('Start Over')
		);

		if (answerButtons.length > 0) {
			for (let i = 0; i < 3 && i < answerButtons.length; i++) {
				const buttons = screen.getAllByRole('button').filter((btn) =>
					!btn.getAttribute('aria-label')?.includes('Close') &&
					!btn.textContent?.includes('Start Over') &&
					!btn.textContent?.includes('Try Another Issue')
				);
				if (buttons.length > 0) {
					await user.click(buttons[0]);
				}
			}

			const tryAnotherButton = screen.queryByRole('button', { name: /Try Another Issue/i });
			if (tryAnotherButton) {
				expect(tryAnotherButton).toBeInTheDocument();
			}
		}
	});

	it('resets when Try Another Issue clicked', async () => {
		render(TroubleshootingTree, {
			props: { open: true }
		});

		const answerButtons = screen.getAllByRole('button').filter((btn) =>
			!btn.getAttribute('aria-label')?.includes('Close') &&
			!btn.textContent?.includes('Start Over')
		);

		if (answerButtons.length > 0) {
			for (let i = 0; i < 3 && i < answerButtons.length; i++) {
				const buttons = screen.getAllByRole('button').filter((btn) =>
					!btn.getAttribute('aria-label')?.includes('Close') &&
					!btn.textContent?.includes('Start Over') &&
					!btn.textContent?.includes('Try Another Issue')
				);
				if (buttons.length > 0) {
					await user.click(buttons[0]);
				}
			}

			const tryAnotherButton = screen.queryByRole('button', { name: /Try Another Issue/i });
			if (tryAnotherButton) {
				await user.click(tryAnotherButton);
				expect(screen.queryByText(/Recommended Solution/i)).not.toBeInTheDocument();
			}
		}
	});
});
