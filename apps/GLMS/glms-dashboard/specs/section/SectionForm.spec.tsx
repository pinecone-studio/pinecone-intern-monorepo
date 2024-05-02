import React from 'react';
import { render } from '@testing-library/react';
import SectionForm from '../../src/app/section/_components/SectionForm'

describe('SectionForm', () => {
  test('should take correct props', () => {

    const { getByTestId } = render(
      <SectionForm title='Test Title' description='Test description' />
    );

    const title = getByTestId('title')
    const description = getByTestId('description')
 
    expect(title.textContent).toMatch('Test Title')
    expect(description.textContent).toBe('Test description');
  });
})
