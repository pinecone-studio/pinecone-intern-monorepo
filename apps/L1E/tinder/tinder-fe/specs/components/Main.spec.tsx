import Main from '@/components/chat/Main';
import { render, screen } from '@testing-library/react';

describe('Main chat ', () => {
  it('should render my chat ', () => {
    render(<Main />);
    expect(screen.getByText('as'));
  });
});
