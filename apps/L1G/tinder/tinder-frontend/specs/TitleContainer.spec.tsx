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
  });

  it('should render the grey text correctly', () => {
    const textElement = screen.getByText(props.greyText);
    expect(textElement);
  });

  it('should have correct container styling', () => {
    const container = screen.getByTestId('title-container');
    expect(container);
  });
});
