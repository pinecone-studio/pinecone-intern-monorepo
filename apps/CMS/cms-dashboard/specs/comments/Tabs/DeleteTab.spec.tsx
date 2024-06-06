import { render, screen } from '@testing-library/react';
import DeleteTab from '@/app/comments/_components/Tabs/DeleteTab';

describe('DeleteTab component', () => {
  it('renders DeleteTab', () => {
    render(<DeleteTab />);
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<DeleteTab onClick={handleClick} />);

    const deleteButton = screen.getByTestId('delete-tab-test-id');
    deleteButton.click();

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
