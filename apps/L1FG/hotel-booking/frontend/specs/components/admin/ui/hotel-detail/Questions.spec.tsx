import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Questions } from '@/components/admin/ui/hotel-detail';

describe('Questions', () => {
  it('renders Questions successfully', () => {
    render(<Questions />);
  });
});
