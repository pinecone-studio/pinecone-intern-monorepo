import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { AddTicketSchema } from '@/app/admin/ticket/utils/add-ticket-schema';
import { AddTicketDefaultValues } from '@/app/admin/ticket/utils/add-ticket-default-values';
import AddTicketImageURLInput from '@/app/admin/ticket/_components/AddTicketImageUrlInput.tsx';
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
        <AddTicketImageURLInput form={form} />
      </form>
    </Form>
  );
};

describe('Image URL', () => {
  it('should render the image URL input', () => {
    render(<Wrapper />);
    expect(screen.getByTestId('thumbnail-url')).toBeInTheDocument();
  });

  it('should allow typing a URL into the input', async () => {
    render(<Wrapper />);
    const user = userEvent.setup();
    const input = screen.getByTestId('thumbnail-url');

    await user.clear(input);
    await user.type(input, 'https://example.com/image.jpg');

    expect(input).toHaveValue('https://example.com/image.jpg');
  });
});
