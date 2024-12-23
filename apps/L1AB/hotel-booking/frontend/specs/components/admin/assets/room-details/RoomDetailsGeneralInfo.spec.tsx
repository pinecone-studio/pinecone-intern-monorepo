import { render } from '@testing-library/react';
import { RoomDetailsGeneralInfo } from '@/components/admin/assets/room-details';
import { useAdmin } from '@/components/providers/AdminProvider';

jest.mock('@/components/providers/AdminProvider', () => ({
  useAdmin: jest.fn(),
}));

describe('Admin Room Details General Info', () => {
  const mockAdminProvider = {
    addRoomForm: {
      values: {
        name: '',
        description: '',
        roomNumber: '',
        roomType: '',
        price: 0,
        photos: [],
      },
      handleChange: jest.fn(),
      handleBlur: jest.fn(),
      setFieldValue: jest.fn(),
      handleSubmit: jest.fn(),
      errors: {},
      touched: {},
    },
  };
  beforeEach(() => {
    (useAdmin as jest.Mock).mockReturnValue(mockAdminProvider);
  });
  it('should render the admin room details general info', () => {
    mockAdminProvider.addRoomForm.values = {
      name: 'Hotel Sunrise',
      description: 'A beautiful room in the hotel.',
      roomNumber: '101',
      roomType: 'ONE',
      price: 100,
      photos: [],
    };
    render(<RoomDetailsGeneralInfo />);
  });
  it('should render the admin room details general info with no data', () => {
    mockAdminProvider.addRoomForm.values = {
      name: '',
      description: '',
      roomNumber: '',
      roomType: '',
      price: 0,
      photos: [],
    };
    render(<RoomDetailsGeneralInfo />);
  });
});
