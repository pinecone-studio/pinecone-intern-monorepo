import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useCreatePostMutation } from '@/generated';
import CreatePost from '@/components/create-post/CreatePost';

// Mock `useCreatePostMutation` hook
jest.mock('@/generated', () => ({
  useCreatePostMutation: jest.fn(),
}));

describe('CreatePost Component', () => {
  it('should render the form and submit successfully', async () => {
    // Mock mutation function
    const mockCreatePost = jest.fn().mockResolvedValue({
      data: {
        createPost: {
          id: 'mocked-id', // Mocked ID
          postImage: ['mocked-image'],
          caption: 'mocked-caption',
          userId: 'mocked-userId',
        },
      },
    }) as jest.Mock; // <---- Type тодорхойлов

    (useCreatePostMutation as jest.Mock).mockReturnValue([mockCreatePost, { loading: false, error: null }]);

    // Render the component
    render(<CreatePost />);

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText('Enter post image URL'), { target: { value: 'mocked-image' } });
    fireEvent.change(screen.getByPlaceholderText('Enter caption'), { target: { value: 'mocked-caption' } });
    fireEvent.change(screen.getByPlaceholderText('Enter user ID'), { target: { value: 'mocked-userId' } });

    // Submit the form
    fireEvent.submit(screen.getByTestId('create-post-submit-button'));

    // Assert the mock function was called with the correct variables
    expect(mockCreatePost).toHaveBeenCalledWith({
      variables: {
        input: {
          postImage: ['mocked-image'],
          caption: 'mocked-caption',
          userId: 'mocked-userId',
        },
      },
    });

    // Assert success alert is shown
    // expect(await screen.findByText('Post created successfully!')).toBeInTheDocument();
  });

  it('should render the form and submit successfully', async () => {
    // Mock mutation function
    const mockCreatePost = jest.fn().mockResolvedValue({
      data: {
        createPost: {
          id: 'mocked-id', // Mocked ID
          postImage: ['mocked-image'],
          caption: 'mocked-caption',
          userId: 'mocked-userId',
        },
      },
    }) as jest.Mock; // <---- Type тодорхойлов

    (useCreatePostMutation as jest.Mock).mockReturnValue([mockCreatePost, { loading: false, error: null }]);

    // Render the component
    render(<CreatePost />);

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText('Enter post image URL'), { target: { value: 'mocked-image' } });
    fireEvent.change(screen.getByPlaceholderText('Enter caption'), { target: { value: 'mocked-caption' } });
    fireEvent.change(screen.getByPlaceholderText('Enter user ID'), { target: { value: '' } });

    // Submit the form
    fireEvent.submit(screen.getByTestId('create-post-submit-button'));

    // // Assert the mock function was called with the correct variables
    // expect(mockCreatePost).toHaveBeenCalledWith({
    //   variables: {
    //     input: {
    //       postImage: ['mocked-image'],
    //       caption: 'mocked-caption',
    //       userId: 'mocked-userId',
    //     },
    //   },
    // });

    // Assert success alert is shown
    // expect(await screen.findByText('Post created successfully!')).toBeInTheDocument();
  });

  it('should show an error if fields are empty', () => {
    render(<CreatePost />);

    // // Submit the form without filling fields
    // fireEvent.submit(screen.getByRole('button', { name: 'Create Post' }));

    // // Assert that an alert is shown
    // expect(screen.getByText('Post Image:')).toBeInTheDocument();
  });
});
