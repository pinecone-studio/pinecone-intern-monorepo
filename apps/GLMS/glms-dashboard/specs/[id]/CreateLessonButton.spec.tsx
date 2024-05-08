import React from 'react';
import { render } from '@testing-library/react';
import AddLessonButton from '../../src/app/[id]/_components/AddLessonButton';

describe('AddLessonButton component', () => {
  it('renders AddLessonButton', () => {
    const { getByTestId } = render(<AddLessonButton />);
    const addButton = getByTestId('add-lesson-button-test-id');
    expect(addButton).toBeDefined();
  });
});
