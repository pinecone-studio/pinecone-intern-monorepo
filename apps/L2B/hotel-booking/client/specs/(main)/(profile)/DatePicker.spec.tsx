import { render, screen, fireEvent } from '@testing-library/react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import '@testing-library/jest-dom';
import { DatePicker } from '@/app/(main)/(profiles)/profile/_components/DatePicker';

type FormValues = {
  birth: Date | null;
};

const Wrapper = ({ defaultValues }: { defaultValues?: FormValues }) => {
  const methods = useForm<FormValues>({
    defaultValues: defaultValues || { birth: null },
  });

  return (
    <FormProvider {...methods}>
      <Controller control={methods.control} name="birth" render={({ field }) => <DatePicker field={field} />} />
    </FormProvider>
  );
};

describe('DatePicker', () => {
  it('renders without crashing', () => {
    render(<Wrapper />);
    expect(screen.getByText('Date of Birth')).toBeInTheDocument();
    expect(screen.getByText('Pick a date')).toBeInTheDocument();
    expect(screen.getByTestId('Personal-Birth-Drop-Down')).toBeInTheDocument();
  });

  it('opens calendar popover when clicked', () => {
    render(<Wrapper />);
    const button = screen.getByTestId('Personal-Birth-Drop-Down');
    fireEvent.click(button);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('shows age helper text when date is selected', () => {
    const birthday = new Date(2000, 0, 1);
    render(<Wrapper defaultValues={{ birth: birthday }} />);
    expect(screen.getByText(/years old/i)).toBeInTheDocument();
  });
});
