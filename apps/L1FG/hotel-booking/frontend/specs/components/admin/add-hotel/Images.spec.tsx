import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Images } from '@/components/admin/add-hotel';

describe('Images Component', () => {
  it('renders Images successfully', () => {
    render(<Images />);
  });
});
