import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GuestDataTable } from '@/components/admin/ui';
import { Booking } from '@/generated';

// Mock `next/router`
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mock guest data
const mockData: Booking[] = [
  {
    id: '1',
    cardName: 'John Doe',
    hotelId: '101',
    status: 'Confirmed',
    cardNumber: '1234 5678 9012 3456',
    country: 'USA',
    email: 'john@example.com',
    endDate: new Date(),
    expirationDate: new Date(),
    phoneNumber: '+123456789',
    roomId: 'A101',
    securityCode: 123,
    startDate: new Date(),
    userId: 'user-1',
  },
  {
    id: '2',
    cardName: 'Jane Smith',
    hotelId: '102',
    status: 'Pending',
    cardNumber: '9876 5432 1098 7654',
    country: 'UK',
    email: 'jane@example.com',
    endDate: new Date(),
    expirationDate: new Date(),
    phoneNumber: '+987654321',
    roomId: 'B202',
    securityCode: 456,
    startDate: new Date(),
    userId: 'user-2',
  },
];

describe('GuestDataTable Component', () => {
  test('renders table headers correctly', () => {
    render(<GuestDataTable data={mockData} />);

    // Check if table headers exist
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Hotel')).toBeInTheDocument();
    expect(screen.getByText('Rooms')).toBeInTheDocument();
    expect(screen.getByText('Guests')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  test('renders guest data correctly', () => {
    render(<GuestDataTable data={mockData} />);

    // Check if guest names appear
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();

    // Check if status appears
    expect(screen.getByText('Confirmed')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });

  test('renders the correct number of rows', () => {
    render(<GuestDataTable data={mockData} />);

    // Should render 2 guest rows (one per guest)
    expect(screen.getAllByRole('link')).toHaveLength(mockData.length);
  });

  test('renders empty state when no data is provided', () => {
    render(<GuestDataTable data={[]} />);

    // Check if the component handles empty data gracefully
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
  });
});
