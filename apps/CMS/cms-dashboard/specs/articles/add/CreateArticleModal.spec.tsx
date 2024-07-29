import React from 'react';
import { fireEvent, render, act } from '@testing-library/react';
import CreateArticleModal from '@/app/articles/_components/add/CreateArticleModal';

describe('CreateArticleModal Component', () => {
  it('1. renders CreateArticle modal when openModal is called', () => {
    const mockFunction = jest.fn();
    const { getByTestId } = render(<CreateArticleModal isVisible={true} onClose={mockFunction} handleSubmit={mockFunction} />);
    const articleModal = getByTestId('blackBackground');
    expect(articleModal).toBeDefined();
  });

  it('2. should not render CreateArticleModal modal', () => {
    const mockFunction = jest.fn();
    const mockContent = 'mockContent';
    const { queryByText } = render(<CreateArticleModal isVisible={false} onClose={mockFunction} handleSubmit={mockFunction} />);
    expect(queryByText(mockContent)).toBeNull();
  });

  it('3. calls onClose when close button is clicked', () => {
    const mockFunction = jest.fn();
    const { getByTestId } = render(<CreateArticleModal isVisible={true} onClose={mockFunction} handleSubmit={mockFunction} />);
    const closeButton = getByTestId('modal-close-button');
    act(() => {
      fireEvent.click(closeButton);
    });
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });

  it('4. calls onClose when background clicked', () => {
    const mockFunction = jest.fn();
    const { getByTestId } = render(<CreateArticleModal isVisible={true} onClose={mockFunction} handleSubmit={mockFunction} />);
    const background = getByTestId('blackBackground');
    act(() => {
      fireEvent.click(background);
    });
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });
});
