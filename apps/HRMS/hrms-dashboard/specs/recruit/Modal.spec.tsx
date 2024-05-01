import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { CreateErrorModal } from '../../src/app/recruiting/_features';
import Image from 'next/image';
import deleted from '../../src/app/recruiting/_components/asset/icons/successDeleted.png';
import created from '../../src/app/recruiting/_components/asset/icons/successCreated.png';

describe('<CreateErrorModal />', () => {
  test('modal close and open when label and close button is clicked', () => {
    const { getByText, getByTestId, queryByTestId } = render(<CreateErrorModal text="Aмжилттай устлаа" label="Устгах" />);

    const buttonElement = getByText('Устгах');
    expect(getByText('Устгах')).toBeDefined();
    fireEvent.click(buttonElement);

    const modalElementBefore = queryByTestId('modal');
    expect(modalElementBefore).toBeDefined();

    const closeButton = getByTestId('close-button');
    fireEvent.click(closeButton);

    const modalElementAfter = queryByTestId('modal');
    expect(modalElementAfter).toBeDefined();
  });
  test('renders correct message based on label prop', () => {
    const text = 'Test Message';
    const labelDelete = 'Устгах';
    const alt = 'png';
    const src = deleted.src;

    const { getByTestId: getByTestIdEdit } = render(<CreateErrorModal text={text} label={labelDelete} />);
    render(<Image src={src} alt={alt} width={50} height={50} />);

    const img = getByTestIdEdit('modal').querySelector('img');
    expect(img!.getAttribute('alt')).toBe(alt);
  });
  test('renders correct message based on label prop', () => {
    const text = 'Test Message';
    const labelEdit = 'Засварлах';
    const alt = 'png';
    const src = created.src;

    const { getByTestId: getByTestIdEdit } = render(<CreateErrorModal text={text} label={labelEdit} />);
    render(<Image src={src} alt={alt} width={50} height={50} />);

    const img = getByTestIdEdit('modal').querySelector('img');
    expect(img!.getAttribute('alt')).toBe(alt);
  });
});
