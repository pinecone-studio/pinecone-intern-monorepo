import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { AddTicketSchema } from '@/app/admin/concerts/utils/add-ticket-schema';
import { AddTicketDefaultValues } from '@/app/admin/concerts/utils/add-ticket-default-values';
import AddTicketInfoInput from '@/app/admin/concerts/_components/AddTicketinfoinputs';
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
        <AddTicketInfoInput form={form} />
      </form>
    </Form>
  );
};

describe('Ticket Info Input', () => {
  it('should render all info inputs', () => {
    render(<Wrapper />);

    expect(screen.getByTestId('concert-title')).toBeInTheDocument();
    expect(screen.getByTestId('concert-description')).toBeInTheDocument();
    expect(screen.getByTestId('artist-name')).toBeInTheDocument();
  });

  it('should allow typing into all info inputs', async () => {
    render(<Wrapper />);
    const user = userEvent.setup();

    const title = screen.getByTestId('concert-title');
    const description = screen.getByTestId('concert-description');
    const artist = screen.getByTestId('artist-name');

    await user.clear(title);
    await user.type(title, 'Үндэсний баяр наадам');

    await user.clear(description);
    await user.type(description, 'Тулгар төр байгуулагдсаны 2233 жилийн ой.');

    await user.clear(artist);
    await user.type(artist, 'Сараа');

    expect(title).toHaveValue('Үндэсний баяр наадам');
    expect(description).toHaveValue('Тулгар төр байгуулагдсаны 2233 жилийн ой.');
    expect(artist).toHaveValue('Сараа');
  });
});
