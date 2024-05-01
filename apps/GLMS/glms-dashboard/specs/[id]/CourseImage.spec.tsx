import React from 'react';
import { render } from '@testing-library/react';
import CourseImage from '../../src/app/[id]/_components/CourseImage';

describe('CourseImage component', () => {
  it('renders image correctly', () => {
    const contentImage = 'https://example.com/image.jpg';
    const { getByTestId } = render(<CourseImage contentImage={contentImage} />);
    const content = getByTestId('course-image-test-id')
    expect(content).toBeDefined()
  });
});