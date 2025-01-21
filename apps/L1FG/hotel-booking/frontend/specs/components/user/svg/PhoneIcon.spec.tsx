import { PhoneIcon } from '@/components/user/svg/PhoneIcon';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('PhoneIcon', () => {
  it('should render successfully', async () => {
    render(<PhoneIcon />);
  });
});
