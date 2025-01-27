import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Questions } from '@/components/admin/add-hotel';

describe('Questions Component', () => {
  it('renders Questions successfully', () => {
    render(<Questions />);
  });
});
