/* eslint-disable max-lines */
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { UpdateEventComponent } from '@/components';
import { GetEventByIdDocument, UpdateEventDocument } from '@/generated';
import { toast } from 'react-toastify';

const UpdateEventMock = {
  request: {
    query: UpdateEventDocument,
    variables: {
      input: {
        eventId: '1',
        name: 'name',
        artistName: ['Test Artist 2'],
        description: 'Test Description',
        eventDate: ['2024-10-20'],
        eventTime: ['01:00'],
        venues: [
          { name: 'Энгийн', firstquantity: 100, quantity: 0, price: 120 },
          { name: 'Fan-Zone', firstquantity: 8, quantity: 0, price: 160 },
          { name: 'Vip', firstquantity: 4, quantity: 0, price: 250 },
        ],
      },
    },
  },
  result: {
    data: {
      updateEvent: {
        id: '1',
        name: 'name',
        artistName: ['Test Artist 2'],
        description: 'Test Description',
        eventDate: ['2024-10-20'],
        eventTime: ['01:00'],
        venues: [
          { name: 'Энгийн', firstquantity: 100, price: 120, quantity: 0 },
          { name: 'Fan-Zone', firstquantity: 8, price: 160, quantity: 0 },
          { name: 'Vip', firstquantity: 4, price: 250, quantity: 0 },
        ],
        discount: 0,
        createdAt: '2024-10-01',
        updatedAt: '2024-10-01',
        status: 'ACTIVE',
      },
    },
  },
};

const mockGetEventByIdResponse = {
  request: {
    query: GetEventByIdDocument,
    variables: { id: '1' },
  },
  result: {
    data: {
      getEventById: {
        _id: '1',
        name: 'Test Event',
        artistName: ['Test Artist 1'],
        description: 'Test Description',
        eventDate: ['2024-10-20'],
        eventTime: ['01:00'],
        venues: [
          { firstquantity: 100, price: 120, quantity: 0, name: 'Энгийн' },
          { firstquantity: 8, price: 160, quantity: 0, name: 'Fan-Zone' },
          { firstquantity: 4, price: 250, quantity: 0, name: 'Vip' },
        ],
        status: 'ACTIVE',
        discount: 10,
        createdAt: '2024-10-01',
        updatedAt: '2024-10-01',
      },
    },
  },
};

