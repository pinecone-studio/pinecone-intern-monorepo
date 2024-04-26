import React from 'react';
import { render } from '@testing-library/react';
import CourseImage from '../../src/app/Lesson/component/CourseImage';

describe('CourseImage component', () => {
  it('renders image correctly', () => {
    const contentImage = 'https://example.com/image.jpg';
    const { getByTestId } = render(<CourseImage contentImage={contentImage} />);
  });
});
