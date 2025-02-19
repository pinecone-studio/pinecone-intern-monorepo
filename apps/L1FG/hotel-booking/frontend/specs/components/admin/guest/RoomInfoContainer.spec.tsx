import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RoomInfoContainer } from '@/components/admin/guest/RoomInfoContainer';

describe('CheckoutDialog', () => {
  it('renders CheckoutDialog successfully', () => {
    render(<RoomInfoContainer />);
  });
});
