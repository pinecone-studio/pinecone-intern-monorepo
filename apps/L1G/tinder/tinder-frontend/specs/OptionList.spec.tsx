import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OptionList from '../src/components/OptionList';
import '@testing-library/jest-dom';
import { Command } from '@/components/ui/command';

describe('OptionList', () => {
  const mockToggleOption = jest.fn();
  const mockToggleAll = jest.fn();

  const DummyIcon = ({ className }: { className?: string }) => <svg data-testid="dummy-icon" className={className} />;

  const defaultProps = {
    options: [
      { value: 'music', label: 'Music', icon: DummyIcon },
      { value: 'sports', label: 'Sports' },
    ],
    selectedValues: ['music'],
    toggleOption: mockToggleOption,
    toggleAll: mockToggleAll,
  };

  const renderComponent = (props = defaultProps) => {
    return render(
      <Command>
        <OptionList {...props} />
      </Command>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all options and (Select All)', () => {
    renderComponent();
    expect(screen.getByText('(Select All)')).toBeInTheDocument();
    expect(screen.getByText('Music')).toBeInTheDocument();
    expect(screen.getByText('Sports')).toBeInTheDocument();
  });

  it('calls toggleAll when clicking (Select All)', async () => {
    const user = userEvent.setup();
    renderComponent();
    await user.click(screen.getByText('(Select All)'));
    expect(mockToggleAll).toHaveBeenCalledTimes(1);
  });

  it('calls toggleOption when an option is clicked', async () => {
    const user = userEvent.setup();
    renderComponent();
    await user.click(screen.getByText('Sports'));
    expect(mockToggleOption).toHaveBeenCalledWith('sports');
  });

  it('calls toggleOption for selected item again (to deselect)', async () => {
    const user = userEvent.setup();
    renderComponent();
    await user.click(screen.getByText('Music'));
    expect(mockToggleOption).toHaveBeenCalledWith('music');
  });

  it('renders icon when provided', () => {
    renderComponent();
    expect(screen.getByTestId('dummy-icon')).toBeInTheDocument();
  });

  it('does not render icon if not provided', () => {
    const props = {
      ...defaultProps,
      options: [{ label: 'NoIcon', value: 'no-icon' }],
      selectedValues: [],
    };
    renderComponent(props);
    expect(screen.queryByTestId('dummy-icon')).not.toBeInTheDocument();
  });

  it('applies selected class when all options are selected', () => {
    const props = {
      ...defaultProps,
      selectedValues: ['music', 'sports'],
    };
    const { container } = renderComponent(props);

    const selectAllIcon = container.querySelector('span:contains("(Select All)")')?.previousElementSibling;
    expect(selectAllIcon).toHaveClass('bg-primary');
    expect(selectAllIcon).toHaveClass('text-primary-foreground');
  });

  it('shows check icon for selected option', () => {
    renderComponent();
    const musicItem = screen.getByText('Music').parentElement;
    expect(musicItem?.querySelector('svg')).toBeInTheDocument();
  });
});
