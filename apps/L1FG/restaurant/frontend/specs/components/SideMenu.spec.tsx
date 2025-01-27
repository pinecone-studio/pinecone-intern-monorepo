import SideMenu from '../../src/components/side-menu/SideMenu';
import { render } from '@testing-library/react';

describe('SideMenu', () => {
  it('sidemenu', async () => {
    render(<SideMenu />);
  });
});
