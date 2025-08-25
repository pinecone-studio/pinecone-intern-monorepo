import { render, screen, fireEvent } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import { NameEmailFields } from '@/components/NameEmailFields';
import { profileFormSchema } from '@/components/schema/ProfileFormSchema';
import z from 'zod';
import '@testing-library/jest-dom';

type FormValues = z.infer<typeof profileFormSchema>;

const Wrapper = () => {
  const methods = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      birthDate: new Date('2000-01-01'),
      genderPrefence: '',
      bio: '',
      interests: [],
      profession: '',
      school: '',
    },
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(jest.fn())}>
        <NameEmailFields control={methods.control} />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};

describe('NameEmailFields', () => {
  it('renders name and email inputs', () => {
    render(<Wrapper />);

    expect(screen.getByLabelText(/name/i));
    expect(screen.getByLabelText(/email/i));
  });

  it('accepts user input for name and email', () => {
    render(<Wrapper />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);

    fireEvent.change(nameInput, { target: { value: 'Alice' } });
    fireEvent.change(emailInput, { target: { value: 'alice@example.com' } });

    expect(nameInput).toHaveValue('Alice');
    expect(emailInput).toHaveValue('alice@example.com');
  });
});
