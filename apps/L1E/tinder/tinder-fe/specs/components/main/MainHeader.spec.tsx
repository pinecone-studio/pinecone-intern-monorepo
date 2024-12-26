import { MainHeader } from '@/components/main/MainHeader';
import { render } from '@testing-library/react';

describe('MainHeader render', () => {
  it('should call render successfully', () => {
    render(<MainHeader />);
  });
});
