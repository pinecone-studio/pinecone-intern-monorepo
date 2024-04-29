import Course from '../../../src/app/dashboard/_components/Course';
import { render } from '@testing-library/react';
import React from 'react';

describe('Course component', () => {
  const props = {
    image: 'https.//pinecone',
    title: 'HTML',
    information: 'hi welcome to my code',
    lessonCount: 12,
  };

  it('renders with correct props and structure', () => {

    const { getByTestId } = render(<Course {...props} />);


    

    expect(getByTestId('courseContain')).toBeDefined();
  });
});
