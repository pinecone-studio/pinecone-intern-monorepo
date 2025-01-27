import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RoomTypes } from '@/components/admin/ui/hotel-detail';

describe('RoomTypes', () => {
  it('renders RoomTypes successfully', () => {
    render(<RoomTypes />);
  });
});
