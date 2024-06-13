import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { SelectDashboard } from '../../src/app/_topic/_features/SelectDashboard';

describe('SelectDashboard', () => {
  it('renders menu items', () => {
    const { getByText } = render(<SelectDashboard />);
    expect(getByText('Репорт'));
    expect(getByText('Сэдэв'));
    expect(getByText('Сурагч'));
  });

  it('selects menu item on click', () => {
    const { getByText } = render(<SelectDashboard />);
    fireEvent.click(getByText('Сэдэв'));
    expect(getByText('Сэдэв')).toHaveClass('bg-black');
  });
});
