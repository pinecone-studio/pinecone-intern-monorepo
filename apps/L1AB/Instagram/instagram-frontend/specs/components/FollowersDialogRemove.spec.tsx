import { FollowersDialogRemove } from '@/components/FollowersDialogRemove';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('FollowersDialogRemove', () => {
  it('should render successfully', async () => {
    render(<FollowersDialogRemove name="test" img="" fullname="test test" suggest="kk" id="" />);
  });
});
