import { Loading } from '@/components/user/main/Loading';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Loading', () => {
  it('should render successfully', async () => {
    render(<Loading />);
  });
});
