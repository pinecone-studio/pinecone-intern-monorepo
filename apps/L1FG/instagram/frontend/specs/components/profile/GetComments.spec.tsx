import { render } from '@testing-library/react';
import { useGetCommentsQuery } from '@/generated';
import GetComments from '@/components/profile/GetComments';

jest.mock('@/generated', () => ({
  useGetCommentsQuery: jest.fn(),
}));

describe('GetComments Component', () => {
  it('renders comments when data is available', () => {
    (useGetCommentsQuery as jest.Mock).mockReturnValue({
      data: {
        getComments: [{ comment: 'First comment' }, { comment: 'Second comment' }],
      },
    });

    render(<GetComments postId="123" />);
  });

  it('renders nothing when there are no comments', () => {
    (useGetCommentsQuery as jest.Mock).mockReturnValue({
      data: { getComments: [] },
    });

    render(<GetComments postId="123" />);
  });

  it('handles loading state', () => {
    (useGetCommentsQuery as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
    });

    render(<GetComments postId="123" />);
  });
});
