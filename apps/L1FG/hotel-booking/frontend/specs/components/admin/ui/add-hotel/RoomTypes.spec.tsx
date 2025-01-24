import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RoomTypes } from '@/components/admin/ui/add-hotel';

describe('RoomTypes Component', () => {
  it('renders RoomTypes successfully', () => {
    render(<RoomTypes />);
  });
});
