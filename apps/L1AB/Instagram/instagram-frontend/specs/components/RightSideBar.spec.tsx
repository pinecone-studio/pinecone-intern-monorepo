import RightSideBar from '@/components/RightSideBar';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('RightSideBar', () => {
  it('should render successfully', async () => {
    render(<RightSideBar />);
  });
});
