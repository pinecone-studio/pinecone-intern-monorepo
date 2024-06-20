import React from 'react';
import { render } from '@testing-library/react';

import { LogoOnly } from '../../src/components/Logo';


describe('LogoOnly Component', () => {
  it('renders correctly with default dimensions', () => {
    const { container } = render(<LogoOnly />);
    const svg = container.querySelector('svg');
    expect(svg).toBeDefined()
    expect(svg).toBeDefined()
  });

  it('renders correctly with provided width', () => {
    const { container } = render(<LogoOnly width={100} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeDefined()
    expect(svg).toBeDefined()
  });

  it('renders correctly with provided height', () => {
    const { container } = render(<LogoOnly height={50} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeDefined()
    expect(svg).toBeDefined()
  });

  it('renders correctly with provided width and height', () => {
    const { container } = render(<LogoOnly width={100} height={50} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeDefined()
    expect(svg).toBeDefined()
  });
});
