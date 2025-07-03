import React from 'react';
import { render, screen } from '@testing-library/react';
import TitleContainer from '@/components/TitleContainer';

describe('TitleContainer Component', () => {
  const props = {
    boldTitle: 'Test Title',
    greyText: 'Test description text',
  };

  beforeEach(() => {
    render(<TitleContainer {...props} />);
  });

  it('should render the bold title correctly', () => {
    const titleElement = screen.getByText(props.boldTitle);
    expect(titleElement);
    expect(titleElement).toHaveClass('font-semibold text-2xl');
  });

  it('should render the grey text correctly', () => {
    const textElement = screen.getByText(props.greyText);
    expect(textElement);
    expect(textElement).toHaveClass('text-sm text-muted-foreground');
  });

  it('should have correct container styling', () => {
    const container = screen.getByTestId('title-container');
    expect(container).toHaveClass('flex flex-col items-center justify-center w-full max-w-[350px]');
  });
});
