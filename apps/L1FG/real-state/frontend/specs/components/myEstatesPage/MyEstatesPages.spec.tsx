import MyEstatesPage from '@/components/myEstatesPage/MyEstatesPage';
import { render } from '@testing-library/react';

describe('Footer', () => {
  it('should render successfully', () => {
    render(<MyEstatesPage />);
  });
});
