import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { CreateErrorModal } from '../../src/app/recruiting/_features';

describe('<CreateErrorModal />', () => {
  test('modal close and open when label "Устгах" and close button is clicked', () => {
    const text = 'Test Message';
    const labelDelete = 'Устгах';
    const { getByText, getByTestId, queryByTestId } = render(<CreateErrorModal text={text} label={labelDelete} />);

    const buttonElement = getByText('Устгах');
    expect(buttonElement).toBeDefined();
    fireEvent.click(buttonElement);

    const modalElementBefore = queryByTestId('modal');
    expect(modalElementBefore).toBeDefined();

    const deletedSvg = getByTestId('deleted-svg');
    expect(deletedSvg).toBeDefined();

    const closeButton = getByTestId('close-button');
    fireEvent.click(closeButton);

    const modalElementAfter = queryByTestId('modal');
    expect(modalElementAfter).toBeDefined();
  });

  test('modal close and open when label "Засварлах" and close button is clicked', () => {
    const text = 'Test Message';
    const labelEdit = 'Засварлах';
    const { getByText, getByTestId, queryByTestId } = render(<CreateErrorModal text={text} label={labelEdit} />);

    const buttonElement = getByText('Засварлах');
    expect(buttonElement).toBeDefined();
    fireEvent.click(buttonElement);

    const modalElementBefore = queryByTestId('modal');
    expect(modalElementBefore).toBeDefined();

    const createdSvg = getByTestId('created-svg');
    expect(createdSvg).toBeDefined();

    const closeButton = getByTestId('close-button');
    fireEvent.click(closeButton);

    const modalElementAfter = queryByTestId('modal');
    expect(modalElementAfter).toBeDefined();
  });
});
