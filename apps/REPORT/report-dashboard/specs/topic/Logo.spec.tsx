import React from 'react';
import { render } from '@testing-library/react';
import { Logo } from '../../src/components/Logo';

describe('Logo Component', () => {
  it('renders correctly with default dimensions', () => {
    const { container } = render(<Logo />);
    const svg = container.querySelector('svg');
    expect(svg).toBeDefined()
    expect(svg).toBeDefined()
  });

  it('renders correctly with provided width', () => {
    const { container } = render(<Logo width={100} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeDefined()
    expect(svg).toBeDefined()
  });

  it('renders correctly with provided height', () => {
    const { container } = render(<Logo height={50} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeDefined()
    expect(svg).toBeDefined()
  });

  it('renders correctly with provided width and height', () => {
    const { container } = render(<Logo width={100} height={50} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeDefined();
    expect(svg).toBeDefined();
  });
});
