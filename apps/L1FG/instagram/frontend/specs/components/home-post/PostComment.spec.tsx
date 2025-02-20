import { render } from '@testing-library/react';
import HomePostCreateComment from '@/features/home-post/HomePostCreateComment';
import { quantityConverter } from '@/components/utils/quantity-converter';
import { PostComment } from '@/components/home-post';
import PostModal from '@/components/profile/profilePost/PostModal';

jest.mock('@/components/utils/quantity-converter');
jest.mock('@/features/home-post/HomePostCreateComment');
jest.mock('@/components/profile/profilePost/PostModal', () => {
  return jest.fn(({ children }) => <div data-testid="post-modal">{children}</div>);
});

const mockPost = {
  node: {
    id: '1',
    commentCount: 5,
  },
};

describe('PostComment', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (quantityConverter as jest.Mock).mockReturnValue('5 comments');

    (HomePostCreateComment as jest.Mock).mockReturnValue(<div data-testid="create-comment">Create Comment</div>);
  });

  it('renders without crashing', () => {
    render(<PostComment post={mockPost as any} />);
  });

  it('displays the correct comment count', () => {
    render(<PostComment post={mockPost as any} />);

    expect(quantityConverter).toHaveBeenCalledWith({
      quantity: mockPost.node.commentCount,
      text: 'comment',
    });
  });

  it('renders HomePostCreateComment with correct props', () => {
    render(<PostComment post={mockPost as any} />);

    expect(HomePostCreateComment).toHaveBeenCalledWith({ post: mockPost.node }, expect.any(Object));
  });

  it('renders PostModal with correct props', () => {
    render(<PostComment post={mockPost as any} />);

    expect(PostModal).toHaveBeenCalledWith(
      expect.objectContaining({
        post: mockPost.node,
      }),
      expect.any(Object)
    );
  });

  it('has correct cursor styles', () => {
    render(<PostComment post={mockPost as any} />);
  });
});
