import { ChooseRoom } from '@/components/user/hotel-detail';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('ChooseRoom', () => {
  it('should render ChooseRoom successfully', async () => {
    render(<ChooseRoom />);
  });
});
