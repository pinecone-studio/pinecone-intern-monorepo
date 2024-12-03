/* eslint-disable max-lines */
// import { render, screen, fireEvent, waitFor, getAllByTestId } from '@testing-library/react';
// import { useCreateCommentMutation, useGetCommentsByPostIdQuery } from '@/generated';
// import { MockedProvider } from '@apollo/client/testing';
// import userEvent from '@testing-library/user-event';
// import PostDetail from '@/components/PostDetail';
// import '@testing-library/jest-dom';
// import { PropsType } from './PostCard.spec';

// jest.mock('@/generated', () => ({
//   useCreateCommentMutation: jest.fn(),
//   useGetCommentsByPostIdQuery: jest.fn(),
// }));

// // postimages: string[];
// // postcaption: string;
// // userName: string;
// // userProfile: string;
// // postId: string;
// // userId: string;

// const mockPostData = {
//   postimages: ['/image1.jpg', '/image2.jpg'],
//   postcaption: 'Test caption',
//   userName: 'Test User',
//   userProfile: 'profile.jpg',
//   postId: '123',
//   userId: '456',
// };

// describe('PostDetail Component', () => {
//   const mockCommentsData = {
//     getCommentsByPostId: [{ userId: { username: 'test user' }, comment: 'test comment', createdAt: '1d' }],
//   };

//   beforeEach(() => {
//     jest.clearAllMocks();
//     (useGetCommentsByPostIdQuery as jest.Mock).mockReturnValue({
//       data: mockCommentsData,
//       refetch: jest.fn(),
//     });
//     (useCreateCommentMutation as jest.Mock).mockReturnValue([jest.fn()]);
//   });

//   it('should render the PostDetail component correctly', () => {
//     const { container } = render(
//       <MockedProvider>
//         <PostDetail {...mockPostData} />
//       </MockedProvider>
//     );

//     expect(container).toBeDefined();
//   });

//   it('image slider', async () => {
//     const { getByTestId } = render(
//       <MockedProvider>
//         <PostDetail {...mockPostData} />
//       </MockedProvider>
//     );

//     const NextButton = getByTestId('NextButton');
//     const PrevButton = getByTestId('PrevButton');

//     fireEvent.click(NextButton);
//     fireEvent.click(PrevButton);
//   });

//   it('should be create new comment correctly', async () => {
//     const handleComment = jest.fn();
//     (useCreateCommentMutation as jest.Mock).mockReturnValue([handleComment]);

//     const {getByText, getByTestId } = render(
//       <MockedProvider>
//         <PostDetail {...mockPostData} />
//       </MockedProvider>
//     );

//     const commentInput = getByTestId('commentInput');
//     userEvent.type(commentInput, 'This is a test comment');
//     const postButton = getByText(/Post/i);
//     userEvent.click(postButton);

//     await waitFor(() => {
//       expect(handleComment).calledOnceWith({
//         variables: {
//           input: {
//             comment: 'This is a test comment',
//             postId: '123',
//             userId: '456',
//           },
//         },
//       });
//     });
//   });
  // it('should handle comment input and submission', async () => {
  //   const createCommentMock = jest.fn();
  //   (useCreateCommentMutation as jest.Mock).mockReturnValue([createCommentMock]);

  //   render(
  //     <MockedProvider>
  //       <PostDetail {...mockPostData} />
  //     </MockedProvider>
  //   );

  //   const commentInput = screen.getByTestId('commentInput');
  //   userEvent.type(commentInput, 'This is a test comment');
  //   const postButton = screen.getByText(/Post/i);
  //   userEvent.click(postButton);

  //   await waitFor(() => {
  //     expect(createCommentMock).calledOnceWith({
  //       variables: {
  //         input: {
  //           comment: 'This is a test comment',
  //           postId: '123',
  //           userId: '456',
  //         },
  //       },
  //     });
  //   });
  // });

  // it('should display the existing comments', () => {
  //   render(
  //     <MockedProvider>
  //       <PostDetail {...mockPostData} />
  //     </MockedProvider>
  //   );
  // });

  // it('should open the dialog when the MessageCircle icon is clicked', () => {
  //   render(
  //     <MockedProvider>
  //       <PostDetail {...mockPostData} />
  //     </MockedProvider>
  //   );
  //   fireEvent.click(screen.getByRole('button', { name: /message/i }));
  // });
// });
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PostDetail from '@/components/PostDetail';
import { MockedProvider } from '@apollo/client/testing';
import { useCreateCommentMutation, useGetCommentsByPostIdQuery } from '@/generated';

const mockPostData = {
  postimages: ['/image1.jpg', '/image2.jpg'],
  postcaption: 'Test Caption',
  userName: 'testuser',
  userProfile: '/profile.jpg',
  postId: 'post123',
  userId: 'user456'
};

const mockCommentsData = {
  getCommentsByPostId: [
    {
      userId: {
        username: 'commenter1',
        profilePicture: '/commenter1.jpg'
      },
      comment: 'Great post!'
    }
  ]
};

// const mocks = [
//   {
//     request: {
//       query: GET_COMMENTS_BY_POST_ID,
//       variables: { postId: 'post123' }
//     },
//     result: {
//       data: mockCommentsData
//     }
//   },
//   {
//     request: {
//       query: CREATE_COMMENT,
//       variables: {
//         input: {
//           comment: 'New comment',
//           postId: 'post123',
//           userId: 'user456'
//         }
//       }
//     },
//     result: {
//       data: {
//         createComment: {
//           id: 'comment789',
//           comment: 'New comment'
//         }
//       }
//     }
//   }
// ];

describe('PostDetail Component', () => {
  it('renders post images and navigates between them', () => {
    render(
      <MockedProvider>
        <PostDetail {...mockPostData} />
      </MockedProvider>
    );

    // Open dialog
    fireEvent.click(screen.getByTestId('MessageCircleIcon'));

    // Check images are rendered
    const images = screen.getAllByAltText('no');
    expect(images.length).toBe(2);

    // Test image navigation
    const prevButton = screen.getByTestId('PrevButton');
    const nextButton = screen.getByTestId('NextButton');

    fireEvent.click(nextButton);
    fireEvent.click(prevButton);
  });

  it('displays post details correctly', () => {
    render(
      <MockedProvider>
        <PostDetail {...mockPostData} />
      </MockedProvider>
    );

    // Check user details
    expect(screen.getByText(mockPostData.userName)).toBeInTheDocument();
    expect(screen.getByText(mockPostData.postcaption)).toBeInTheDocument();
  });

  // it('adds a new comment', async () => {
  //   render(
  //     <MockedProvider mocks={mocks} addTypename={false}>
  //       <PostDetail {...mockPostData} />
  //     </MockedProvider>
  //   );

  //   // Open dialog and add comment
  //   fireEvent.click(screen.getByTestId('MessageCircleIcon'));

  //   const commentInput = screen.getByTestId('commentInput');
  //   fireEvent.change(commentInput, { target: { value: 'New comment' } });

  //   const postButton = screen.getByText('Post');
  //   fireEvent.click(postButton);

  //   // Wait for comment submission
  //   await waitFor(() => {
  //     expect(screen.getByText('New comment')).toBeInTheDocument();
  //   });
  // });
});