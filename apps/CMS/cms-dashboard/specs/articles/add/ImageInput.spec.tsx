import React from 'react';
import { render, fireEvent, screen, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ImageInput } from '@/app/articles/_components/add/ImageInput';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  image: Yup.mixed()
    .required('Зураггүй байж болохгүй'),
});

type Values = {
  image: null | File;
}

const setup = (initialValues: Values = { image: null }) => {
  const setFieldValue = jest.fn();
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
        />
      </Form>
    </Formik>
  );
  return { setFieldValue };
};

describe('ImageInput Component', () => {
  afterEach(() => {
    jest.clearAllMocks(); 
    cleanup(); 
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
    const setFieldValue = jest.fn();
    render(
      <Formik
        initialValues={{ image: null }}
        initialTouched={{ image: true }}
        initialErrors={{ image: 'Зураггүй байж болохгүй' }}
        validationSchema={validationSchema}
        onSubmit={jest.fn()}
      >
        <Form>
          <Field
            name="image"
            component={ImageInput}
            setFieldValue={setFieldValue}
          />
        </Form>
      </Formik>
    );

    await waitFor(() => {
      expect(screen.getByText('Зураггүй байж болохгүй')).toBeInTheDocument();
    });
  });
});
