import { CheckOutMain } from '@/components/user/check-out/CheckOutMain';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Check out main shuold render', () => {
  it('should render ', () => {
    render(<CheckOutMain />);
  });
});
