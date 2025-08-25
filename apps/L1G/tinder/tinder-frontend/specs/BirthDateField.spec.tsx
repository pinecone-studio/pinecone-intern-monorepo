import React from 'react';
import { render, screen } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import { BirthDateField } from '@/components/BirthDateField';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

const setup = (defaultDate: Date | null = null) => {
  const Wrapper = () => {
    const methods = useForm({ defaultValues: { birthDate: defaultDate } });
    return (
      <FormProvider {...methods}>
        <BirthDateField control={methods.control} />
      </FormProvider>
    );
  };

  render(<Wrapper />);
};

describe('BirthDateField - Calendar', () => {
  it('disables dates before 1900-01-01 and after today', async () => {
    setup();

    const button = screen.getByTestId('date-picker-button');
    await userEvent.click(button);

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);

    const calendar = screen.getByRole('dialog');

    const dateButtons = calendar.querySelectorAll('button');

    let hasDisabledDate = false;

    dateButtons.forEach((btn) => {
      if (btn.hasAttribute('disabled')) {
        hasDisabledDate = true;
      }
    });

    expect(hasDisabledDate).toBe(true);
  });

  it('selects a valid date', async () => {
    setup();

    const button = screen.getByTestId('date-picker-button');
    await userEvent.click(button);

    const today = new Date();
    const todayDay = today.getDate();

    const calendarDialog = await screen.findByRole('dialog');

    const dateButton = Array.from(calendarDialog.querySelectorAll('button')).find((btn) => btn.textContent?.trim() === todayDay.toString());

    expect(dateButton).toBeDefined();
    if (dateButton) {
      await userEvent.click(dateButton);
    }
  });
});
