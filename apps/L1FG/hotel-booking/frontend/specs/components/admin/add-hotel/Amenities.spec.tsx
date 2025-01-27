import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Amenities } from '@/components/admin/add-hotel';

describe('Amenities', () => {
  it('renders Amenities successfully', () => {
    render(<Amenities />);
  });
});
