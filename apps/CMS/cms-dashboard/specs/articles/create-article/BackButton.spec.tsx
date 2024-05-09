import React from 'react';
import {  render } from '@testing-library/react';
import BackButton from '../../../src/app/articles/_components/create-article/BackButton';

describe('Create Article BackButton component', () => {
  it('1. Should render the correct props', () => {
   
    const { getByTestId } = render(<BackButton  />);
    const backButton = getByTestId('back-button');
    expect(backButton).toBeDefined();
  });


});