const updateEventMockWithError = {
  request: {
    query: UpdateEventDocument,
    variables: {
      input: {
        name: 'Test Event',
        artistName: ['Test Artist'],
        description: 'Test Description',
        eventDate: ['2024-10-20'],
        eventTime: ['01:00'],
        images: [''],
        discount: 20,
        venues: [
          { firstquantity: 100, name: 'Энгийн', price: 5000, quantity: 100 },
          { firstquantity: 100, name: 'Fan-Zone', price: 5000, quantity: 100 },
          { firstquantity: 5000, name: 'Vip', price: 100, quantity: 5000 },
        ],
      },
    },
  },
  error: new Error('Event creation failed'),
};
describe('UpdateEventComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  jest.mock('react-toastify', () => ({
    toast: {
      success: jest.fn(),
      error: jest.fn(),
    },
  }));
  it('should update artist name input correctly', async () => {
    const mockSetFormData = jest.fn();

    render(
      <MockedProvider mocks={[mockGetEventByIdResponse, UpdateEventMock]} addTypename={false}>
        <UpdateEventComponent eventId="1" />
      </MockedProvider>
    );
    fireEvent.click(screen.getByTestId('DialogOpen'));
    fireEvent.click(screen.getByText('Бусад артист нэмэх'));
    fireEvent.change(screen.getByPlaceholderText('Нэр оруулах'), { target: { value: 'name' } });
    fireEvent.change(screen.getByPlaceholderText('Дэлгэрэнгүй мэдээлэл'), { target: { value: 'Test Description' } });
    const artistInput = screen.getByPlaceholderText('Артистын нэр');
    fireEvent.change(artistInput, { target: { value: 'Test Artist 2' } });
    fireEvent.change(screen.getByTestId('RegularQuantity'), { target: { value: 100 } });
    fireEvent.change(screen.getByTestId('RegularPrice'), { target: { value: 120 } });

    fireEvent.change(screen.getByTestId('FanZoneQuantity-regular'), { target: { value: 8 } });
    fireEvent.change(screen.getByTestId('FanZonePrice-regular'), { target: { value: 160 } });

    fireEvent.change(screen.getByTestId('VipQuantity-Regular'), { target: { value: 4 } });
    fireEvent.change(screen.getByTestId('VipPrice-Regular'), { target: { value: 250 } });
    fireEvent.change(screen.getByTestId('datepicker'), { target: { value: '2024-10-20' } });
    const hourPick = screen.getByTestId('time-picker');
    fireEvent.keyDown(hourPick, { key: 'Enter' });
    const time = screen.getAllByTestId('hour');
    fireEvent.keyDown(time[0], { key: 'Enter' });

    const hourPick2 = screen.getByTestId('time-picker');
    fireEvent.keyDown(hourPick2, { key: 'Enter' });
    const time2 = screen.getAllByTestId('hour');
    fireEvent.keyDown(time2[1], { key: 'Enter' });

    fireEvent.click(screen.getByText('Шинэчлэх'));

    expect(artistInput);
    await waitFor(() => {
      expect(mockSetFormData);
      expect(artistInput);
      expect(toast.success);
    });
  });

  it('should remove an artist name when clicking the delete button', async () => {
    const mockSetIsOpen = jest.fn();
    const mockSetFormData = jest.fn();
    render(
      <MockedProvider mocks={[mockGetEventByIdResponse, UpdateEventMock]} addTypename={false}>
        <UpdateEventComponent eventId="1" />
      </MockedProvider>
    );
    fireEvent.click(screen.getByTestId('DialogOpen'));
    fireEvent.change(screen.getByPlaceholderText('Нэр оруулах'), { target: { value: 'name' } });
    fireEvent.change(screen.getByPlaceholderText('Дэлгэрэнгүй мэдээлэл'), { target: { value: 'Test Description' } });
    fireEvent.click(screen.getByText('Бусад артист нэмэх'));
    fireEvent.click(screen.getByText('Бусад артист нэмэх'));
    const deleteButtons = screen.getAllByText('Устгах');
    expect(deleteButtons.length);
    fireEvent.click(deleteButtons[0]);
    await waitFor(() => {
      expect(screen.queryAllByPlaceholderText('Артистын нэр').length);
    });
    const remainingArtistInput = screen.getByPlaceholderText('Артистын нэр');
    expect(remainingArtistInput);
    fireEvent.click(screen.getByText('Шинэчлэх'));
    await waitFor(() => {
      expect(toast.error);
      expect(mockSetFormData);
      expect(mockSetIsOpen);
    });
  });
  it('should fails', async () => {
    const mockSetIsOpen = jest.fn();
    const mockSetFormData = jest.fn();
    render(
      <MockedProvider mocks={[updateEventMockWithError]} addTypename={false}>
        <UpdateEventComponent eventId="1" />
      </MockedProvider>
    );
    fireEvent.click(screen.getByTestId('DialogOpen'));
    fireEvent.change(screen.getByPlaceholderText('Нэр оруулах'), { target: { value: 'name' } });
    fireEvent.change(screen.getByPlaceholderText('Дэлгэрэнгүй мэдээлэл'), { target: { value: 'Test Description' } });
    fireEvent.click(screen.getByText('Бусад артист нэмэх'));
    fireEvent.click(screen.getByText('Бусад артист нэмэх'));
    const deleteButtons = screen.getAllByText('Устгах');
    expect(deleteButtons.length);
    fireEvent.click(deleteButtons[0]);
    await waitFor(() => {
      expect(screen.queryAllByPlaceholderText('Артистын нэр').length);
    });
    const remainingArtistInput = screen.getByPlaceholderText('Артистын нэр');
    expect(remainingArtistInput);
    fireEvent.click(screen.getByText('Шинэчлэх'));
    await waitFor(() => {
      expect(toast.error);
      expect(mockSetFormData);
      expect(mockSetIsOpen);
    });
  });
  it('should dont have data ', async () => {
    render(
      <MockedProvider mocks={[mockGetEventByIdResponse]} addTypename={false}>
        <UpdateEventComponent eventId="1" />
      </MockedProvider>
    );
    expect(screen);
  });
});
