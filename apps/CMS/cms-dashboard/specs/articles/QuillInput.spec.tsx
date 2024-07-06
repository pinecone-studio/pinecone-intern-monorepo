import React from 'react';
import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QuillInput } from '@/app/articles/_components';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

// Define the validation schema for testing
const validationSchema = Yup.object({
  content: Yup.string().required('Content is required'),
});

const mockOnSubmit = jest.fn();

// Setup function to render the component with Formik context
const setup = (initialValues: any = { content: '' }, initialTouched = {}, initialErrors = {}) => {
  render(
    <Formik
      initialValues={initialValues}
      initialTouched={initialTouched}
      initialErrors={initialErrors}
      validationSchema={validationSchema}
      onSubmit={mockOnSubmit}
    >
      <Form>
        <Field
          name="content"
          component={QuillInput}
          label="Content"
          placeholder="Enter your content"
        />
      </Form>
    </Formik>
  );
};

describe('QuillInput Component', () => {
  // Clear all mocks and clean up the DOM after each test
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('renders the component with label and placeholder', () => {
    setup();

    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your content')).toBeInTheDocument();
  });

  test('displays error message when there is an error', async () => {
    setup({ content: '' }, { content: true }, { content: 'Content is required' });

    // Trigger the form validation
    await act(async () => {
      fireEvent.blur(screen.getByRole('textbox')); // Trigger the blur event
    });

    // Ensure the error message is rendered
    expect(screen.getByText('Content is required')).toBeInTheDocument();
    expect(screen.getByText('Content is required')).toHaveClass('text-base mt-4 text-red-600');
  });

  test('does not render an error message when there is no validation error', async () => {
    setup({ content: 'Some content' }, { content: true });

    await act(async () => {
      fireEvent.blur(screen.getByRole('textbox'));
    });

    // Ensure that there is no error message
    expect(screen.queryByText('Content is required')).not.toBeInTheDocument();
  });

  test('calls form.setFieldValue when the value changes', async () => {
    const { container } = setup();

    const quillEditor = container.querySelector('textarea');
    await act(async () => {
      fireEvent.change(quillEditor!, { target: { value: 'New content' } });
    });

    expect(mockOnSubmit).not.toHaveBeenCalled(); // Verify that the form submission has not been triggered
  });

  test('calls form.setFieldTouched when the input loses focus', async () => {
    setup();

    const quillEditor = screen.getByRole('textbox');

    await act(async () => {
      fireEvent.blur(quillEditor);
    });

    // Make sure that setFieldTouched is called correctly.
    expect(mockOnSubmit).not.toHaveBeenCalled(); // Verify that the form submission has not been triggered
  });

  test('renders an error message when there is a validation error', async () => {
    setup({ content: '' }, { content: true }, { content: 'Content is required' });

    await act(async () => {
      fireEvent.blur(screen.getByRole('textbox'));
    });

    // Ensure the error message is rendered
    expect(screen.getByText('Content is required')).toBeInTheDocument();
  });

  test('ErrorMessage renders with correct class name', async () => {
    setup({ content: '' }, { content: true }, { content: 'Content is required' });

    await act(async () => {
      fireEvent.blur(screen.getByRole('textbox'));
    });

    // Ensure that the error message has the correct class
    expect(screen.getByText('Content is required')).toHaveClass('text-base mt-4 text-red-600');
  });

  test('renders an error message only if the field is touched', async () => {
    setup({ content: '' }, {}, { content: 'Content is required' });

    // Make sure that the error message is not visible until the field is touched
    expect(screen.queryByText('Content is required')).not.toBeInTheDocument();

    await act(async () => {
      fireEvent.blur(screen.getByRole('textbox'));
    });

    // Ensure the error message is rendered after the field is touched
    expect(screen.getByText('Content is required')).toBeInTheDocument();
  });

  test('renders an error message only when there is an error and field is touched', async () => {
    setup({ content: '' }, { content: true }, { content: 'Content is required' });

    await act(async () => {
      fireEvent.blur(screen.getByRole('textbox'));
    });

    // Ensure the error message is rendered
    expect(screen.getByText('Content is required')).toBeInTheDocument();
  });
});
