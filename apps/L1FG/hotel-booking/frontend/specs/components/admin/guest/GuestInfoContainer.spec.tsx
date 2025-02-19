import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // For extended matchers
import { Booking } from '@/generated';
import { GuestInfoContainer } from '@/components/admin/guest/GuestInfoContainer';

// Mock the CheckoutDialog component
jest.mock('@/components/admin/ui/dialog', () => ({
  CheckoutDialog: ({ handleEditBookingStatus }: { handleEditBookingStatus: (_newStatus: string) => void }) => <button onClick={() => handleEditBookingStatus('Completed')}>Mock Checkout</button>,
}));

describe('GuestInfoContainer', () => {
  const mockHandleEditBookingStatus = jest.fn();

  const mockData: Booking = {
    status: 'Booked',
    email: 'test@example.com',
    phoneNumber: '123-456-7890',
    guestRequest: 'Late check-in',
    cardName: '',
    cardNumber: '',
    country: '',
    endDate: undefined,
    expirationDate: undefined,
    hotelId: '',
    id: '',
    roomId: '',
    securityCode: 0,
    startDate: undefined,
    userId: '',
  };

  it('renders guest information correctly', () => {
    render(<GuestInfoContainer data={mockData} handleEditBookingStatus={mockHandleEditBookingStatus} />);

    // Check if guest info is rendered
    expect(screen.getByText('Guest Info')).toBeInTheDocument();
    expect(screen.getByText('Shagai')).toBeInTheDocument(); // First name
    expect(screen.getByText('Nyamdorj')).toBeInTheDocument(); // Last name
    expect(screen.getByText('Booked')).toBeInTheDocument(); // Status
    expect(screen.getByText('test@example.com')).toBeInTheDocument(); // Email
    expect(screen.getByText('123-456-7890')).toBeInTheDocument(); // Phone number
    expect(screen.getByText('Late check-in')).toBeInTheDocument(); // Guest request
    expect(screen.getByText('Room #502')).toBeInTheDocument(); // Room number
  });

  it('displays the correct status color for "Booked" status', () => {
    render(<GuestInfoContainer data={mockData} handleEditBookingStatus={mockHandleEditBookingStatus} />);

    const statusElement = screen.getByText('Booked');
    expect(statusElement).toHaveClass('bg-[#2563EB]'); // Blue for "Booked"
  });

  it('displays the correct status color for "Completed" status', () => {
    const completedData = { ...mockData, status: 'Completed' };
    render(<GuestInfoContainer data={completedData} handleEditBookingStatus={mockHandleEditBookingStatus} />);

    const statusElement = screen.getByText('Completed');
    expect(statusElement).toHaveClass('bg-[#18BA51]'); // Green for "Completed"
  });

  it('displays the correct status color for "Cancelled" status', () => {
    const cancelledData = { ...mockData, status: 'Cancelled' };
    render(<GuestInfoContainer data={cancelledData} handleEditBookingStatus={mockHandleEditBookingStatus} />);

    const statusElement = screen.getByText('Cancelled');
    expect(statusElement).toHaveClass('bg-[#F97316]'); // Orange for "Cancelled"
  });

  it('displays the default status color when status is undefined', () => {
    const undefinedStatusData = { ...mockData, status: undefined };
    render(<GuestInfoContainer data={undefinedStatusData} handleEditBookingStatus={mockHandleEditBookingStatus} />);

    const statusElement = screen.getByText('-/-');
    expect(statusElement).toHaveClass('bg-[#2563EB]'); // Default color
  });

  it('calls handleEditBookingStatus when CheckoutDialog button is clicked', () => {
    render(<GuestInfoContainer data={mockData} handleEditBookingStatus={mockHandleEditBookingStatus} />);

    const checkoutButton = screen.getByText('Mock Checkout');
    fireEvent.click(checkoutButton);

    expect(mockHandleEditBookingStatus).toHaveBeenCalledWith('Completed');
  });

  it('renders default placeholders when data is null', () => {
    render(<GuestInfoContainer data={null} handleEditBookingStatus={mockHandleEditBookingStatus} />);

    expect(screen.getByText('Room #502')).toBeInTheDocument(); // Static room number
  });
});
