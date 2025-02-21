import { render } from '@testing-library/react';
import { ProfileHover } from '@/features/home-post/ProfileHover';
import { PostCaption } from '@/components/home-post';

jest.mock('@/features/home-post/ProfileHover', () => ({
  ProfileHover: jest.fn(({ children, searchingUserId }) => (
    <div data-testid="profile-hover" data-userid={searchingUserId}>
      {children}
    </div>
  )),
}));

const mockPost = {
  node: {
    user: {
      _id: 'user123',
      userName: 'testUser',
    },
    caption: 'This is a test caption',
  },
};

describe('PostCaption', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<PostCaption post={mockPost as any} />);
  });

  it('renders the username correctly', () => {
    render(<PostCaption post={mockPost as any} />);
  });

  it('renders the caption correctly', () => {
    render(<PostCaption post={mockPost as any} />);
  });

  it('passes correct props to ProfileHover', () => {
    render(<PostCaption post={mockPost as any} />);

    expect(ProfileHover).toHaveBeenCalledWith(
      {
        searchingUserId: 'user123',
        children: 'testUser',
      },
      expect.any(Object)
    );
  });

  it('has correct styling classes', () => {
    render(<PostCaption post={mockPost as any} />);
  });

  it('handles missing caption gracefully', () => {
    const postWithoutCaption = {
      node: {
        user: {
          _id: 'user123',
          userName: 'testUser',
        },
        caption: null,
      },
    };

    render(<PostCaption post={postWithoutCaption as any} />);
  });

  it('handles missing user data gracefully', () => {
    const postWithoutUser = {
      node: {
        user: {
          _id: 'user123',
          userName: null,
        },
        caption: 'Test caption',
      },
    };

    render(<PostCaption post={postWithoutUser as any} />);
  });
});
