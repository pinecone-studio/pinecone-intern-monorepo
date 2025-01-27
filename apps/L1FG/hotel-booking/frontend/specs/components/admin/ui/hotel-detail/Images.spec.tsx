import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Images } from '@/components/admin/ui/hotel-detail';

describe('Images', () => {
  it('renders Images successfully', () => {
    render(<Images />);
  });
});
