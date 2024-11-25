import { UpdateBookInput } from '../../../generated';
import { bookingModel } from '../../../models';

export const updateBookingEverything = async (_: unknown, { input }: { input: UpdateBookInput }) => {
  try {
    const { eventId, bankName, bankAccount, userId, amountTotal, status, email, phone, selectedDate, venues, createdAt } = input;
    const updatedBooking = await bookingModel.findByIdAndUpdate(
      { _id: input.bookingID },
      {
        eventId,
        bankName,
        bankAccount,
        userId,
        amountTotal,
        status,
        email,
        phone,
        selectedDate,
        venues,
        createdAt,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedBooking) {
      throw new Error('Booking not found');
    }

    return updatedBooking;
  } catch (error) {
    throw new Error('Failed to update Booking');
  }
};
