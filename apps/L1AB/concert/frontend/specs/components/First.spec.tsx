import { First } from '@/components/First';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
describe('First', () => {
  it('check button', () => {
    render(<First />);
    const elemenet = screen.getByText('Add Task');
    expect(elemenet);
  });
});
