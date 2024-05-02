import React from 'react';
import { render } from '@testing-library/react';
import SectionForm from '../../src/app/section/_components/SectionForm'

describe('SectionForm', () => {
  test('should take correct props', () => {
    const title = 'Test Title';
    const description = 'Test Description';

    const { getByTestId } = render(
      <SectionForm title={title} description={description} />
    );

    const titleInput = getByTestId('title') as HTMLInputElement;
    const descriptionInput = getByTestId('description') as HTMLInputElement;

    expect(titleInput.value).toBe(title);
    expect(descriptionInput.value).toBe(description);
  });
})
