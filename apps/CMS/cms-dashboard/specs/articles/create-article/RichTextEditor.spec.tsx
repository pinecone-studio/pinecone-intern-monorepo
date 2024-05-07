import React from 'react';
import { render } from '@testing-library/react';
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
});
