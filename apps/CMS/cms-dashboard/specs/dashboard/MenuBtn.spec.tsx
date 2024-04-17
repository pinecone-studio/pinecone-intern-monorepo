import { render, fireEvent, act } from '@testing-library/react';
import React from 'react';
import { MenuBtn } from '../../src/app/dashboard/_components/MenuBtn'

describe('MenuBar', () => {
  it('1. Should render menu button component', async () => {
    const setSelected = jest.fn();
    const menu = 'Test'
    const { getByTestId } = render(<MenuBtn menu='Test' selected="Test Button" setSelected={setSelected} number={18}/>)

    const title = getByTestId('title-test-id');
    const number = getByTestId('number-test-id');
    expect(title).toBeDefined();
    expect(number).toBeDefined();

    

    await act(() =>{ fireEvent.click(getByTestId('menu-btn-test-id')) })

    expect(setSelected).toHaveBeenCalledWith(menu)

  });
  it('1. Should render menu button component', () => {
    const setSelected = jest.fn();
    const menu = 'Test'
    const { getByTestId } = render(<MenuBtn menu='Test' selected="Test" setSelected={setSelected} number={18}/>)

    fireEvent.click(getByTestId('menu-btn-test-id'));
    expect(setSelected).toHaveBeenCalledWith(menu)
  });
});