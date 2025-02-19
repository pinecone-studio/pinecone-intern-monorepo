import PrivateAccPreview from '@/components/profile/privaccount/PrivateAccPreview';
import { render } from '@testing-library/react';

describe('Private account preview', () => {
  it('should render Private', () => {
    render(<PrivateAccPreview />);
  });
});
