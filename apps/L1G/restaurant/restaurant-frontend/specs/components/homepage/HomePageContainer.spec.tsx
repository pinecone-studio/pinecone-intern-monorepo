import HomePageContainer from '@/components/home/HomePageContainer';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
const mockhandleOnClick = jest.fn();
describe('HomePageContainer', () => {
  it('should render successfully', async () => {
    render(<HomePageContainer />);
  });
});
