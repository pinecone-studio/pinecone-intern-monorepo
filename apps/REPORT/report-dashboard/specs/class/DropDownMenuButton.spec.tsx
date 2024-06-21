/* eslint-disable react/display-name */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-canvas-mock';
import DropDownMenuButton from '../../../report-dashboard/src/app/_class/_components/DropDownMenuButton';
import { userEvent } from '@testing-library/user-event';

// Mock the SVG components
jest.mock('@/components/svg/DeleteTab', () => () => <div data-testid="delete-tab">DeleteTab</div>);
jest.mock('@/components/svg/EditTab', () => () => <div data-testid="edit-tab">EditTab</div>);

describe('DropDownMenuButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the button with correct attributes', () => {
    render(<DropDownMenuButton />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('h-8 w-8 p-0');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('renders the MoreHorizontal icon', () => {
    render(<DropDownMenuButton />);

    const icon = screen.getByTestId('more-horizontal-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('h-4 w-4');
  });

  it('renders the sr-only text', () => {
    render(<DropDownMenuButton />);

    const srOnlyText = screen.getByText('Open menu');
    expect(srOnlyText).toBeInTheDocument();
    expect(srOnlyText).toHaveClass('sr-only');
  });

  it('opens the dropdown when clicked', async () => {
    const user = userEvent.setup();
    render(<DropDownMenuButton />);

    const button = screen.getByRole('button');
    console.log('Before click:', button.getAttribute('aria-expanded'));

    await user.click(button);
    console.log('After click:', button.getAttribute('aria-expanded'));

    await waitFor(() => {
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    // If the above passes, then try to find the dropdown content
    const dropdownContent = await screen.findByRole('menu');
    expect(dropdownContent).toBeInTheDocument();
  });
  it('has the correct CSS classes for the container', () => {
    render(<DropDownMenuButton />);

    const container = screen.getByTestId('dropdown-menu-button');
    expect(container).toHaveClass('w-[24px] h-[24px] flex items-center justify-center');
  });
});
