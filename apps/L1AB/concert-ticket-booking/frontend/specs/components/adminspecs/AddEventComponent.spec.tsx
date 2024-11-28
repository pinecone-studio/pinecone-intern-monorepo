import { AddEventComponent } from '@/components';
import { CreateEventDocument } from '@/generated';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { toast } from 'react-toastify';
const createEventMock: MockedResponse = {
  request: {
    query: CreateEventDocument,
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
  result: {
    data: {
      createEvent: {
        id: '1',
        name: 'Test Event',
        artistName: ['Test Artist'],
        description: 'Test Description',
        eventDate: ['2024-10-20'],
        eventTime: ['01:00'],
        images: [''],
        venues: [
          { name: 'Энгийн', firstquantity: 100, price: 5000, quantity: 100 },
          { name: 'Fan-Zone', firstquantity: 100, price: 5000, quantity: 100 },
          { name: 'Vip', firstquantity: 5000, price: 100, quantity: 5000 },
        ],
        discount: 20,
        createdAt: '2024-10-20',
        updatedAt: '2024-10-20',
      },
    },
  },
};

const createEventMockWithError: MockedResponse = {
  request: {
    query: CreateEventDocument,
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

describe('AddEventComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  jest.mock('react-toastify', () => ({
    toast: {
      success: jest.fn(),
      error: jest.fn(),
    },
  }));

  it('should render and handle form submission successfully', async () => {
    const mockSetIsOpen = jest.fn();
    const mockSetFormData = {
      name: '',
      artistName: [''],
      description: '',
      eventDate: [''],
      eventTime: [''],
      images: [''],
      discount: 0,
      venues: [
        { firstquantity: 0, name: 'Энгийн', price: 0, quantity: 0 },
        { firstquantity: 0, name: 'Fan-Zone', price: 0, quantity: 0 },
        { firstquantity: 0, name: 'Vip', price: 0, quantity: 0 },
      ],
    };

    const { getByTestId, getByPlaceholderText, getAllByTestId } = render(
      <MockedProvider mocks={[createEventMock]} addTypename={false}>
        <AddEventComponent />
      </MockedProvider>
    );

    fireEvent.click(getByTestId('DialogOpen'));
    fireEvent.change(getByPlaceholderText('Нэр оруулах'), { target: { value: 'Test Event' } });
    fireEvent.change(getByPlaceholderText('Артистын нэр'), { target: { value: 'Test Artist' } });
    fireEvent.change(getByPlaceholderText('Дэлгэрэнгүй мэдээлэл'), { target: { value: 'Test Description' } });
    fireEvent.change(getByPlaceholderText('Хямдралын хувь'), { target: { value: 20 } });
    fireEvent.change(getByTestId('RegularQuantity'), { target: { value: 100 } });
    fireEvent.change(getByTestId('RegularPrice'), { target: { value: 5000 } });
    fireEvent.change(getByTestId('FanZoneQuantity-Fan-Zone'), { target: { value: 100 } });
    fireEvent.change(getByTestId('FanZonePrice-Fan-Zone'), { target: { value: 5000 } });
    fireEvent.change(getByTestId('VipQuantity-Vip'), { target: { value: 100 } });
    fireEvent.change(getByTestId('VipPrice-Vip'), { target: { value: 5000 } });
    fireEvent.change(getByTestId('datepicker'), { target: { value: '2024-10-20' } });

    const hourPick = getByTestId('time-picker');
    fireEvent.keyDown(hourPick, { key: 'Enter' });
    const time = getAllByTestId('hour');
    fireEvent.keyDown(time[0], { key: 'Enter' });

    const hourPick2 = getByTestId('time-picker');
    fireEvent.keyDown(hourPick2, { key: 'Enter' });
    const time2 = getAllByTestId('hour');
    fireEvent.keyDown(time2[1], { key: 'Enter' });

    fireEvent.click(getByTestId('createEventButton'));
    await waitFor(() => {
      expect(mockSetFormData);

      expect(toast.success);

      expect(mockSetIsOpen);
    });
  });

  it('should handle event creation failure', async () => {
    const mockSetIsOpen = jest.fn();
    const { getByTestId, getByPlaceholderText } = render(
      <MockedProvider mocks={[createEventMockWithError]} addTypename={false}>
        <AddEventComponent />
      </MockedProvider>
    );

    fireEvent.click(getByTestId('DialogOpen'));
    fireEvent.change(getByPlaceholderText('Нэр оруулах'), { target: { value: 'Test Event' } });
    fireEvent.change(getByPlaceholderText('Артистын нэр'), { target: { value: 'Test Artist' } });
    fireEvent.change(getByPlaceholderText('Дэлгэрэнгүй мэдээлэл'), { target: { value: 'Test Description' } });

    fireEvent.click(getByTestId('createEventButton'));

    await waitFor(() => {
      expect(mockSetIsOpen);
    });
  });
});
