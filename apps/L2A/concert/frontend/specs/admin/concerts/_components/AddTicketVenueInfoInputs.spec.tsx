import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { AddTicketSchema } from '@/app/admin/concerts/utils/add-ticket-schema';
import { AddTicketDefaultValues } from '@/app/admin/concerts/utils/add-ticket-default-values';
import AddTicketVenueInputs from '@/app/admin/concerts/_components/AddTicketVenueInfoInputs';
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
        <AddTicketVenueInputs form={form} />
      </form>
    </Form>
  );
};

describe('AddTicketVenueInputs', () => {
  it('should render all venue inputs', () => {
    render(<Wrapper />);

    expect(screen.getByTestId('venue-name')).toBeInTheDocument();
    expect(screen.getByTestId('venue-capacity')).toBeInTheDocument();
    expect(screen.getByTestId('venue-address')).toBeInTheDocument();
    expect(screen.getByTestId('venue-city')).toBeInTheDocument();
  });

  it('should allow typing into all venue inputs', async () => {
    render(<Wrapper />);
    const user = userEvent.setup();

    const venueName = screen.getByTestId('venue-name');
    const venueCapacity = screen.getByTestId('venue-capacity');
    const venueAddress = screen.getByTestId('venue-address');
    const venueCity = screen.getByTestId('venue-city');

    await user.clear(venueName);
    await user.type(venueName, 'УБ Палас');

    await user.clear(venueCapacity);
    await user.type(venueCapacity, '700');

    await user.clear(venueAddress);
    await user.type(venueAddress, 'БЗД, 26-р хороо, Нарны зам');

    await user.clear(venueCity);
    await user.type(venueCity, 'Улаанбаатар');

    expect(venueName).toHaveValue('УБ Палас');
    expect(venueCapacity).toHaveValue(700);
    expect(venueAddress).toHaveValue('БЗД, 26-р хороо, Нарны зам');
    expect(venueCity).toHaveValue('Улаанбаатар');
  });
});
