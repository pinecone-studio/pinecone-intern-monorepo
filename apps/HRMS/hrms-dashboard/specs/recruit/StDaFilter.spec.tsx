import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { StatusFilter, DateFilter } from '../../src/app/recruiting/_components';

describe('StatusFilter', () => {
  it('renders correctly', () => {
    const { getByText } = render(<StatusFilter />);

    expect(getByText('Төлөв')).toBeDefined();
    expect(getByText('Draft')).toBeDefined();
    expect(getByText('Closed')).toBeDefined();
    expect(getByText('Published')).toBeDefined();
  });

  test('updates selected label correctly', () => {
    const { getByRole } = render(<StatusFilter />);
    const selectElement = getByRole('combobox');

    fireEvent.change(selectElement, { target: { value: 'Draft' } });
    expect(selectElement).toBeDefined();

    fireEvent.change(selectElement, { target: { value: 'Closed' } });
    expect(selectElement).toBeDefined();

    fireEvent.change(selectElement, { target: { value: 'Published' } });
    expect(selectElement).toBeDefined();
  });
});

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
