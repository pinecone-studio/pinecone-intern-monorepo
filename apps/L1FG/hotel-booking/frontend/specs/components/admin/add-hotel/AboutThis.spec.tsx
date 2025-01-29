import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AboutThisProperty } from '@/components/admin/add-hotel';

describe('AboutThisProperty', () => {
  it('renders AboutThisProperty successfully', () => {
    render(<AboutThisProperty />);
  });
});
