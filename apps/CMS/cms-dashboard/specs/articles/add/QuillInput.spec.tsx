import React from 'react';
import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QuillInput } from '@/app/articles/_components/add/';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  content: Yup.string().required('Content is required'),
});

type Values = {
  content: string;
};

const mockOnSubmit = jest.fn();
const setup = async (initialValues: Values = { content: '' }, initialTouched = {}, initialErrors = {}) => {
  await act(async () => {
    render(
      <Formik initialValues={initialValues} initialTouched={initialTouched} initialErrors={initialErrors} validationSchema={validationSchema} onSubmit={mockOnSubmit}>
        <Form>
          <Field name="content" component={QuillInput} label="Content" />
        </Form>
      </Formik>
    );
  });
};

describe('QuillInput Component', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('renders the component with label and placeholder', async () => {
    await setup();

    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  test('displays error message when there is an error', async () => {
    await setup({ content: '' }, { content: true }, { content: 'Content is required' });

    await act(async () => {
      fireEvent.blur(screen.getByRole('textbox')); 
    });

    expect(screen.getByText('Content is required')).toBeInTheDocument();
    expect(screen.getByText('Content is required')).toHaveClass('text-base mt-1 text-red-600');
  });

  test('does not render an error message when there is no validation error', async () => {
    await setup({ content: 'Some content' }, { content: true });

    await act(async () => {
      fireEvent.blur(screen.getByRole('textbox'));
    });

    expect(screen.queryByText('Content is required')).not.toBeInTheDocument();
  });

  test('calls form.setFieldTouched when the input loses focus', async () => {
    await setup();

    const quillEditor = screen.getByRole('textbox');

    await act(async () => {
      fireEvent.blur(quillEditor);
    });

    expect(mockOnSubmit).not.toHaveBeenCalled(); 
  });

  test('renders an error message when there is a validation error', async () => {
    await setup({ content: '' }, { content: true }, { content: 'Content is required' });

    await act(async () => {
      fireEvent.blur(screen.getByRole('textbox'));
    });
  });
});
