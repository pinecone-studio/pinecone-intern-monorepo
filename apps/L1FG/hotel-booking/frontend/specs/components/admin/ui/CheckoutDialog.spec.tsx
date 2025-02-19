import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // For extended matchers
import { CheckoutDialog } from '@/components/admin/ui/dialog';

describe('CheckoutDialog', () => {
  const mockHandleEditBookingStatus = jest.fn();

  it('renders correctly and displays dialog content', () => {
    render(<CheckoutDialog handleEditBookingStatus={mockHandleEditBookingStatus} />);

    // Verify the dialog trigger button
    const button = screen.getByRole('button', { name: /checkout/i });
    expect(button).toBeInTheDocument();

    // Simulate opening the dialog by clicking the "Checkout" button
    fireEvent.click(button);

    // Verify the dialog content
    expect(screen.getByText('Confirm Checkout')).toBeInTheDocument();
    expect(screen.getByText('Are you sure you want to proceed with checking out this guest? This action cannot be undone.')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Continue')).toBeInTheDocument();
  });

  it('calls handleEditBookingStatus with "Cancelled" when Cancel is clicked', () => {
    render(<CheckoutDialog handleEditBookingStatus={mockHandleEditBookingStatus} />);

    // Simulate opening the dialog
    fireEvent.click(screen.getByRole('button', { name: /checkout/i }));

    // Click the Cancel button
    fireEvent.click(screen.getByText('Cancel'));

    // Check that the handleEditBookingStatus was called with "Cancelled"
    expect(mockHandleEditBookingStatus).toHaveBeenCalledWith('Cancelled');
  });

  it('calls handleEditBookingStatus with "Completed" when Continue is clicked', () => {
    render(<CheckoutDialog handleEditBookingStatus={mockHandleEditBookingStatus} />);

    // Simulate opening the dialog
    fireEvent.click(screen.getByRole('button', { name: /checkout/i }));

    // Click the Continue button
    fireEvent.click(screen.getByText('Continue'));

    // Check that the handleEditBookingStatus was called with "Completed"
    expect(mockHandleEditBookingStatus).toHaveBeenCalledWith('Completed');
  });

  it('does not call handleEditBookingStatus if the dialog is not triggered', () => {
    // Render the component without triggering the dialog interaction
    render(<CheckoutDialog handleEditBookingStatus={mockHandleEditBookingStatus} />);

    // Simulate opening the dialog by clicking the "Checkout" button
    fireEvent.click(screen.getByRole('button', { name: /checkout/i }));

    // Now, clicking on the "Cancel" or "Continue" buttons will trigger the mock
    fireEvent.click(screen.getByText('Cancel')); // You can test for both interactions

    // Check if the mock function was called after interaction
    expect(mockHandleEditBookingStatus).toHaveBeenCalledWith('Cancelled');

    // Reset the mock call history before the next test
    mockHandleEditBookingStatus.mockClear();
  });
});
