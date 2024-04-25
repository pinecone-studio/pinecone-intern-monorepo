import React from 'react';
import { render } from '@testing-library/react';
import CourseDesc from '../../src/app/Lesson/component/CourseDesc';

describe('CourseDesc component', () => {
  it('renders description correctly', () => {
    const description = 'This is a test description';
    const { getByText } = render(<CourseDesc description={description} />);
    expect(getByText(description)).toBeInTheDocument();
  });

  it('applies styles correctly', () => {
    const description = 'This is a test description';
    const { getByText } = render(<CourseDesc description={description} />);
    const typographyElement = getByText(description);
    expect(typographyElement).toHaveStyle({
      width: '950px',
      fontSize: '18px'
    });
  });
});
