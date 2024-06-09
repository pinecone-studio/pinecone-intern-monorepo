import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HeaderComp } from '../../src/app/_report/_components';

describe('HeaderComp', () => {
  it('renders without crashing', () => {
    render(<HeaderComp />);
  });

  it('displays default date text when no date is selected', () => {
    const { getByText } = render(<HeaderComp />);
    expect(getByText('7 хоног сонгох')).toBeInTheDocument();
  });

  it('opens dialog on button click', () => {
    const { getByText, getByRole } = render(<HeaderComp />);
    fireEvent.click(getByText('Репорт үүсгэх'));
    expect(getByRole('dialog')).toBeInTheDocument();
  });
});
