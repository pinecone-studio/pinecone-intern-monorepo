import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { useCreateRoomMutation } from '@/generated';
import { useRouter } from 'next/navigation';
import { RoomTypes } from '@/components/admin/add-hotel';

jest.mock('@/generated', () => ({
  useCreateRoomMutation: jest.fn(() => [jest.fn().mockResolvedValue({ data: { createRoom: { room: { id: '123' } } } })]),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('RoomTypes Component', () => {
  test('renders RoomTypes correctly', () => {
    render(<RoomTypes />);

    expect(screen.getByText('Room Types')).toBeInTheDocument();
    expect(screen.getByText('Add Room')).toBeInTheDocument();
    expect(screen.getByText('All Rooms')).toBeInTheDocument();
  });

  test('calls createRoom mutation on button click', async () => {
    const createRoomMock = jest.fn().mockResolvedValue({
      data: { createRoom: { room: { id: '123' } } },
    });
    useCreateRoomMutation.mockReturnValue([createRoomMock]);

    const pushMock = jest.fn();
    useRouter.mockReturnValue({ push: pushMock });

    render(<RoomTypes />);
    const addButton = screen.getByText('Add Room');
    fireEvent.click(addButton);

    expect(createRoomMock).toHaveBeenCalled();
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(pushMock).toHaveBeenCalledWith('/admin/add-hotel/add-room?id=123');
  });

  test('handles error if createRoom mutation fails', async () => {
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();
    const createRoomMock = jest.fn().mockRejectedValue(new Error('Mutation failed'));
    useCreateRoomMutation.mockReturnValue([createRoomMock]);

    render(<RoomTypes />);
    const addButton = screen.getByText('Add Room');
    fireEvent.click(addButton);

    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(consoleErrorMock).toHaveBeenCalledWith('Error creating room:', expect.any(Error));

    consoleErrorMock.mockRestore();
  });
});
