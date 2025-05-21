import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { AddTicketSchema } from '@/app/admin/concerts/utils/add-ticket-schema';
import { AddTicketDefaultValues } from '@/app/admin/concerts/utils/add-ticket-default-values';
import AddTicketTimeInput from '@/app/admin/concerts/_components/AddTicketTimeInputs';
import z from 'zod';
import '@testing-library/jest-dom';

const Wrapper = () => {
  const form = useForm<z.infer<typeof AddTicketSchema>>({
    resolver: zodResolver(AddTicketSchema),
    defaultValues: AddTicketDefaultValues,
  });

  return (
    <Form {...form}>
      <form>
        <AddTicketTimeInput form={form} />
      </form>
    </Form>
  );
};

describe('AddTicketTimeInput', () => {
  it('should render all date and time inputs', () => {
    render(<Wrapper />);

    expect(screen.getByTestId('start-date')).toBeInTheDocument();
    expect(screen.getByTestId('end-date')).toBeInTheDocument();
    expect(screen.getByTestId('music-start')).toBeInTheDocument();
  });

  it('should allow typing/selecting date and time inputs', async () => {
    render(<Wrapper />);
    const user = userEvent.setup();

    const startDate = screen.getByTestId('start-date');
    const endDate = screen.getByTestId('end-date');
    const musicStart = screen.getByTestId('music-start');

    await user.clear(startDate);
    await user.type(startDate, '2025-08-11');

    await user.clear(endDate);
    await user.type(endDate, '2025-08-12');

    await user.clear(musicStart);
    await user.type(musicStart, '19:30');

    expect(startDate).toHaveValue('2025-08-11');
    expect(endDate).toHaveValue('2025-08-12');
    expect(musicStart).toHaveValue('19:30');
  });
});
