import React from 'react';
import { render } from '@testing-library/react';
import SectionForm from '../../../src/app/section/_components/SectionForm';

describe('SectionForm', () => {
    const props = {
         title : 'Test Title',
         description :'Test Description',
         contentImage : 'test-image-url.jpg',
    } ;
  it('renders section form with provided title, description, and content image', () => {
 

    const { getByTestId } = render(
      <SectionForm {...props} />
    );

  
    expect(getByTestId('section-form')).toBeDefined();
  });
});
