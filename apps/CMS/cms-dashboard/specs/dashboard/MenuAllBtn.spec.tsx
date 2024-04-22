import { render, fireEvent, act } from '@testing-library/react';
import React from 'react';
import { MenuAllBtn } from '../../src/app/dashboard/_components/MenuAllBtn'

describe('MenuBar', () => {
  it('1. Should render menu button component', async () => {
    const setSelected = jest.fn();
    const status = 'Test'
    const { getByTestId } = render(<MenuAllBtn status='Test' selected="Test Button" setSelected={setSelected} number={18}/>)

    const title = getByTestId('title-test-id');
    const number = getByTestId('number-test-id');
    expect(title).toBeDefined();
    expect(number).toBeDefined();

    await act(() =>{ fireEvent.click(getByTestId('menu-btn-test-id')) })

    expect(setSelected).toHaveBeenCalledWith(status)

  });
  it('1. Should render menu button component', () => {
    const setSelected = jest.fn();
    const status = 'Test'
    const { getByTestId } = render(<MenuAllBtn status='Test' selected="Test" setSelected={setSelected} number={18}/>)

    fireEvent.click(getByTestId('menu-btn-test-id'));
    expect(setSelected).toHaveBeenCalledWith(status)
  });
});