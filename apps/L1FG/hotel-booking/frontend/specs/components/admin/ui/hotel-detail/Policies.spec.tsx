import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Policies } from '@/components/admin/ui/hotel-detail';

describe('Policies', () => {
  it('renders Policies successfully', () => {
    render(<Policies />);
  });
});
