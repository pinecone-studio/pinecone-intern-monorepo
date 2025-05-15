import { render, screen } from '@testing-library/react';
import { useForm, Controller } from 'react-hook-form';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { DatePicker } from '@/app/(main)/(profiles)/profile/_components/DatePicker';

type FormValues = {
  birth: Date | null;
};

const Wrapper = () => {
  const { control } = useForm<FormValues>({
    defaultValues: {
      birth: null,
    },
  });

  return <Controller control={control} name="birth" render={({ field }) => <DatePicker field={field} />} />;
};

describe('DatePicker', () => {
  it('renders without crashing', () => {
    render(<Wrapper />);
    expect(screen.getByText('Date of Birth')).toBeInTheDocument();
    expect(screen.getByText('Pick a date')).toBeInTheDocument();
    expect(screen.getByTestId('Personal-Birth-Drop-Down')).toBeInTheDocument();
  });

  it('opens calendar popover when clicked', async () => {
    render(<Wrapper />);
    const button = screen.getByTestId('Personal-Birth-Drop-Down');
    await userEvent.click(button);
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
  });

  it('shows age helper text when date is selected', () => {
    const birthday = new Date(2000, 0, 1);

    const CustomWrapper = () => {
      const { control } = useForm<FormValues>({
        defaultValues: {
          birth: birthday,
        },
      });

      return <Controller control={control} name="birth" render={({ field }) => <DatePicker field={field} />} />;
    };

    render(<CustomWrapper />);

    // Энэ хэсэг таны `getHelperText()`-ийн буцаадаг тексттэй таарах ёстой.
    expect(screen.getByText(/years old/i)).toBeInTheDocument();
  });
});
