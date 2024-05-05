import React from 'react';
import { render } from '@testing-library/react';
import RichTextEditor from '../../../src/app/articles/_components/create-article/RichTextEditor';

describe('RichText Editor Component', () => {
  it('1. Should render RichText Editor Component', () => {
    const { getByTestId } = render(<RichTextEditor content='content' />);
    const editor = getByTestId('quillEditor');
    expect(editor).toBeDefined();
  });
});
