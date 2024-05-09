import { render } from '@testing-library/react';
import React from 'react';
import { AddIcon } from '../../src/assets/icon/AddIcon';

describe('add icon', () => {
  test('add icon defined', () => {
    const { getByTestId } = render(<AddIcon />);
    const closeIcon = getByTestId('add-icon');
    expect(closeIcon).toBeDefined();
    expect(closeIcon).not.toBeNull();
  });
});
