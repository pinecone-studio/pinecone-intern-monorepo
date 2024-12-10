import StoryDetail from '@/components/StoryDetail';
import { fireEvent, render } from '@testing-library/react';
import { UseEmblaCarouselType } from 'embla-carousel-react';
import { PropsWithChildren } from 'react';

jest.mock('@/components/providers', () => ({
  ...jest.requireActual('@/components/providers'),
  useStory: jest.fn().mockReturnValue({
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
  }),
}));

jest.mock('@/components/ui/carousel', () => {
  return {
    ...jest.requireActual('@/components/ui/carousel'),
    Carousel: ({ setApi }: PropsWithChildren<{ setApi: (val: { scrollTo: () => void }) => void }>) => {
      const handleClick = () => {
        setApi({
          scrollTo: () => {},
        });
      };
      return (
        <div>
          <button data-testid="api" onClick={handleClick}></button>
        </div>
      );
    },
  };
});

describe('StoryDetail Component', () => {
  const props = { userId: '673c49c6af669269e5cc56fc', setUserId: jest.fn() };

  it('should render with null groupedStories', () => {
    const { getByTestId } = render(<StoryDetail {...props} />);

    const btn = getByTestId('api');

    fireEvent.click(btn);
  });
});
