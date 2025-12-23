import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import ButtonTestWrapper from './ButtonTestWrapper.svelte';

describe('Button', () => {
	const user = userEvent.setup();

	it('renders button with default variant', () => {
		render(ButtonTestWrapper, { props: { text: 'Click me' } });

		const button = screen.getByRole('button');
		expect(button).toBeInTheDocument();
		expect(button).toHaveTextContent('Click me');
	});

	it('renders as anchor when href provided', () => {
		render(ButtonTestWrapper, { props: { href: '/test', text: 'Link' } });

		const link = screen.getByRole('link');
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute('href', '/test');
	});

	it('applies variant class', () => {
		render(ButtonTestWrapper, { props: { variant: 'destructive', text: 'Delete' } });

		const button = screen.getByRole('button');
		expect(button).toHaveClass('bg-destructive');
	});

	it('applies size class', () => {
		render(ButtonTestWrapper, { props: { size: 'lg', text: 'Large' } });

		const button = screen.getByRole('button');
		expect(button).toHaveClass('h-12');
	});

	it('applies custom class', () => {
		render(ButtonTestWrapper, { props: { class: 'custom-class', text: 'Custom' } });

		const button = screen.getByRole('button');
		expect(button).toHaveClass('custom-class');
	});

	it('handles disabled state', () => {
		render(ButtonTestWrapper, { props: { disabled: true, text: 'Disabled' } });

		const button = screen.getByRole('button');
		expect(button).toBeDisabled();
	});

	it('disabled link has aria-disabled', () => {
		render(ButtonTestWrapper, { props: { href: '/test', disabled: true, text: 'Disabled Link' } });

		const link = screen.getByRole('link');
		expect(link).toHaveAttribute('aria-disabled', 'true');
		expect(link).not.toHaveAttribute('href');
	});

	it('sets button type attribute', () => {
		render(ButtonTestWrapper, { props: { type: 'submit', text: 'Submit' } });

		const button = screen.getByRole('button');
		expect(button).toHaveAttribute('type', 'submit');
	});

	it('handles click events', async () => {
		let clicked = false;
		render(ButtonTestWrapper, {
			props: {
				onclick: () => {
					clicked = true;
				},
				text: 'Click'
			}
		});

		const button = screen.getByRole('button');
		await user.click(button);

		expect(clicked).toBe(true);
	});

	it('applies ghost variant', () => {
		render(ButtonTestWrapper, { props: { variant: 'ghost', text: 'Ghost' } });

		const button = screen.getByRole('button');
		expect(button).toHaveClass('hover:bg-accent');
	});

	it('applies outline variant', () => {
		render(ButtonTestWrapper, { props: { variant: 'outline', text: 'Outline' } });

		const button = screen.getByRole('button');
		expect(button).toHaveClass('border');
	});

	it('applies icon size', () => {
		render(ButtonTestWrapper, { props: { size: 'icon', text: '🔍' } });

		const button = screen.getByRole('button');
		expect(button).toHaveClass('size-11');
	});

	it('applies secondary variant', () => {
		render(ButtonTestWrapper, { props: { variant: 'secondary', text: 'Secondary' } });

		const button = screen.getByRole('button');
		expect(button).toHaveClass('bg-secondary');
	});

	it('applies link variant', () => {
		render(ButtonTestWrapper, { props: { variant: 'link', text: 'Link Style' } });

		const button = screen.getByRole('button');
		expect(button).toHaveClass('underline-offset-4');
	});

	it('applies small size', () => {
		render(ButtonTestWrapper, { props: { size: 'sm', text: 'Small' } });

		const button = screen.getByRole('button');
		expect(button).toHaveClass('h-9');
	});

	it('has data-slot attribute', () => {
		render(ButtonTestWrapper, { props: { text: 'Test' } });

		const button = screen.getByRole('button');
		expect(button).toHaveAttribute('data-slot', 'button');
	});
});
