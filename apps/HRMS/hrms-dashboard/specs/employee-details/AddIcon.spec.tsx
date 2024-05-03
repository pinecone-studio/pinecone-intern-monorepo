import { render } from '@testing-library/react';
import React from 'react';
import { AddIcon } from '../../src/app/asset';


describe('add icon', () => {
 
  test('add icon defined', () => {
    const { getByTestId} = render(<AddIcon />);
  
    const addIcon = getByTestId('add-icon');
    expect(addIcon).toBeDefined();
    expect(addIcon).not.toBeNull();

  });
});
