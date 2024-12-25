import { render } from '@testing-library/react';
import RequestForm from '@/components/RequestForm';
import Requestcom from '@/components/requestForm/RequestFormcom';

describe('RequestForm', () => {
  it('should RequestForm', async () => {
    render(<RequestForm />);
  });
});
