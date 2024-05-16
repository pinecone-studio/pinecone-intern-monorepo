import Courses from '../../../src/app/dashboard/_components/Course';
import { render } from '@testing-library/react';
import React from 'react';

describe('Course component', () => {
  const props = {
    id: '123',
    thumbnail: 'img',
    title: 'mocktitle',
    description: 'mock des',
    length: 3,
    loading: false,
  };

  it('renders with correct props and structure', () => {
    const { getByTestId } = render(<Courses {...props} />);

    expect(getByTestId('courseContain')).toBeDefined();
  });
});
