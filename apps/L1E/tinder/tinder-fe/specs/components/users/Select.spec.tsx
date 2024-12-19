import { SelectDemo } from '../../../src/components/users/Select';
import { render, screen } from '@testing-library/react';

describe('SelectDemo component', () => {
  it('renders successfully with a placeholder', () => {
    render(<SelectDemo />);
    const placeholder = screen.getByText('Select');
    expect(placeholder);
  });
});
