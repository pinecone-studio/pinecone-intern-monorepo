import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import { NameGenderPreferenceFields } from '@/components/NameGenderPreferenceFields';
import { profileFormSchema } from '@/components/schema/ProfileFormSchema';
import z from 'zod';
import '@testing-library/jest-dom';
import { zodResolver } from '@hookform/resolvers/zod';

type FormValues = z.infer<typeof profileFormSchema>;

const Wrapper = () => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: '',
      email: '',
      birthDate: new Date('2000-01-01'),
      genderPreference: '',
      bio: '',
      interests: [],
      profession: '',
      school: '',
    },
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(jest.fn())}>
        <NameGenderPreferenceFields control={methods.control} />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};

describe('NameGenderPreferenceFields', () => {
  it('renders name and gender preference inputs', () => {
    render(<Wrapper />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/gender preference/i)).toBeInTheDocument();
  });

  it('accepts user input for name field', () => {
    render(<Wrapper />);

    const nameInput = screen.getByLabelText(/name/i);
    fireEvent.change(nameInput, { target: { value: 'Alice' } });
    expect(nameInput).toHaveValue('Alice');
  });

  it('updates gender preference value through form', async () => {
    const { container } = render(<Wrapper />);

    // Find the hidden select element and change its value directly
    const hiddenSelect = container.querySelector('select[aria-hidden="true"]');
    expect(hiddenSelect).toBeInTheDocument();

    // Change the value using fireEvent.change
    fireEvent.change(hiddenSelect!, { target: { value: 'Male' } });

    // Verify the value was set
    expect(hiddenSelect).toHaveValue('Male');
  });

  it('has all gender preference options available', () => {
    const { container } = render(<Wrapper />);

    // Find the hidden select element
    const hiddenSelect = container.querySelector('select[aria-hidden="true"]');
    expect(hiddenSelect).toBeInTheDocument();

    // Check that all options are present
    const options = hiddenSelect?.querySelectorAll('option');
    expect(options).toHaveLength(3);

    const optionValues = Array.from(options || []).map((option) => option.value);
    expect(optionValues).toContain('Male');
    expect(optionValues).toContain('Female');
    expect(optionValues).toContain('Both');
  });

  it('displays validation errors when fields are invalid', async () => {
    render(<Wrapper />);

    const submitButton = screen.getByRole('button', { name: /submit/i });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    // Wait for validation errors to appear
    // Adjust the error message text based on your actual schema validation messages
    await waitFor(() => {
      // Look for any validation error messages that might appear
      const errorElements = screen.queryAllByRole('alert');
      if (errorElements.length === 0) {
        // If no role="alert", look for common error message patterns
        const possibleErrors = screen.queryAllByText(/required|invalid|must/i);
        expect(possibleErrors.length).toBeGreaterThan(0);
      } else {
        expect(errorElements.length).toBeGreaterThan(0);
      }
    });
  });

  it('can select different gender preference values', async () => {
    const { container } = render(<Wrapper />);

    const hiddenSelect = container.querySelector('select[aria-hidden="true"]');
    expect(hiddenSelect).toBeInTheDocument();

    // Test selecting Male
    fireEvent.change(hiddenSelect!, { target: { value: 'Male' } });
    expect(hiddenSelect).toHaveValue('Male');

    // Test selecting Female
    fireEvent.change(hiddenSelect!, { target: { value: 'Female' } });
    expect(hiddenSelect).toHaveValue('Female');

    // Test selecting Both
    fireEvent.change(hiddenSelect!, { target: { value: 'Both' } });
    expect(hiddenSelect).toHaveValue('Both');
  });
});