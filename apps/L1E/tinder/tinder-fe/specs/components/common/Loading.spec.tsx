import { Loading } from '@/components/Loading';
import { render } from '@testing-library/react';

describe('Loading screen', () => {
  it('render the loading screen successfull', () => {
    render(<Loading />);
  });
});
