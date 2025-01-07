'use client';

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StatusSelector from '@/components/StatusSelector';
const mockStatuses = [
  { id: 'APPROVED', name: 'Баталгаажсан', count: 21, selected: true },
  { id: 'PENDING', name: 'Хүлээгдэж байна', count: 15, selected: false },
  { id: 'REJECTED', name: 'Татгалзсан', count: 8, selected: false },
];

const mockSelectedStatuses = [{ id: 'confirmed', name: 'Баталгаажсан', count: 21, selected: true }];

const mockHandleStatusClick = jest.fn();
const mockSetIsOpen = jest.fn();
describe('StatusSelector', () => {
  it('renders the "Төлөв" button', () => {
    const { getByTestId } = render(
      <StatusSelector handleStatusClick={mockHandleStatusClick} selectedStatuses={mockSelectedStatuses} statuses={mockStatuses} isOpen={false} setIsOpen={mockSetIsOpen} />
    );
    const button = getByTestId('btn');
    fireEvent.click(button);
    const toggleButton = screen.getByText('Төлөв');
    expect(toggleButton);
  });

  it('displays selected statuses as buttons', () => {
    render(<StatusSelector handleStatusClick={mockHandleStatusClick} selectedStatuses={mockSelectedStatuses} statuses={mockStatuses} isOpen={false} setIsOpen={mockSetIsOpen} />);
    const toggleButton = screen.getByText('Төлөв');
    fireEvent.click(toggleButton);
  });

  it('toggles the dropdown when "Төлөв" button is clicked', () => {
    const { getByTestId } = render(
      <StatusSelector handleStatusClick={mockHandleStatusClick} selectedStatuses={mockSelectedStatuses} statuses={mockStatuses} isOpen={false} setIsOpen={mockSetIsOpen} />
    );
    const button = getByTestId('btn');
    fireEvent.click(button);
    const toggleButton = screen.getByText('Төлөв');
    fireEvent.click(toggleButton);
  });

  it('toggles the status selection when a status is clicked in the dropdown', () => {
    render(<StatusSelector handleStatusClick={mockHandleStatusClick} selectedStatuses={mockSelectedStatuses} statuses={mockStatuses} isOpen={false} setIsOpen={mockSetIsOpen} />);
    const toggleButton = screen.getByText('Төлөв');
    fireEvent.click(toggleButton);
  });

  it('removes a status from the selected list when clicked again', () => {
    render(<StatusSelector handleStatusClick={mockHandleStatusClick} selectedStatuses={mockSelectedStatuses} statuses={mockStatuses} isOpen={false} setIsOpen={mockSetIsOpen} />);
    const toggleButton = screen.getByText('Төлөв');
    fireEvent.click(toggleButton);
  });
  it('removes a status from the selected list when clicked again', () => {
    const { getByTestId } = render(
      <StatusSelector handleStatusClick={mockHandleStatusClick} selectedStatuses={mockSelectedStatuses} statuses={mockStatuses} isOpen={true} setIsOpen={mockSetIsOpen} />
    );
    const toggleButton = screen.getByText('Төлөв');
    fireEvent.click(toggleButton);
    const statusButton = getByTestId('0');
    fireEvent.click(statusButton);
  });
});
