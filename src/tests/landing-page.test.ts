import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Page from '../routes/+page.svelte';

describe('Landing Page', () => {
	it('renders i18n title message', () => {
		render(Page);
		expect(screen.getByText('Dial In Your Perfect Cup')).toBeInTheDocument();
	});

	it('renders i18n subtitle message', () => {
		render(Page);
		expect(
			screen.getByText('Mobile-first coffee brewing guide for home baristas')
		).toBeInTheDocument();
	});

	it('renders i18n start button message', () => {
		render(Page);
		expect(screen.getByText('Start Guide')).toBeInTheDocument();
	});

	it('has guide link with correct href', () => {
		render(Page);
		const link = screen.getByRole('link', { name: 'Start Guide' });
		expect(link).toHaveAttribute('href', '/guide');
	});

	it('has mobile-first styling with min-h-dvh', () => {
		render(Page);
		const container = screen.getByText('Dial In Your Perfect Cup').closest('div');
		expect(container).toHaveClass('min-h-dvh');
	});

	it('button has touch-friendly minimum height', () => {
		render(Page);
		const button = screen.getByRole('link', { name: 'Start Guide' });
		expect(button).toHaveClass('min-h-[56px]');
	});

	it('uses mobile-first text sizing', () => {
		render(Page);
		const title = screen.getByText('Dial In Your Perfect Cup');
		expect(title).toHaveClass('text-5xl');
	});

	it('centers content vertically and horizontally', () => {
		render(Page);
		const container = screen.getByText('Dial In Your Perfect Cup').closest('div');
		expect(container).toHaveClass('flex', 'items-center', 'justify-center');
	});
});
