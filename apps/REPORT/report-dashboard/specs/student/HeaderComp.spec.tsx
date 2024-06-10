import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { HeaderComp } from '../../src/app/_report/_components';
import '@testing-library/jest-dom';
import { act } from '@testing-library/react';

describe('HeaderComp', () => {
  it('renders without crashing', () => {
    render(<HeaderComp />);
  });

  it('opens dialog on button click', () => {
    const { getByText, getByRole } = render(<HeaderComp />);
    fireEvent.click(getByText('Репорт үүсгэх'));
    const dialog = getByRole('dialog');
    expect(dialog).toBeInTheDocument();
  });

  it('displays correct date range', () => {
    const { getByText, getByRole, getByTestId } = render(<HeaderComp />);
    const button = getByRole('button', { name: 'date' });
    fireEvent.click(button);
    const startDate = getByText('7 хоног сонгох');
    const dateBtn = getByTestId('date');

    act(() => {
      fireEvent.click(dateBtn);
    });
    expect(startDate).toBeInTheDocument();
  });
});
