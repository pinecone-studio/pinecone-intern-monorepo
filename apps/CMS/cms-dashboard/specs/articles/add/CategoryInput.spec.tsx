import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { CategoryInput } from '@/app/articles/_components/add'; 

type Values = {
  categories: string[];
};

const setup = (initialValues: Values = { categories: [''] }) => {
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
  test('should handle category addition and displays in dropdown', () => {
    setup();
    const inputElement = screen.getByPlaceholderText('Add a category');

    act(() => {
      fireEvent.change(inputElement, { target: { value: 'New Category' } });
      fireEvent.keyPress(inputElement, { key: 'Enter', code: 'Enter', charCode: 13 });
    });

    expect(screen.getByText('New Category')).toBeInTheDocument();
  });

  test('should handle category selection from dropdown', () => {
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

    act(() => {
      fireEvent.click(categoryItem);
    });
    expect(screen.getByText('Coding')).toBeInTheDocument();
  });
  test('should handle category deletion', () => {
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

  test('should open dropdown when clicking inside', () => {
    setup();
    const inputElement = screen.getByPlaceholderText('Add a category');
    act(() => {
      fireEvent.change(inputElement, { target: { value: 'Coding' } });
      fireEvent.focus(inputElement);
    });
    expect(screen.getByText('Coding')).toBeInTheDocument();
    act(() => {
      fireEvent.mouseDown(inputElement);
    });
    expect(screen.getByText('Coding')).toBeInTheDocument();
  });
  test('should handle input change and dropdown open state', () => {
    setup();
    const inputElement = screen.getByPlaceholderText('Add a category');
    act(() => {
      fireEvent.change(inputElement, { target: { value: 'Frontend' } });
    });
    expect(screen.getByText('Frontend')).toBeInTheDocument();
  });
  test('should handle click outside to close dropdown', () => {
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
  test('should handle empty input and category addition', () => {
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
  test('should handle default value when selectedCategories is undefined', () => {
    setup({});
    const inputElement = screen.getByPlaceholderText('Add a category');
    act(() => {
      fireEvent.change(inputElement, { target: { value: 'Coding' } });
      fireEvent.keyPress(inputElement, { key: 'Enter', code: 'Enter', charCode: 13 });
    });
    expect(screen.getByText('Coding')).toBeInTheDocument();
  });
  test('should open dropdown when non-enter key is pressed', () => {
    setup();
    const inputElement = screen.getByPlaceholderText('Add a category');
    act(() => {
      fireEvent.change(inputElement, { target: { value: 'New Category' } });
      fireEvent.keyPress(inputElement, { key: 'a', code: 'KeyA', charCode: 97 });
    });
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});
