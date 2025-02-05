import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Location } from '@/components/admin/add-hotel';

describe('Location Component', () => {
  it('renders Location successfully', () => {
    render(<Location />);
  });
});
