import UserInfo from '@/app/_components/UserInfo';
import { render } from '@testing-library/react';

describe('user info components', () => {
  it('render', () => {
    render(<UserInfo />);
  });
});
