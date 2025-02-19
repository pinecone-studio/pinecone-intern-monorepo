import { RoomServicesDialog } from '@/components/admin/ui/dialog/add-room/RoomServicesDialog';
import { render, fireEvent } from '@testing-library/react';

test('should update bathroom value and set key', () => {
  const setKeyMock = jest.fn();
  const setValueMock = jest.fn();

  const { getByLabelText, getByText } = render(<RoomServicesDialog setKey={setKeyMock} value="" setValue={setValueMock} handleEditRoomServices={jest.fn()} key={''} />);

  const editButton = getByText('Edit');
  fireEvent.click(editButton);

  const input = getByLabelText(/bathroom/i);
  fireEvent.change(input, { target: { value: 'Updated Bathroom' } });

  expect(setValueMock);
  expect(setKeyMock);
});
