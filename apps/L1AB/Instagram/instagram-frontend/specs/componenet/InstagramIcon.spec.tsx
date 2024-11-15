import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { InstagramIcon } from '@/components/icon/InstagramIcon';

describe('InstagramIcon', () => {
  it('should render successfully', async () => {
    render(<InstagramIcon />);
  });
});
