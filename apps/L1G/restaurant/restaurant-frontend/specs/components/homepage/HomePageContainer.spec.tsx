import HomePageContainer from '@/components/home/HomePageContainer';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('HomePageContainer', () => {
  it('should render successfully', async () => {
    render(<HomePageContainer />);
  });
});
