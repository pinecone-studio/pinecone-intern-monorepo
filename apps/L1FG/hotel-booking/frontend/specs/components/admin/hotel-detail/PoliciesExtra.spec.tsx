import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PoliciesExtra } from '@/components/admin/hotel-detail';

describe('PoliciesExtra', () => {
  it('renders PoliciesExtra successfully', () => {
    render(<PoliciesExtra />);
  });
});
