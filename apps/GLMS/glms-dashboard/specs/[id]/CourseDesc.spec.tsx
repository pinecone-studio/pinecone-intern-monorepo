import React from 'react';
import { render } from '@testing-library/react';
import CourseDesc from '../../src/app/[id]/_components/CourseDesc';

describe('CourseDesc component', () => {
  it('renders description correctly', () => {
    const description = 'This is a test description.';
    const { getByTestId } = render(<CourseDesc description={description} />);
    const descriptionElement = getByTestId('course-desc-test-id');
    expect(descriptionElement.textContent).toBe(description);
  });
});