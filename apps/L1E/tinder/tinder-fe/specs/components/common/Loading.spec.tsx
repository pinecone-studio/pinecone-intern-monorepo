import { Loading } from '@/components/main/Loading';
import { render } from '@testing-library/react';

describe('Loading screen', () => {
  it('render the loading screen successfull', () => {
    render(<Loading />);
  });
});
