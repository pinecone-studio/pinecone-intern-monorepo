import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Amenities } from '@/components/admin/ui/hotel-detail';

describe('Amenities', () => {
  it('renders Amenities successfully', () => {
    render(<Amenities />);
  });
});
