import { render } from '@testing-library/react';
import { RoomDetailsGeneralInfo } from '@/components/admin/assets/room-details';

describe('Admin Room Details General Info', () => {
  it('should render the admin room details general info', () => {
    render(<RoomDetailsGeneralInfo name="Hotel Name" price={23000} type="ONE" />);
  });
  it('should render the admin room details general info with no data', () => {
    render(<RoomDetailsGeneralInfo />);
  });
});
