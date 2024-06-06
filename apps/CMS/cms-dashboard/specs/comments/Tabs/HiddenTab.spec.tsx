import { render, screen } from '@testing-library/react';
import HiddenTab from '@/app/comments/_components/Tabs/HiddenTab';

describe('HiddenTab component', () => {
  it('renders HiddenTab', () => {
    render(<HiddenTab />);
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<HiddenTab onClick={handleClick} />);

    const hiddenButton = screen.getByTestId('hidden-tab-test-id');
    hiddenButton.click();

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
