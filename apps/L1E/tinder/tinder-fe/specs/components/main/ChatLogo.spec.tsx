import { ChatLogo } from '@/components/main/ChatLogo';
import { render } from '@testing-library/react';

describe('Chat logo render', () => {
  it('should call render successfully', () => {
    render(<ChatLogo />);
  });
});
