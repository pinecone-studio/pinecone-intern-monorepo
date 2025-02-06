import HomePageProfile from '@/components/home/right/HomeProfile';
import { render } from '@testing-library/react';
describe('HomePageProfile', () => {
  it('Should render', () => {
    render(<HomePageProfile />);
  });
});
