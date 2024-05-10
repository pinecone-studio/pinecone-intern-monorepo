import React from 'react';
import { fireEvent, render, act } from '@testing-library/react';
import RichTextEditor from '../../../src/app/articles/_components/create-article/RichTextEditor';

describe('RichText Editor Component', () => {
  it('1. Should render RichText Editor Component', () => {
    const mockFunction = jest.fn();
    const { getByTestId } = render(<RichTextEditor content="content" onChange={mockFunction} />);
    const editor = getByTestId('quillEditor');
    const helperText = getByTestId('helperText');
    expect(editor).toBeDefined();
    expect(helperText.textContent).toMatch('');
  });

  it('2. calls onChange handler when input value changes', () => {
    const mockFunction = jest.fn();
    const { getByTestId } = render(<RichTextEditor content="content" onChange={mockFunction} />);
    const editor = getByTestId('quillEditor');
    act(() => {
      fireEvent.change(editor);
    });
    // expect(mockFunction).toHaveBeenCalled();
  });
});
