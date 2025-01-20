import { NavigationBlue } from '@/components/user/Navigations';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('NavigationBlue', () => {
  it('should render successfully', async () => {
    render(<NavigationBlue />);
  });
});
