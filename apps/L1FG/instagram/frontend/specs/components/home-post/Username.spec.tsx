import { Username } from '@/components/home-post/Username';
import { render, screen } from '@testing-library/react';
import { mockPost } from './mock';

describe('Username', () => {
  it('Should render', () => {
    render(<Username post={mockPost} />);
    expect(screen.getByText('lala')).toBeDefined();
  });
});
