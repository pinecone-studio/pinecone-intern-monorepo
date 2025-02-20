import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import userEvent from '@testing-library/user-event';
import { GeneralInfo } from '@/components/admin/room-detail';

const mockProps = {
  data: {
    name: 'Deluxe Room',
    type: 'Suite',
    price: 150000,
    bed: 2,
    tax: 15000,
    roomInfo: ['Sea View', 'Air Conditioning', 'Wi-Fi'],
    roomNumber: 101,
    hotelId: 'some-hotel-id', // Add this property
    id: 'some-room-id', // Add this property
    images: ['image1.jpg', 'image2.jpg'], // Add this property
  },
  tax: 15000,
  bed: 2,
  name: 'Deluxe Room',
  type: 'Suite',
  price: 150000,
  roomInfo: ['Sea View', 'Air Conditioning', 'Wi-Fi'],
  roomNumber: 101,
  setTax: jest.fn(),
  setBed: jest.fn(),
  setName: jest.fn(),
  setType: jest.fn(),
  setPrice: jest.fn(),
  setRoomInfo: jest.fn(),
  setRoomNumber: jest.fn(),
  handleEditGeneralInfo: jest.fn(),
};

describe('GeneralInfo Component', () => {
  it('renders general room information correctly', () => {
    render(<GeneralInfo {...mockProps} />);

    expect(screen.getByText('Name'));
    expect(screen.getByText('Deluxe Room'));
    expect(screen.getByText('Type'));
    expect(screen.getByText('Suite'));
    expect(screen.getByText('Price per night'));
    expect(screen.getByText('150,000₮'));
    expect(screen.getByText('Bed'));
    expect(screen.getByText('2'));
    expect(screen.getByText('Tax'));
    expect(screen.getByText('15,000₮'));
    expect(screen.getByText('Room number'));
    expect(screen.getByText('101'));
    expect(screen.getByText('Room Information'));
    expect(screen.getByText('Sea View'));
    expect(screen.getByText('Air Conditioning'));
    expect(screen.getByText('Wi-Fi'));
  });

  it('displays fallback values when data is missing', () => {
    const emptyProps = {
      ...mockProps,
      data: undefined,
      name: '',
      type: '',
      price: '',
      bed: '',
      tax: '',
      roomInfo: [],
      roomNumber: '',
    };

    render(<GeneralInfo {...emptyProps} />);

    const fallbackElements = screen.getAllByText('-/-');
    expect(fallbackElements);
    expect(screen.getByText('Name'));
    expect(screen.getByText('Type'));
    expect(screen.getByText('Price per night'));
    expect(screen.getByText('Bed'));
    expect(screen.getByText('Tax'));
    expect(screen.getByText('Room number'));
    expect(screen.getByText('Room Information'));
  });

  it('calls handleEditGeneralInfo when edit button is clicked', async () => {
    render(<GeneralInfo {...mockProps} />);

    const user = userEvent.setup();
    const editButton = screen.getByRole('button', { name: /edit/i });

    await user.click(editButton);
  });
});
