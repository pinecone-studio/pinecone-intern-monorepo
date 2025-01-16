import { MenuButtons } from '@/components/Home/leftSideBar/MenuButtonsSideBar';
import { render } from '@testing-library/react';
describe('MenuButtons', () => {
  it('Should render', () => {
    render(<MenuButtons />);
  });
});
