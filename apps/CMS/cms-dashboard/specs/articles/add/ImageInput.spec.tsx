import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ImageInput } from '@/app/articles/_components/add/ImageInput';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

// Define the validation schema for testing
const validationSchema = Yup.object({
  image: Yup.mixed()
    .required('Зураггүй байж болохгүй')
    .test('fileType', 'Зөвхөн зураг оруулна уу', value =>
      value ? ['image/jpeg', 'image/png'].includes(value.type) : false
    ),
});

// Setup function to render the component with Formik context
const setup = (initialValues: any = { image: null }) => {
  const setFieldValue = jest.fn();
  const setFieldTouched = jest.fn();
  render(
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={jest.fn()}
    >
      <Form>
        <Field
          name="image"
          component={ImageInput}
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
        />
      </Form>
    </Formik>
  );
  return { setFieldValue, setFieldTouched };
};

describe('ImageInput Component', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  test('renders the component with initial state', () => {
    setup();
    expect(screen.getByText('Өнгөц зураг')).toBeInTheDocument();
    expect(screen.getByText('Зураг оруулах')).toBeInTheDocument();
    expect(screen.getByText('Хэмжээ: 928x427')).toBeInTheDocument();
  });

  test('uploads and previews an image', async () => {
    const { setFieldValue } = setup();
    const file = new File([''], 'example.png', { type: 'image/png' });

    fireEvent.change(screen.getByLabelText('Өнгөц зураг'), { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByAltText('uploaded img')).toBeInTheDocument();
    });
    expect(setFieldValue).toHaveBeenCalledWith('image', file);
  });

  test('does not call setFieldValue if no file is selected', () => {
    const { setFieldValue } = setup();
    const fileInput = screen.getByLabelText('Өнгөц зураг');

    fireEvent.change(fileInput, { target: { files: [] } });

    expect(setFieldValue).not.toHaveBeenCalled();
  });

  test('shows an error message for validation errors', async () => {
    setup({}, { image: null }, { image: true }, { image: 'Зураггүй байж болохгүй' });

    await waitFor(() => {
      expect(screen.getByText('Зураггүй байж болохгүй')).toBeInTheDocument();
    });
  });

  test('shows an error message for invalid file type', async () => {
    setup();
    const invalidFile = new File([''], 'example.txt', { type: 'text/plain' });
    fireEvent.change(screen.getByLabelText('Өнгөц зураг'), { target: { files: [invalidFile] } });

    await waitFor(() => {
      expect(screen.queryByAltText('uploaded img')).not.toBeInTheDocument();
    });
    expect(screen.getByText('Зөвхөн зураг оруулна уу')).toBeInTheDocument();
  });

  test('calls setFieldTouched when input loses focus', () => {
    const { setFieldTouched } = setup();

    fireEvent.blur(screen.getByLabelText('Өнгөц зураг'));

    expect(setFieldTouched).toHaveBeenCalledWith('image', true);
  });
});
