import { render, fireEvent, act } from '@testing-library/react';
import React from 'react';
import { MenuAllBtn } from '../../src/app/dashboard/_components/MenuAllBtn'

describe('MenuBar', () => {
  it('1. Should render menu button component', async () => {
    const setStatus = jest.fn();
    const statusName = 'Test'
    const { getByTestId } = render(<MenuAllBtn statusName='Test' status="Test Button" setStatus={setStatus} number={18}/>)

    const title = getByTestId('title-test-id');
    const number = getByTestId('number-test-id');
    expect(title).toBeDefined();
    expect(number).toBeDefined();

    await act(() =>{ fireEvent.click(getByTestId('menu-btn-test-id')) })

    expect(setStatus).toHaveBeenCalledWith(statusName)

  });
  it('1. Should render menu button component', () => {
    const setStatus = jest.fn();
    const statusName = 'Test'
    const { getByTestId } = render(<MenuAllBtn statusName='Test' status="Test" setStatus={setStatus} number={18}/>)

    fireEvent.click(getByTestId('menu-btn-test-id'));
    expect(setStatus).toHaveBeenCalledWith(statusName)
  });
});