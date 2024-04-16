import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { MenuBtn } from '../../../src/app/dashboard/_components/MenuBtn'

describe('MenuBar', () => {
  it('1. Should render menu button component', () => {
    const setSelected = jest.fn();
    const menu = 'Test'
    const { getByTestId } = render(<MenuBtn menu='Test' selected="Test Button" setSelected={setSelected} number={18}/>)

    const buttonElement = getByTestId('cypress-title');
    const buttonElementNum = getByTestId('cypress-num');

    fireEvent.click(getByTestId('menu-btn-test-id'));
    expect(setSelected).toHaveBeenCalledWith(menu)

    expect(buttonElement).toBeTruthy();
    expect(buttonElementNum).toBeTruthy();
  });
  it('1. Should render menu button component', () => {
    const setSelected = jest.fn();
    const menu = 'Test'
    const { getByTestId } = render(<MenuBtn menu='Test' selected="Test" setSelected={setSelected} number={18}/>)

    fireEvent.click(getByTestId('menu-btn-test-id'));
    expect(setSelected).toHaveBeenCalledWith(menu)
  });
});