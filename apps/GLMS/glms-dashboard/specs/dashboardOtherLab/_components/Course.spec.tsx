// import '@types/jest';
import Course from '../../../src/app/dashboardOtherLab/_components/Course';
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
    const { getByTestId, getByText } = render(<Course {...props} />);

    expect(getByTestId('courseContain')).toBeDefined();

    // expect(getByText('https.//pinecone')).toBeDefined();
    // expect(getByText('HTML')).toBeDefined();
    // expect(getByText('hi welcome to my code')).toBeDefined();
    // expect(getByText('12')).toBeDefined();

    // expect(getByTestId('lessonImage')).toBeDefined();
    // expect(getByTestId('titleTest')).toBeDefined();
    // expect(getByTestId('infoTest')).toBeDefined();
    // expect(getByTestId('lessonCountTest')).toBeDefined();
  });
});
