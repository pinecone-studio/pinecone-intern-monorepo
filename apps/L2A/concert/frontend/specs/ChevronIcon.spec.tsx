import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChevronIcon from '@/app/_assets/ChevronIcon';

describe('ChevronIcon', () => {
  it('should render ChevronIcon component', () => {
    render(<ChevronIcon />);
    const chevronIcon = screen.getByTestId('chevron-icon'); // ← энд
    expect(chevronIcon).toBeInTheDocument();
  });
});
