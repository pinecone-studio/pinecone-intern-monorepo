import { RoomDetails } from '@/components/user/ui/cards/RoomDetails';
import { render } from '@testing-library/react';

describe('RoomDetails', () => {
  it('should render RoomDetails componet successfully', () => {
    render(<RoomDetails />);
  });
});
