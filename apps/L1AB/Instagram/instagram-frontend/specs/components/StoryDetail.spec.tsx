import { useStory } from '@/components/providers/';
import StoryDetail from '@/components/StoryDetail';
import { CarouselContent } from '@/components/ui/carousel';
import { fireEvent, render } from '@testing-library/react';
import { PropsWithChildren } from 'react';

jest.mock('@/components/providers', () => ({
  ...jest.requireActual('@/components/providers'),
  useStory: jest.fn(),
}));

jest.mock('@/components/ui/carousel', () => ({
  ...jest.requireActual('@/components/ui/carousel'),
  CarouselContent: jest.fn(),
}));

jest.mock('@/components/UserStory', () => ({
  ...jest.requireActual('@/components/UserStory'),
  UserStory: jest.fn().mockImplementation((props: { prevUser: () => void; nextUser: () => void }) => {
    const { prevUser, nextUser } = props;
    return (
      <div>
        <button data-testid="PrevButton" onClick={prevUser}></button>
        <button data-testid="NextButton" onClick={nextUser}></button>
      </div>
    );
  }),
}));

describe('StoryDetail Component', () => {
  const props = { userId: '673c49c6af669269e5cc56fc', setUserId: jest.fn() };

  it('should render with null groupedStories', () => {
    (useStory as jest.Mock).mockReturnValue({ groupedStories: null });
    (CarouselContent as unknown as jest.Mock).mockImplementation(({ children }: PropsWithChildren) => {
      return <div>{children}</div>;
    });

    render(<StoryDetail {...props} />);
  });

  it('should render with groupedStories', () => {
    (useStory as jest.Mock).mockReturnValue({
      groupedStories: {
        '673ee71983232e30a961d755': {
          userId: {
            _id: '673ee71983232e30a961d755',
            username: 'odno',
            profilePicture: 'https://picsum.photos/300/300',
          },
          stories: [
            {
              _id: '6757f5a9d7051d0bfb55ef00',
              userId: {
                _id: '673ee71983232e30a961d755',
                username: 'odno',
                profilePicture: 'https://picsum.photos/300/300',
              },
              image: 'https://picsum.photos/800/900',
              createdAt: '2024-12-10T08:02:49.324Z',
            },
            {
              _id: '6756a801920986ce48fec036',
              userId: {
                _id: '673ee71983232e30a961d755',
                username: 'odno',
                profilePicture: 'https://picsum.photos/300/300',
              },
              image: 'https://picsum.photos/800/900',
              createdAt: '2024-12-09T08:19:13.953Z',
            },
          ],
        },
      },
    });
    (CarouselContent as unknown as jest.Mock).mockImplementation(({ children }: PropsWithChildren) => {
      return <div>{children}</div>;
    });

    const { getByTestId } = render(<StoryDetail {...props} />);

    const prev = getByTestId('PrevButton');
    const next = getByTestId('NextButton');

    fireEvent.click(prev);
    fireEvent.click(next);
  });
});
