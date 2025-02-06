import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PoliciesExtra } from '@/components/admin/add-hotel';

describe('PoliciesExtra Component', () => {
  it('renders PoliciesExtra successfully', () => {
    render(<PoliciesExtra />);
  });
});
