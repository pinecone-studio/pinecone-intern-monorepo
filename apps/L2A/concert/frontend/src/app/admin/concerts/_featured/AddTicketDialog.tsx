'use client';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { AddTicketSchema } from '../utils/add-ticket-schema';
import z from 'zod';
import { Button } from '@/components/ui/button';
import { AddTicketDefaultValues } from '../utils/add-ticket-default-values';
import AddTicketInfoInput from '../_components/AddTicketinfoinputs';
import AddTicketTimeInput from '../_components/AddTicketTimeInputs';
import AddTicketSeatInput from '../_components/AddTicketSeatInputs';
import AddTicketVenueInputs from '../_components/AddTicketVenueInfoInputs';
import AddTicketImageURLInput from '../_components/AddTicketImageUrlInput';
import { useCreateConcertMutation, useCreateVenueMutation } from '@/generated';

const AddTicketDialog = () => {
  const [createVenue, { loading: venueLoading }] = useCreateVenueMutation();
  const [CreateConcert, { error, loading, data }] = useCreateConcertMutation();
  const form = useForm<z.infer<typeof AddTicketSchema>>({
    resolver: zodResolver(AddTicketSchema),
    defaultValues: AddTicketDefaultValues,
    mode: 'onChange',
  });

  const onSubmit = async (values: z.infer<typeof AddTicketSchema>) => {
    try {
      const { venueName, venueAddress, venueCity, venueCapacity } = values;

      const responseVenue = await createVenue({ variables: { name: venueName, address: venueAddress, city: venueCity, capacity: venueCapacity } });

      if (responseVenue?.data?.createVenue) {
        await CreateConcert({
          variables: {
            input: {
              artistName: values.artistName,
              description: values.description,
              endDate: values.endDate,
              doorOpen: values.musicStart,
              musicStart: values.musicStart,
              thumbnailUrl: values.thumbnailUrl,
              title: values.title,
              venue: responseVenue.data.createVenue?.id,
              seatData: [
                {
                  date: values.startDate,
                  seats: {
                    Backseat: {
                      availableTickets: values.AvialableTicketCountBackSeat,
                      price: values.BackSeatTicketPrice,
                    },
                    Standard: {
                      availableTickets: values.AvialableTicketCountStandard,
                      price: values.StandardTicketPrice,
                    },
                    VIP: {
                      availableTickets: values.ticketCountVip,
                      price: values.VIPTicketPrice,
                    },
                  },
                },
              ],
            },
          },
        });
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div className="bg-foreground text-background p-2 rounded-xl hover:bg-secondary hover:text-foreground">Концерт нэмэх</div>
        </DialogTrigger>
        <DialogContent className=" w-[700px]">
          <DialogTitle>Концерт нэмэх</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" flex flex-col gap-4 text-xs">
              <div className=" flex flex-col gap-2">
                <AddTicketInfoInput form={form} />
                <AddTicketImageURLInput form={form} />
                <AddTicketVenueInputs form={form} />
                <AddTicketTimeInput form={form} />
                <AddTicketSeatInput form={form} />
              </div>
              {data?.createConcert && <div>Амжилттай нэмлээ!</div>}
              {error && <div>Концерт нэмэхэд асуудал гарлаа!</div>}
              <Button disabled={form.formState.isSubmitting || venueLoading || loading}>Нэмэх</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddTicketDialog;
