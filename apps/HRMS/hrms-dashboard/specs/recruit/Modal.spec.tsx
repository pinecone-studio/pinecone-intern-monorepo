import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { CreateErrorModal } from '../../src/app/recruiting/_components';
import { CreatedSvg, DeletedSvg } from '../../src/assets';

describe('<CreateErrorModal />', () => {
  describe('DeletedSvg', () => {
    it('renders DeletedSvg correctly', () => {
      const { getByTestId } = render(<DeletedSvg />);
      const svgElement = getByTestId('deleted-svg');
      expect(svgElement).toBeDefined();
    });
  });
  describe('CreatedSVG', () => {
    it('renders CreatedSvg correctly', () => {
      const { getByTestId } = render(<CreatedSvg />);
      const svgElement = getByTestId('created-svg');
      expect(svgElement).toBeDefined();
    });
  });
  it('modal close and open when label "Хадгалах" and close button is clicked', () => {
    const onClick = jest.fn();
    const onClose = jest.fn();
    const text = 'Хадгалах';
    const labelEdit = 'Хадгалах';

    const { getByText, getByTestId, queryByTestId } = render(<CreateErrorModal onClick={onClick} onClose={onClose} text={text} labelType={labelEdit} />);

    const buttonElement = getByText('Хадгалах');
    expect(buttonElement).toBeDefined();
    fireEvent.click(buttonElement);
    expect(onClick).toBeDefined();
    const modalElementBefore = queryByTestId('modal');
    expect(modalElementBefore).toBeDefined();

    const closeButton = getByTestId('close-button');
    fireEvent.click(closeButton);
    expect(onClose).toBeDefined();

    const buttonDialog = getByTestId('button-modal');
    expect(buttonDialog).toBeDefined();

    const modalElementAfter = queryByTestId('modal');
    expect(modalElementAfter).toBeDefined();
  });
  it('modal close and open when label "Устгах" and close button is clicked', () => {
    const onClick = jest.fn();
    const onClose = jest.fn();
    const text = 'Устгах';
    const labelDelete = 'Устгах';
    const { getByText, getByTestId, queryByTestId } = render(<CreateErrorModal text={text} labelType={labelDelete} />);

    const buttonElement = getByText('Устгах');
    expect(buttonElement).toBeDefined();
    fireEvent.click(buttonElement);
    expect(onClick).toBeDefined();
    const modalElementBefore = queryByTestId('modal');
    expect(modalElementBefore).toBeDefined();

    const closeButton = getByTestId('close-button');
    fireEvent.click(closeButton);
    expect(onClose).toBeDefined();
    const buttonDialog = getByTestId('button-modal');
    expect(buttonDialog).toBeDefined();

    const modalElementAfter = queryByTestId('modal');
    expect(modalElementAfter).toBeDefined();
  });
});
