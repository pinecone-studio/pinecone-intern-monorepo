import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { SelectDashboard } from '../../src/app/topic/_features//SelectDashboard';
import { act } from 'react-dom/test-utils';

describe('SelectDashboard component', () => {
  it('renders menu items correctly', () => {
    const { getByTestId } = render(<SelectDashboard />);
    expect(getByTestId('option-1')).toBeDefined();
  });

  it('selects menu item correctly', () => {
    const { getByTestId } = render(<SelectDashboard />);
    act(() => {
      fireEvent.click(getByTestId('option-2'));
    });
    expect(getByTestId('Black-2')).toBeDefined();
  });
});
