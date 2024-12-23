import { SelectDemo } from '@/components/users/Select';
import { fireEvent, render } from '@testing-library/react';

describe('SelectDemo component', () => {
  it('renders successfully with a placeholder and handles selection change', async () => {
    const mockSetSelectedInterest = jest.fn();

    const { getByTestId } = render(<SelectDemo selectedInterest="" setSelectedInterest={mockSetSelectedInterest} />);

    fireEvent.keyDown(getByTestId('trigger'), { key: 'Enter' });

    fireEvent.keyDown(getByTestId('male'), { key: 'Enter' });
  });
});
