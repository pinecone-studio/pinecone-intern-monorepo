import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateCommentsCard from '../../src/app/comments/_components/CreateCommentsCard';
import { usePublishCommentMutation } from '@/generated';

// Mock the usePublishCommentMutation hook from '@/generated
jest.mock('@/generated', () => ({
  usePublishCommentMutation: jest.fn(),
}));

describe('CreateCommentsCard', () => {
  const articleId = '123';
  const mockSubmit = jest.fn();

  beforeAll(() => {
    usePublishCommentMutation.mockReturnValue([mockSubmit]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('1. Should render CreateCommentsCard component', () => {
    render(<CreateCommentsCard articleId={articleId} />);
    expect(screen.getByPlaceholderText(/Цахим хаягаа оруулна уу.../i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Таны нэр/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Энд сэтгэгдлээ бичнэ үү.../i)).toBeInTheDocument();
    expect(screen.getByTestId('create-comment-button')).toBeInTheDocument();
  });

  it('2. Should handle input changes', () => {
    render(<CreateCommentsCard articleId={articleId} />);

    const emailInput = screen.getByPlaceholderText(/Цахим хаягаа оруулна уу.../i);
    const nameInput = screen.getByPlaceholderText(/Таны нэр/i);
    const commentInput = screen.getByPlaceholderText(/Энд сэтгэгдлээ бичнэ үү.../i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(commentInput, { target: { value: 'This is a test comment' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(nameInput.value).toBe('Test User');
    expect(commentInput.value).toBe('This is a test comment');
  });

  it('3. Should handle form submission', async () => {
    render(<CreateCommentsCard articleId={articleId} />);

    const emailInput = screen.getByPlaceholderText(/Цахим хаягаа оруулна уу.../i);
    const nameInput = screen.getByPlaceholderText(/Таны нэр/i);
    const commentInput = screen.getByPlaceholderText(/Энд сэтгэгдлээ бичнэ үү.../i);
    const submitButton = screen.getByTestId('create-comment-button');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(commentInput, { target: { value: 'This is a test comment' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        variables: {
          createInput: {
            name: 'Test User',
            email: 'test@example.com',
            comment: 'This is a test comment',
            articleId: '123',
            entityId: '123',
            entityType: 'user',
          },
        },
      });
    });
  });

  it('4. Should handle form submission error', async () => {
    const errorMock = jest.fn(() => {
      throw new Error('Submission error');
    });

    usePublishCommentMutation.mockReturnValue([errorMock]);

    render(<CreateCommentsCard articleId={articleId} />);

    const emailInput = screen.getByPlaceholderText(/Цахим хаягаа оруулна уу.../i);
    const nameInput = screen.getByPlaceholderText(/Таны нэр/i);
    const commentInput = screen.getByPlaceholderText(/Энд сэтгэгдлээ бичнэ үү.../i);
    const submitButton = screen.getByTestId('create-comment-button');

    fireEvent.click(submitButton);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(commentInput, { target: { value: 'This is a test comment' } });
  });
  it('5. Should submit form with filled inputs', async () => {
    const mockPublishComment = jest.fn();
    usePublishCommentMutation.mockReturnValue([mockPublishComment]);

    const { getByTestId, getByPlaceholderText } = render(<CreateCommentsCard articleId="123" />);
    const emailInput = getByPlaceholderText('Цахим хаягаа оруулна уу...');
    const nameInput = getByPlaceholderText('Таны нэр');
    const commentInput = getByPlaceholderText('Энд сэтгэгдлээ бичнэ үү...');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(commentInput, { target: { value: 'This is a test comment' } });

    const submitButton = getByTestId('create-comment-button');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockPublishComment).toHaveBeenCalledWith({
        variables: {
          createInput: {
            email: 'test@example.com',
            name: 'Test User',
            comment: 'This is a test comment',
            articleId: '123',
            entityId: '123',
            entityType: 'user',
          },
        },
      });
    });
  });
});
