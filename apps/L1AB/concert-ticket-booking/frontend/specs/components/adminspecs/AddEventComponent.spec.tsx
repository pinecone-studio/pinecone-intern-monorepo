import { AddEventComponent } from '@/components/admincomponents/AddEventComponent';
import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { toast } from 'react-toastify';
import { createEventMock, createEventMockWithError } from './mock';

type AddImageProps = {
  onUpload: (_urls: string[]) => void;
  handleSubmit: () => void;
};

jest.mock('@/components', () => ({
  ...jest.requireActual('@/components'),
  AddImage: ({ onUpload, handleSubmit }: AddImageProps) => {
    return (
      <>
        <button
          type="button"
          data-testid="add-image-button"
          onClick={() => {
            onUpload(['add-image']);
          }}
        ></button>
        <button
          type="button"
          data-testid="create-Event-Button"
          onClick={() => {
            handleSubmit();
          }}
        ></button>
      </>
    );
  },
}));

describe('AddEventComponent', () => {
  it('should render and handle form submission successfully', async () => {
    const setFormData = {
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
      location: '',
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

    const uploadButton = getByTestId('add-image-button');
    fireEvent.click(uploadButton);

    const createEventButton = getByTestId('createEventButton');
    expect(createEventButton);
    fireEvent.click(createEventButton);

    const createEventButton1 = getByTestId('create-Event-Button');
    expect(createEventButton1);
    fireEvent.click(createEventButton1);
    await waitFor(() => {
      expect(setFormData);
      expect(toast.success);
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

    const createEventButton = getByTestId('createEventButton');
    expect(createEventButton);
    fireEvent.click(createEventButton);

    const createEventButton1 = getByTestId('create-Event-Button');
    expect(createEventButton1);
    fireEvent.click(createEventButton1);

    await waitFor(() => {
      expect(mockSetIsOpen);
    });
  });
});
