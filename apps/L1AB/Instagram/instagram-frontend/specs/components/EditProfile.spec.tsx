import { EditProfile } from '@/components/EditProfile';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('EditProfile', () => {
  it('should render successfully', async () => {
    render(<EditProfile />);
  });
});
