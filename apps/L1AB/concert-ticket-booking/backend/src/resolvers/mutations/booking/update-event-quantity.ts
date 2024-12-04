import { BookingVenue, UpdateEventQuantityInput } from '../../../generated';
import { bookingModel, EventModel } from '../../../models';

export const updateEventQuantityBooking = async (_: unknown, { input }: { input: UpdateEventQuantityInput }) => {
  try {
    const booking = await findBookingById(input._id);
    const event = await findEventById(input.eventId);

    event.venues = adjustVenueQuantities(event.venues, input.venues);
    await event.save();

    booking.status = 'Баталгаажсан';
    await booking.save();

    return booking;
  } catch (error) {
    handleError(error);
  }
};

const findBookingById = async (id: string) => {
  const booking = await bookingModel.findById(id);
  if (!booking) {
    throw new Error('Booking not found');
  }
  return booking;
};

const findEventById = async (eventId: string) => {
  const event = await EventModel.findById(eventId);
  if (!event) {
    throw new Error('Event not found');
  }
  return event;
};

const adjustVenueQuantities = (eventVenues: BookingVenue[], bookingVenues: BookingVenue[]) => {
  return eventVenues.map((eventVenue) => {
    const matchingBookingVenue = bookingVenues.find((bookingVenue) => bookingVenue.name === eventVenue.name);

    if (matchingBookingVenue) {
      if (eventVenue.quantity < matchingBookingVenue.quantity) {
        throw new Error('Тасалбар дууссан байна');
      }

      return {
        ...eventVenue,
        quantity: Math.max(eventVenue.quantity - matchingBookingVenue.quantity, 0),
      };
    }

    return eventVenue;
  });
};

const handleError = (error: unknown) => {
  if (error instanceof Error) {
    if (error.message === 'Booking not found') {
      throw new Error('Booking not found');
    } else if (error.message === 'Event not found') {
      throw new Error('Event not found');
    } else {
      throw new Error(`Failed to update booking and event: ${error.message}`);
    }
  }
};
