import React from 'react';
import { render, screen } from '@testing-library/react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import '@testing-library/jest-dom';
import { InputField } from '../../src/app/articles/_components';

const validationSchema = Yup.object().shape({
  testField: Yup.string().required('Test error'),
});

const renderInputField = (props = {}, initialValues = { testField: '' }, initialTouched = {}, initialErrors = {}) => {
  return render(
    <Formik
      initialValues={initialValues}
      initialTouched={initialTouched}
      initialErrors={initialErrors}
      validationSchema={validationSchema}
      onSubmit={() => {}}
    >
      <Form>
        <InputField name="testField" label="Test Label" placeholder="test placeholder" {...props} />
      </Form>
    </Formik>
  );
};

describe('InputField Component', () => {
  test('renders the input field with default props', () => {
    renderInputField();
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('test placeholder')).toBeInTheDocument();
  });

  test('renders the input field with custom placeholder', () => {
    renderInputField({ placeholder: 'Enter text here' });
    expect(screen.getByPlaceholderText('Enter text here')).toBeInTheDocument();
  });

  test('renders the input field with error message when touched', async () => {
    renderInputField({}, { testField: '' }, { testField: true }, { testField: 'Test error' });
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  test('does not render error message when not touched', () => {
    renderInputField({}, { testField: '' }, { testField: false }, { testField: 'Test error' });
    expect(screen.queryByText('Test error')).not.toBeInTheDocument();
  });

  test('renders error message when there is an error and the field is touched', () => {
    renderInputField({}, { testField: '' }, { testField: true }, { testField: 'Test error' });
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  test('does not render error message when there is no error', () => {
    renderInputField({}, { testField: '' }, { testField: true });
    expect(screen.queryByText('Test error')).not.toBeInTheDocument();
  });

  test('applies custom class name', () => {
    renderInputField({ addClass: 'custom-class' });
    expect(screen.getByPlaceholderText('test placeholder')).toHaveClass('custom-class');
  });

  test('renders textarea when "as" prop is textarea', () => {
    renderInputField({ as: 'textarea', rows: 5 });
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '5');
  });

  test('renders input with the correct type', () => {
    renderInputField({ type: 'password' });
    expect(screen.getByPlaceholderText('test placeholder')).toHaveAttribute('type', 'password');
  });

  test('renders input with additional field props', () => {
    renderInputField({ key: 'unique-key' });
    expect(screen.getByPlaceholderText('test placeholder')).toBeInTheDocument();
  });

  test('renders input with an additional arbitrary prop', () => {
    renderInputField({ 'data-test': 'test-data' });
    expect(screen.getByPlaceholderText('test placeholder')).toHaveAttribute('data-test', 'test-data');
  });

  test('handles different input types correctly', () => {
    const inputTypes = ['text', 'password', 'email', 'number'];
    inputTypes.forEach((type) => {
      renderInputField({ type });
      expect(screen.getByPlaceholderText('test placeholder')).toHaveAttribute('type', type);
    });
  });

  test('renders without label if not provided', () => {
    renderInputField({ label: null });
    expect(screen.queryByLabelText('Test Label')).not.toBeInTheDocument();
  });

  test('renders label with correct htmlFor attribute', () => {
    renderInputField();
    expect(screen.getByLabelText('Test Label')).toHaveAttribute('for', 'testField');
  });

  test('handles edge case of label being an empty string', () => {
    renderInputField({ label: '' });
    expect(screen.queryByText('')).not.toBeInTheDocument();
  });

  test('renders input with correct id attribute', () => {
    renderInputField();
    expect(screen.getByPlaceholderText('test placeholder')).toHaveAttribute('id', 'testField');
  });
});
