import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { ProfileInputField } from '@/components/ProfileInputField';

// Test wrapper component to provide proper form context
const TestFormWrapper = ({ children, defaultValues = {}, schema, onSubmit = () => {} }: { children: React.ReactNode; defaultValues?: any; schema?: z.ZodSchema; onSubmit?: (data: any) => void }) => {
  const form = useForm({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues,
  });

  // Clone children and pass the control prop
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === ProfileInputField) {
      return React.cloneElement(child, { control: form.control });
    }
    return child;
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} data-testid="test-form">
        {childrenWithProps}
        <button type="submit" data-testid="submit-button">
          Submit
        </button>
      </form>
    </Form>
  );
};

describe('ProfileInputField', () => {
  const defaultProps = {
    name: 'testField',
    label: 'Test Label',
    placeholder: 'Test placeholder',
  };

  it('renders with required props', () => {
    render(
      <TestFormWrapper>
        <ProfileInputField {...defaultProps} />
      </TestFormWrapper>
    );

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Test placeholder')).toBeInTheDocument();
  });

  it('renders with custom testId', () => {
    render(
      <TestFormWrapper>
        <ProfileInputField {...defaultProps} testId="custom-test-id" />
      </TestFormWrapper>
    );

    expect(screen.getByTestId('custom-test-id')).toBeInTheDocument();
  });

  it('renders without testId when not provided', () => {
    render(
      <TestFormWrapper>
        <ProfileInputField {...defaultProps} />
      </TestFormWrapper>
    );

    const input = screen.getByPlaceholderText('Test placeholder');
    expect(input).toBeInTheDocument();
    // Should not have data-testid attribute when testId is not provided
    expect(input).not.toHaveAttribute('data-testid');
  });

  it('accepts user input and updates field value', () => {
    render(
      <TestFormWrapper defaultValues={{ testField: '' }}>
        <ProfileInputField {...defaultProps} />
      </TestFormWrapper>
    );

    const input = screen.getByPlaceholderText('Test placeholder');
    fireEvent.change(input, { target: { value: 'New value' } });

    expect(input).toHaveValue('New value');
  });

  it('displays default value from form context', () => {
    render(
      <TestFormWrapper defaultValues={{ testField: 'Initial value' }}>
        <ProfileInputField {...defaultProps} />
      </TestFormWrapper>
    );

    const input = screen.getByPlaceholderText('Test placeholder');
    expect(input).toHaveValue('Initial value');
  });

  it('displays validation error messages', async () => {
    const schema = z.object({
      testField: z.string().min(5, 'Must be at least 5 characters'),
    });

    render(
      <TestFormWrapper defaultValues={{ testField: '' }} schema={schema}>
        <ProfileInputField {...defaultProps} />
      </TestFormWrapper>
    );

    const input = screen.getByPlaceholderText('Test placeholder');
    fireEvent.change(input, { target: { value: 'abc' } });
    fireEvent.click(screen.getByTestId('submit-button'));

    expect(await screen.findByText('Must be at least 5 characters')).toBeInTheDocument();
  });

  it('renders with different field names', () => {
    render(
      <TestFormWrapper defaultValues={{ firstName: 'John', lastName: 'Doe' }}>
        <ProfileInputField name="firstName" label="First Name" placeholder="Enter first name" testId="first-name-input" />
        <ProfileInputField name="lastName" label="Last Name" placeholder="Enter last name" testId="last-name-input" />
      </TestFormWrapper>
    );

    expect(screen.getByTestId('first-name-input')).toHaveValue('John');
    expect(screen.getByTestId('last-name-input')).toHaveValue('Doe');
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
  });

  it('handles empty string values correctly', () => {
    render(
      <TestFormWrapper defaultValues={{ testField: '' }}>
        <ProfileInputField {...defaultProps} testId="empty-test" />
      </TestFormWrapper>
    );

    const input = screen.getByTestId('empty-test');
    expect(input).toHaveValue('');

    fireEvent.change(input, { target: { value: 'Some text' } });
    expect(input).toHaveValue('Some text');

    fireEvent.change(input, { target: { value: '' } });
    expect(input).toHaveValue('');
  });

  it('handles special characters and unicode input', () => {
    render(
      <TestFormWrapper defaultValues={{ testField: '' }}>
        <ProfileInputField {...defaultProps} testId="unicode-test" />
      </TestFormWrapper>
    );

    const input = screen.getByTestId('unicode-test');
    const specialText = '🚀 Special chars: @#$%^&*()_+ ñáéíóú 中文';

    fireEvent.change(input, { target: { value: specialText } });
    expect(input).toHaveValue(specialText);
  });

  it('works with form reset functionality', () => {
    const TestWithReset = () => {
      const form = useForm({
        defaultValues: { testField: 'initial' },
      });

      return (
        <Form {...form}>
          <form data-testid="reset-form">
            <ProfileInputField control={form.control} name="testField" label="Test Field" placeholder="Enter text" testId="reset-input" />
            <button type="button" onClick={() => form.reset()} data-testid="reset-button">
              Reset
            </button>
          </form>
        </Form>
      );
    };

    render(<TestWithReset />);

    const input = screen.getByTestId('reset-input');
    expect(input).toHaveValue('initial');

    // Change value
    fireEvent.change(input, { target: { value: 'changed' } });
    expect(input).toHaveValue('changed');

    // Reset form
    fireEvent.click(screen.getByTestId('reset-button'));
    expect(input).toHaveValue('initial');
  });
});
