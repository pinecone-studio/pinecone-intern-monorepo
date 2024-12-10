import Story from '@/components/Story';
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

describe('Story Component', () => {
  it('should render successfully', async () => {
    render(
      <MockedProvider>
        <Story />
      </MockedProvider>
    );
  });
});
