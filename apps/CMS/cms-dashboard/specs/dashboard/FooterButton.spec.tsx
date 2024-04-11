import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { FooterButton } from '../../src/app/dashboard/_components/FooterButton';

describe('FooterButton', () => {
  it('1. Should render footer button component', () => {
    const setSelectedButtonMock = jest.fn();
    const { getByTestId } = render(<FooterButton text="Test Button" selectedButton="Test Button" setSelectedButton={setSelectedButtonMock} />);

    const buttonElement = getByTestId('footer-button-test-id');
    expect(buttonElement).toBeDefined();
  });

  it('2. should call button when clicked', () => {
    const setSelectedButtonMock = jest.fn();

    const { getByTestId } = render(<FooterButton text="Test Button" selectedButton="Selected Button" setSelectedButton={setSelectedButtonMock} />);

    const buttonElement = getByTestId('footer-button-test-id');

    fireEvent.click(buttonElement);

    expect(setSelectedButtonMock).toHaveBeenCalledWith('Test Button');
  });

  it('3. should have a background color when selectedButton matches with text', () => {
    const setSelectedButtonMock = jest.fn();

    const { getByTestId } = render(<FooterButton text="Test Button" selectedButton="Test Button" setSelectedButton={setSelectedButtonMock} />);

    const buttonElement = getByTestId('footer-button-test-id');

    expect(buttonElement).toBeDefined();
  });

  it('4. should not have background when selectedButton does not matches with text', () => {
    const setSelectedButtonMock = jest.fn();

    const { getByTestId } = render(<FooterButton text="Test Button" selectedButton="Button" setSelectedButton={setSelectedButtonMock} />);

    const buttonElement = getByTestId('footer-button-test-id');

    expect(buttonElement).toBeDefined();
  });
});
