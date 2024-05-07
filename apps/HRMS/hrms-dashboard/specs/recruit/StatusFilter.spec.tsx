import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { StatusFilter } from '../../src/app/recruiting/_components';

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
