import { NavigationWhite } from '@/components/user/Navigations';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('NavigationWhite', () => {
  it('should render successfully', async () => {
    render(<NavigationWhite />);
  });
});
