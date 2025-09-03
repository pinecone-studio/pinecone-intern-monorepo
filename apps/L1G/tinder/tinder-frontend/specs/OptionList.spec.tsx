import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OptionList, { OptionListProps } from '../src/components/OptionList';
import '@testing-library/jest-dom';
import { Command } from '@/components/ui/command';

describe('OptionList', () => {
  const mockToggleOption = jest.fn();

  const DummyIcon = () => <svg data-testid="dummy-icon" />;

  const mockOptions = [
    { label: 'Music', value: 'music', icon: DummyIcon },
    { label: 'Sports', value: 'sports' },
  ];

  const defaultProps: OptionListProps = {
    options: mockOptions,
    selectedValues: [],
    toggleOption: mockToggleOption,
  };

  const renderComponent = (props: Partial<OptionListProps> = {}) => {
    return render(
      <Command>
        <OptionList {...{ ...defaultProps, ...props }} />
      </Command>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all options', () => {
    renderComponent();
    expect(screen.getByText('Music')).toBeInTheDocument();
    expect(screen.getByText('Sports')).toBeInTheDocument();
  });

  it('calls toggleOption when an option is clicked', async () => {
    const user = userEvent.setup();
    renderComponent();
    await user.click(screen.getByText('Sports'));
    expect(mockToggleOption).toHaveBeenCalledWith('sports');
  });

  it('calls toggleOption for selected item again (to deselect)', async () => {
    const user = userEvent.setup();
    const props = {
      ...defaultProps,
      selectedValues: ['music'],
    };
    renderComponent(props);
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
    };
    renderComponent(props);
    expect(screen.queryByTestId('dummy-icon')).not.toBeInTheDocument();
  });

  it('applies selected styling when option is selected', () => {
    const props = {
      ...defaultProps,
      selectedValues: ['music'],
    };
    renderComponent(props);
    const checkboxes = screen.getAllByTestId('check-icon');
    expect(checkboxes[0].parentElement).toHaveClass('bg-primary');
    expect(checkboxes[0].parentElement).toHaveClass('text-primary-foreground');
  });

  it('shows check icon for selected option', () => {
    const props = {
      ...defaultProps,
      selectedValues: ['music'],
    };
    renderComponent(props);
    const musicItem = screen.getByText('Music').parentElement;
    expect(musicItem?.querySelector('svg')).toBeInTheDocument();
  });
});