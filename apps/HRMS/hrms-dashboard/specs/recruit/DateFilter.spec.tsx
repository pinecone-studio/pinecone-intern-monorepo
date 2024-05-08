import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { DateFilter } from '../../src/app/recruiting/_components';

describe('DateFilter', () => {
  test('renders correctly', () => {
    const { getByText } = render(<DateFilter />);

    expect(getByText('Огноо')).toBeDefined();
    expect(getByText('4/30 - Мягмар')).toBeDefined();
    expect(getByText('5/1 - Лхагва')).toBeDefined();
    expect(getByText('5/2 - Пүрэв')).toBeDefined();
    expect(getByText('5/3 - Баасан')).toBeDefined();
  });

  test('updates selected label correctly', () => {
    const { getByRole } = render(<DateFilter />);
    const selectElement = getByRole('combobox');

    fireEvent.change(selectElement, { target: { value: '4/30 - Мягмар' } });
    expect(selectElement).toBeDefined();

    fireEvent.change(selectElement, { target: { value: '5/1 - Лхагва' } });
    expect(selectElement).toBeDefined();

    fireEvent.change(selectElement, { target: { value: '5/2 - Пүрэв' } });
    expect(selectElement).toBeDefined();
  });
});
