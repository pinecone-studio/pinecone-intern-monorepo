import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Location } from '@/components/admin/hotel-detail';

describe('Location', () => {
  it('renders Location successfully', () => {
    render(<Location />);
  });
});
