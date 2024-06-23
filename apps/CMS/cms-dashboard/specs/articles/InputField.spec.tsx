import React from 'react';
import { render, screen } from '@testing-library/react';
import { Formik, Form } from 'formik';
import '@testing-library/jest-dom';
import { InputField } from '../../src/app/articles/_components';

const renderInputField = (props = {}) => {
  return render(
    <Formik
      initialValues={{ testField: '' }}
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
    render(
      <Formik
        initialValues={{ testField: '' }}
        initialErrors={{ testField: 'Error message' }}
        initialTouched={{ testField: true }}
        onSubmit={() => {}}
      >
        <Form>
          <InputField name="testField" label="Test Label" />
        </Form>
      </Formik>
    );

    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  test('does not render error message when not touched', () => {
    render(
      <Formik
        initialValues={{ testField: '' }}
        initialErrors={{ testField: 'Error message' }}
        initialTouched={{ testField: false }}
        onSubmit={() => {}}
      >
        <Form>
          <InputField name="testField" label="Test Label" />
        </Form>
      </Formik>
    );

    expect(screen.queryByText('Error message')).not.toBeInTheDocument();
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
});