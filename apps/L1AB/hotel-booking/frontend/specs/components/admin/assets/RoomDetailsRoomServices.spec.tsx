import { render } from '@testing-library/react';
import { RoomDetailsRoomServices } from '@/components/admin/assets/room-details';

describe('Admin Room Details Room Services', () => {
  it('should render the room details room service', () => {
    render(<RoomDetailsRoomServices />);
  });
});
