import React from 'react';
import { render } from '@testing-library/react';
import CourseTitle from '../../src/app/Lesson/component/CourseTitle';

describe('CourseDesc component', () => {
  it('renders description correctly', () => {
    const title = 'This is a test title.';
    const { getByTestId } = render(<CourseTitle title={title} />);
    const titleElement = getByTestId('course-title-test-id');
    expect(titleElement.textContent).toBe(title);
  });
});
