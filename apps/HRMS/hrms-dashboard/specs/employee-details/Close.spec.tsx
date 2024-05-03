import { render } from '@testing-library/react';
import React from 'react';
import { Close } from '../../src/app/asset';


describe('Close icon', () => {
 
  test('close icon defined', () => {
    const { getByTestId} = render(<Close />);
  
    const closeIcon = getByTestId('close-icon');
    expect(closeIcon).toBeDefined();
    expect(closeIcon).not.toBeNull();

  });
});
