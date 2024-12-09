import StoryDetail from '@/components/StoryDetail';
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';

jest.mock('@/components/providers/StoryProvider', () => {
  const actual = jest.requireActual('@/components/providers/StoryProvider');
  return {
    ...actual,
    useStory: jest.fn(() => ({
      groupedStories: null,
    })),
  };
});

describe('StoryDetail Component', () => {
  it('!groupedStories', () => {
    const props = { userId: '673c49c6af669269e5cc56fc', setUserId: jest.fn() };
    render(
      <MockedProvider>
        <StoryDetail {...props} />
      </MockedProvider>
    );
  });
});
