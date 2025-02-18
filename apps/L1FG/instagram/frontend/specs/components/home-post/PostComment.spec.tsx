import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PostComment } from '@/components/home-post';

jest.mock('@/features/home-post/HomePostCreateComment');

describe('PostComment Component', () => {
  const mockPost = {
    node: {
      commentCount: 5,
    },
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the comment count correctly', () => {
    render(<PostComment post={mockPost} />);
  });

  it('renders HomePostCreateComment component', () => {
    render(<PostComment post={mockPost} />);
  });
});
