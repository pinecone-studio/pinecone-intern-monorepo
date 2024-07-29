import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { CategoryInput } from '@/app/articles/_components/add'; // Adjust the import path as needed

type Values = {
  categories: [];
};

const setup = (initialValues: Values = { categories: [] }) => {
  const setFieldValue = jest.fn();
  render(
    <Formik initialValues={initialValues} onSubmit={jest.fn()}>
      <Form>
        <CategoryInput name="categories" placeholder="Add a category" label="Categories" />
      </Form>
    </Formik>
  );
  return { setFieldValue };
};

describe('CategoryInput', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    setup();
    expect(screen.getByLabelText('Categories')).toBeInTheDocument();
  });

  test('handles category addition and displays in dropdown', () => {
    setup();

    const inputElement = screen.getByPlaceholderText('Add a category');

    act(() => {
      fireEvent.change(inputElement, { target: { value: 'New Category' } });
      fireEvent.keyPress(inputElement, { key: 'Enter', code: 'Enter', charCode: 13 });
    });

    expect(screen.getByText('New Category')).toBeInTheDocument();
  });

  test('handles category selection from dropdown', () => {
    setup();

    const inputElement = screen.getByPlaceholderText('Add a category');

    act(() => {
      fireEvent.change(inputElement, { target: { value: 'Coding' } });
      fireEvent.focus(inputElement);
    });

    const categoryItem = screen.getByText('Coding');

    act(() => {
      fireEvent.click(categoryItem);
    });

    expect(screen.getByText('Coding')).toBeInTheDocument();
  });

  test('handles category deletion', () => {
    setup();
    const inputElement = screen.getByPlaceholderText('Add a category');
    act(() => {
      fireEvent.change(inputElement, { target: { value: 'Coding' } });
      fireEvent.keyPress(inputElement, { key: 'Enter', code: 'Enter', charCode: 13 });
    });
    screen.debug(); 
    const deleteButton = screen.getByTestId('delete-button-Coding');
    act(() => {
      fireEvent.click(deleteButton);
    });
    expect(screen.queryByText('Coding')).not.toBeInTheDocument();
  });
  test('closes dropdown when clicking outside', () => {
    setup();
    const inputElement = screen.getByPlaceholderText('Add a category');
    act(() => {
      fireEvent.change(inputElement, { target: { value: 'Coding' } });
      fireEvent.focus(inputElement);
    });
    expect(screen.getByText('Coding')).toBeInTheDocument();
    act(() => {
      fireEvent.mouseDown(document.body);
    });
    expect(screen.queryByText('Coding')).not.toBeInTheDocument();
  });
  test('handles input change and dropdown open state', () => {
    setup();
    const inputElement = screen.getByPlaceholderText('Add a category');
    act(() => {
      fireEvent.change(inputElement, { target: { value: 'Frontend' } });
    });
    expect(screen.getByText('Frontend')).toBeInTheDocument();
  });
  test('handles click outside to close dropdown', () => {
    setup();
    const inputElement = screen.getByPlaceholderText('Add a category');
    act(() => {
      fireEvent.change(inputElement, { target: { value: 'Backend' } });
      fireEvent.focus(inputElement);
    });
    expect(screen.getByText('Backend')).toBeInTheDocument();
    act(() => {
      fireEvent.mouseDown(document.body);
    });
    expect(screen.queryByText('Backend')).not.toBeInTheDocument();
  });
  test('handles empty input and category addition', () => {
    setup();
    const inputElement = screen.getByPlaceholderText('Add a category');
    act(() => {
      fireEvent.change(inputElement, { target: { value: 'New Category' } });
      fireEvent.keyPress(inputElement, { key: 'Enter', code: 'Enter', charCode: 13 });
    });
    expect(screen.getByText('New Category')).toBeInTheDocument();
    act(() => {
      fireEvent.change(inputElement, { target: { value: '' } });
      fireEvent.keyPress(inputElement, { key: 'Enter', code: 'Enter', charCode: 13 });
    });
    expect(screen.getByText('New Category')).toBeInTheDocument();
  });
  test('handles default value when selectedCategories is undefined', () => {
    setup({}); 
    const inputElement = screen.getByPlaceholderText('Add a category');
    act(() => {
      fireEvent.change(inputElement, { target: { value: 'Coding' } });
      fireEvent.keyPress(inputElement, { key: 'Enter', code: 'Enter', charCode: 13 });
    });
    expect(screen.getByText('Coding')).toBeInTheDocument();
  });
});
