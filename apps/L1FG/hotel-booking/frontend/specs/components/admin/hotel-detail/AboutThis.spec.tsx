import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AboutThisProperty } from '@/components/admin/hotel-detail';

describe('AboutThisProperty', () => {
  it('renders AboutThisProperty successfully', () => {
    render(<AboutThisProperty />);
  });
});
