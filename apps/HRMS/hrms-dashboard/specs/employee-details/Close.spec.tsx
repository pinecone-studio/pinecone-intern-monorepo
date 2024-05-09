import { render } from '@testing-library/react';
import React from 'react';
import { CloseSvg } from '../../src/assets/icon/CloseSvg';

describe('Close icon', () => {
  test('close icon defined', () => {
    const { getByTestId } = render(<CloseSvg />);
    const closeIcon = getByTestId('close-icon');
    expect(closeIcon).toBeDefined();
    expect(closeIcon).not.toBeNull();
  });
});
