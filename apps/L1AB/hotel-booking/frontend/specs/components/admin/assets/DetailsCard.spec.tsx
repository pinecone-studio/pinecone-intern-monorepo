import { DetailsCard } from '@/components/admin/assets';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Admin Details Card', () => {
  it('should render the admin details card', () => {
    render(<DetailsCard />);
  });
});
