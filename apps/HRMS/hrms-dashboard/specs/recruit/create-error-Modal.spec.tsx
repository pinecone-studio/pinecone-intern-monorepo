import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { CreateerrorModal } from '../../src/app/recruiting/_components';

describe('<CreateErrorModal />', () => {
  test('modal closes when close button is clicked', () => {
    const { getByText, getByTestId, queryByTestId } = render(<CreateerrorModal text="Aмжилттай faildlee" label="Зар hasah" />);
    const buttonElement = getByText('Зар hasah');
    fireEvent.click(buttonElement);
    const modalElementBefore = queryByTestId('error-modal');
    expect(modalElementBefore).toBeDefined();

    const closeButton = getByTestId('close-button');
    fireEvent.click(closeButton);
    const modalElementAfter = queryByTestId('error-modal');
    expect(modalElementAfter).toBeDefined();
  });
});
