import { Second } from '@/components/Second';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('second', () => {
  it('test', () => {
    render(<Second />);
    const elemenet = screen.getByText('To do');
    expect(elemenet);
  });
});
