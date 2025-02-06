import { WhiteCircle } from '@/components/admin/svg';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('WhiteCircle', () => {
  it('should render WhiteCircle successfully', async () => {
    render(<WhiteCircle />);
  });
});
