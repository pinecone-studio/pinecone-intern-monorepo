'use client';

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StatusSelector from '@/components/StatusSelector';

describe('StatusSelector', () => {
  it('renders the "Төлөв" button', () => {
    render(<StatusSelector />);
    const toggleButton = screen.getByText('Төлөв');
    expect(toggleButton);
  });

  it('displays selected statuses as buttons', () => {
    render(<StatusSelector />);
    const selectedStatusButtons = screen.getAllByRole('button', { name: /баталгаажсан|хүлээгдэж байна/i });
    expect(selectedStatusButtons.length).toBe(4);
  });

  it('toggles the dropdown when "Төлөв" button is clicked', () => {
    render(<StatusSelector />);
    const toggleButton = screen.getByText('Төлөв');
    fireEvent.click(toggleButton);

    const dropdownStatus = screen.getByText('Татгалзсан');
    expect(dropdownStatus);
  });

  it('toggles the status selection when a status is clicked in the dropdown', () => {
    render(<StatusSelector />);
    const toggleButton = screen.getByText('Төлөв');
    fireEvent.click(toggleButton);

    const rejectedStatus = screen.getByText('Татгалзсан');
    fireEvent.click(rejectedStatus);

    const newSelectedStatusButton = screen.getByTestId('Татгалзсан');
    expect(newSelectedStatusButton);
  });

  it('removes a status from the selected list when clicked again', () => {
    render(<StatusSelector />);
    const toggleButton = screen.getByText('Төлөв');
    fireEvent.click(toggleButton);

    const pendingStatus = screen.getByTestId('Хүлээгдэж байна');
    fireEvent.click(pendingStatus);

    const unselectedStatusButton = screen.getByTestId('Хүлээгдэж байна');
    expect(unselectedStatusButton);
  });
});
