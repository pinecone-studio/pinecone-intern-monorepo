import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HiddenTab from '@/app/comments/_components/Tabs/HiddenTab';

describe('HiddenTab component', () => {
  it('renders HiddenTab', () => {
    render(<HiddenTab />);
    const hiddenButton = screen.getByTestId('hidden-tab-test-id');
    expect(hiddenButton).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<HiddenTab onClick={handleClick} />);

    const hiddenButton = screen.getByTestId('hidden-tab-test-id');
    hiddenButton.click();

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
