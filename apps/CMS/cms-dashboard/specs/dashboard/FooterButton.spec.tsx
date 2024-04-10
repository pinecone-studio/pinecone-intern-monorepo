import React from 'react';
import { render } from '@testing-library/react';
import { FooterButton } from '../../src/app/dashboard/_components/FooterButton';

describe('FooterButton', () => {
  it('Should render footer button component', () => {
    const { container } = render(<FooterButton text="hello test footer" />);
    expect(container).toBeDefined();
  });
});
