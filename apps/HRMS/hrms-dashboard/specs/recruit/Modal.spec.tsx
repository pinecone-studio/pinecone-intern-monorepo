import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { CreateErrorModal } from '../../src/app/recruiting/_features';

describe('<CreateErrorModal />', () => {
  test('modal closes when close button is clicked', () => {
    const { getByText, getByTestId, queryByTestId } = render(<CreateErrorModal text="Aмжилттай үүслээ" label="Зар нэмэх" />);
    const buttonElement = getByText('Зар нэмэх');
    fireEvent.click(buttonElement);
    const modalElementBefore = queryByTestId('error-modal');
    expect(modalElementBefore).toBeDefined();

    const closeButton = getByTestId('close-button');
    fireEvent.click(closeButton);
    const modalElementAfter = queryByTestId('error-modal');
    expect(modalElementAfter).toBeDefined();
  });
});
