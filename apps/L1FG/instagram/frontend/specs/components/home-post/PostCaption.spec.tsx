import '@testing-library/jest-dom';
import { PostCaption } from '@/components/home-post/PostCaption';
import { render, screen } from '@testing-library/react';
import { mockPost } from './mock';

describe('Post caption', () => {
  it('Should render', () => {
    render(<PostCaption post={mockPost} />);
    expect(screen.getByText('lala')).toBeInTheDocument();
    expect(screen.getByText('hi')).toBeInTheDocument();
  });
});
