import React from 'react';
import { render, screen } from '@testing-library/react';
import { ActionLinkButton } from '../../src/components/ActionLinkButton';
import { ArrowLeft } from 'lucide-react';
import '@testing-library/jest-dom';
import { Button } from '../../src/components/ui/button';

describe('ActionLinkButton', () => {
  it('renders the button with the correct label and href', () => {
    const label = 'Click here!';
    const href = '/home';

    render(<ActionLinkButton label={label} href={href} Icon={ArrowLeft} variant="default" />);

    const linkElement = screen.getByTestId('action-link');

    expect(linkElement).toHaveAttribute('href', href);
    expect(screen.getByText(label)).toBeInTheDocument();

    const button = screen.getByTestId('action-link-button');

    expect(button).toBeInTheDocument();
  });

  it('renders an icon when provided', () => {
    render(<ActionLinkButton label="Click here!" href="/home" Icon={ArrowLeft} />);

    expect(screen.getByTestId('icon-svg')).toBeInTheDocument();
  });

  it('does not render an icon when none is provided', () => {
    render(<ActionLinkButton label="Click here!" href="/home" />);

    const iconSpan = screen.queryByTestId('icon-svg');

    expect(iconSpan).not.toBeInTheDocument();
  });

  it('applies the correct variant class', () => {
    const label = 'Test Button';
    const href = '/href';

    render(<ActionLinkButton label={label} href={href} Icon={ArrowLeft} variant="secondary" />);

    const button = screen.getByTestId('action-link-button');

    expect(button).toHaveClass('bg-secondary');
    expect(button).toHaveClass('text-secondary-foreground');
    expect(button).toHaveClass('hover:bg-secondary/80');
  });

  it('renders the default variant when no variant is provided', () => {
    const label = 'Default Variant';
    const href = '/default';

    render(<ActionLinkButton label={label} href={href} Icon={ArrowLeft} />);

    const button = screen.getByTestId('action-link-button');

    expect(button).not.toHaveClass('link', 'destructive', 'outline', 'secondary', 'ghost');
  });

  it('Shadcn Button test', () => {
    render(<Button asChild={true}>test</Button>);
  });
});
