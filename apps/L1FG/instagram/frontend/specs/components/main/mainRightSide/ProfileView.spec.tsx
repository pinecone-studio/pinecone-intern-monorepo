import HomePageProfile from '@/components/Home/rightBar/HomeProfile';
import { render } from '@testing-library/react';
describe('HomePageProfile', () => {
  it('Should render', () => {
    render(<HomePageProfile />);
  });
});
