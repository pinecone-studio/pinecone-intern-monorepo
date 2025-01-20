import AddHotel from '@/app/admin/add-hotel/page';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('AddHotel', () => {
  it('should render successfully', async () => {
    render(<AddHotel />);
  });
});
