import { LocationDialog } from '@/components/admin/dialogs';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Admin Room Details', () => {
  it('should render the admin room details', () => {
    render(<LocationDialog />);
  });
});
