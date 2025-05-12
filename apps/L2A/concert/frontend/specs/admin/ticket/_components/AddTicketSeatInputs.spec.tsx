import { render, screen } from '@testing-library/react';
import AddTicketSeatInput from '@/app/admin/ticket/_components/AddTicketSeatInputs';
import { AddTicketSchema } from '@/app/admin/ticket/utils/add-ticket-schema';
import { AddTicketDefaultValues } from '@/app/admin/ticket/utils/add-ticket-default-values';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

const Wrapper = () => {
  const form = useForm<z.infer<typeof AddTicketSchema>>({
    resolver: zodResolver(AddTicketSchema),
    defaultValues: AddTicketDefaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => {})}>
        <AddTicketSeatInput form={form} />
      </form>
    </Form>
  );
};

describe('AddTicketSeatInput', () => {
  it('renders all seat and price inputs', () => {
    render(<Wrapper />);

    expect(screen.getByLabelText(/Арын суудлын тоо/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/VIP суудлын тоо/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Энгийн суудлын тоо/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Арын суудлын үнэ/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/VIP суудлын үнэ/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Энгийн суудлын үнэ/i)).toBeInTheDocument();
  });

  it('allows typing into all seat and price inputs', async () => {
    render(<Wrapper />);
    const user = userEvent.setup();

    const inputs = {
      backSeatCount: screen.getByTestId('back-seat-count'),
      vipSeatCount: screen.getByTestId('vip-seat-count'),
      standardSeatCount: screen.getByTestId('standard-seat-count'),
      backSeatPrice: screen.getByTestId('back-seat-price'),
      vipSeatPrice: screen.getByTestId('vip-seat-price'),
      standardSeatPrice: screen.getByTestId('standard-seat-price'),
    };

    await user.clear(inputs.backSeatCount);
    await user.type(inputs.backSeatCount, '100');

    await user.clear(inputs.vipSeatCount);
    await user.type(inputs.vipSeatCount, '50');

    await user.clear(inputs.standardSeatCount);
    await user.type(inputs.standardSeatCount, '150');

    await user.clear(inputs.backSeatPrice);
    await user.type(inputs.backSeatPrice, '20000');

    await user.clear(inputs.vipSeatPrice);
    await user.type(inputs.vipSeatPrice, '50000');

    await user.clear(inputs.standardSeatPrice);
    await user.type(inputs.standardSeatPrice, '30000');

    expect(inputs.backSeatCount).toHaveValue(100);
    expect(inputs.vipSeatCount).toHaveValue(50);
    expect(inputs.standardSeatCount).toHaveValue(150);
    expect(inputs.backSeatPrice).toHaveValue(20000);
    expect(inputs.vipSeatPrice).toHaveValue(50000);
    expect(inputs.standardSeatPrice).toHaveValue(30000);
  });
});
