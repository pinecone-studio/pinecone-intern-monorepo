import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Amenities } from '@/components/admin/ui/add-hotel';

describe('Amenities', () => {
  it('renders Amenities successfully', () => {
    render(<Amenities />);
  });
});
