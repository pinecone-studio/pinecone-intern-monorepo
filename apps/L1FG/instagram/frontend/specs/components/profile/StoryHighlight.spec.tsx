import React from 'react';
import { render,  } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing';
import { useGetUserTogetherQuery } from '@/generated';
import StoryHighlight from '@/components/profile/story/StoryHighlight';

jest.mock('@/generated', () => ({
  useGetUserTogetherQuery: jest.fn(),
}));

describe('StoryHighlight Component', () => {
  it('should render correctly for the owner', () => {
    (useGetUserTogetherQuery as jest.Mock).mockReturnValue({
      data: {
        getUserTogether: {
          viewer: { _id: '123' },
        },
      },
    });

    render(
      <MockedProvider>
        <StoryHighlight userId="123" />
      </MockedProvider>
    );
  });
});
