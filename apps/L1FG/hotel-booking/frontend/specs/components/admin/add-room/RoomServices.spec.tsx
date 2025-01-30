import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RoomServices } from '@/components/admin/add-room';

describe('RoomServices Component', () => {
  it('renders RoomServices successfully', () => {
    render(<RoomServices />);
  });
});
