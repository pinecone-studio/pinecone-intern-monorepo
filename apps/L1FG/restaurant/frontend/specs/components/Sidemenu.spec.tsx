import { Sidemenu } from '@/components/sidemenu/Sidemenu';
import { render } from '@testing-library/react';

describe('Sidemenu', () => {
  it('sidemenu successfull', async () => {
    render(<Sidemenu/>);
  });
})