import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { CreateErrorModal } from '../../src/app/recruiting/_features';
import { CreatedSvg, DeletedSvg } from '../../src/app/asset';

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

    const closeButton = getByTestId('close-button');
    fireEvent.click(closeButton);

    const modalElementAfter = queryByTestId('modal');
    expect(modalElementAfter).toBeDefined();
  });

  describe('DeleteSvg', () => {
    it('renders DeletedSvg correctly', () => {
      const { getByTestId } = render(<DeletedSvg />);
      const svgElement = getByTestId('deleted-svg');
      expect(svgElement).toBeDefined();
    });
  });

  test('modal close and open when label "Хадгалах" and close button is clicked', () => {
    const text = 'Test Message';
    const labelEdit = 'Хадгалах';
    const { getByText, getByTestId, queryByTestId } = render(<CreateErrorModal text={text} label={labelEdit} />);

    const buttonElement = getByText('Хадгалах');
    expect(buttonElement).toBeDefined();
    fireEvent.click(buttonElement);

    const modalElementBefore = queryByTestId('modal');
    expect(modalElementBefore).toBeDefined();

    const closeButton = getByTestId('close-button');
    fireEvent.click(closeButton);

    const modalElementAfter = queryByTestId('modal');
    expect(modalElementAfter).toBeDefined();
  });
});
describe('CreateSVG', () => {
  it('renders CreatedSvg correctly', () => {
    const { getByTestId } = render(<CreatedSvg />);
    const svgElement = getByTestId('created-svg');
    expect(svgElement).toBeDefined();
  });
});
