import { HeadPhoneIcon } from '@/components/user/svg/HeadPhoneIcon';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('HeadPhoneIcon', () => {
  it('should render successfully', async () => {
    render(<HeadPhoneIcon />);
  });
});
