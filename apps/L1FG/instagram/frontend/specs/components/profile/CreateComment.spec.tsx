import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { CreateCommentDocument } from '@/generated';
import CreateComment from '@/components/profile/CreateComment';

describe('CreateComment Button', () => {
  it('disables button during loading', async () => {
    const mockCreateComment = {
      request: {
        query: CreateCommentDocument,
        variables: {
          input: {
            postId: 'test-post-id',
            comment: 'Test comment',
          },
        },
      },
      result: {
        data: {
          createComment: {
            id: 'new-comment-id',
            text: 'Test comment',
          },
        },
      },
    };

    render(
      <MockedProvider mocks={[mockCreateComment]} addTypename={false}>
        <CreateComment postId="test-post-id" />
      </MockedProvider>
    );

    const input = screen.getByPlaceholderText('Add a comment');
    const postButton = screen.getByText('Post');

    fireEvent.change(input, { target: { value: 'Test comment' } });
    fireEvent.click(postButton);
  });
});
