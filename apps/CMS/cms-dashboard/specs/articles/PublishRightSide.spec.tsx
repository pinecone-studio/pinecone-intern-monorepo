import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PublishRightSide from '../../src/app/articles/_components/PublishRightSide';

describe('PublishRightSide', () => {
  it('renders PublishRightSide component', () => {
    const { getByTestId } = render(<PublishRightSide />);
    
    const commentHeaderText = getByTestId('comment-header-text')
    expect(commentHeaderText.textContent).toMatch('Сэтгэгдэл идэвхтэй');
  
    const imageFieldText = getByTestId('image-field-text')
    expect(imageFieldText.textContent).toMatch('Өнгөц зураг');
  
    const saveDraftButton = getByTestId('save-draft-button')
    expect(saveDraftButton.textContent).toMatch('Ноорогт хадгалах');
  
    const publishButton = getByTestId('publish-button')
    expect(publishButton.textContent).toMatch('Нийтлэх');
  });
  
  it('handles switch change', () => {
    const { getByTestId } = render(<PublishRightSide />);
    const switchInput = getByTestId('switch-input');
  
    fireEvent.click(switchInput);
  
    expect(switchInput).toBeDefined();
  });
})
