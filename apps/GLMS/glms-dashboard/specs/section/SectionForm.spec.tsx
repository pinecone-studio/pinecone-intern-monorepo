import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SectionForm from '../../src/app/section/_components/SectionForm'

describe('SectionForm', () => {
  test('renders with title, description, and key', () => {
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

  test('calls edit and delete functions when corresponding buttons are clicked', () => {
    const editMock = jest.fn();
    const deleteMock = jest.fn();

    const { getByText } = render(
      <SectionForm title="Test Title" description="Test Description" />
    );

    const editButton = getByText('Засах');
    const deleteButton = getByText('Устгах');

    fireEvent.click(editButton);
    fireEvent.click(deleteButton);

    expect(editMock).toHaveBeenCalled();
    expect(deleteMock).toHaveBeenCalled();
  });

  test('calls add function when add button is clicked', () => {
    const addMock = jest.fn();

    const { getByTestId } = render(
      <SectionForm title="Test Title" description="Test Description"/>
    );

    const addButton = getByTestId('add-section-handle-btn');

    fireEvent.click(addButton);

    expect(addMock).toHaveBeenCalled();
  });
});
