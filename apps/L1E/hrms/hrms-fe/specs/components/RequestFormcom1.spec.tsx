import { render } from '@testing-library/react';
import RequestcomDay1 from '@/components/requestForm/RequestFormcom1'; // Adjust the import path if necessary

describe('RequestcomTime1', () => {
  it('should open SuccessModal when form is submitted', async () => {
    render(<RequestcomDay1 />);
  });
});
