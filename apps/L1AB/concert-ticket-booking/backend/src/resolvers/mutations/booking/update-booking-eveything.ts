import { UpdateBookInput } from '../../../generated';
import { bookingModel } from '../../../models';

export const updateBookingEverything = async (_: unknown, { input }: { input: UpdateBookInput }) => {
  try {
    const { bankName, bankAccount, amountTotal, status, email, phone, selectedDate, venues, bankAccountName } = input;
    const updatedBooking = await bookingModel.findByIdAndUpdate(
      { _id: input._id },
      {
        bankName,
        bankAccount,
        bankAccountName,
        amountTotal,
        status,
        email,
        phone,
        selectedDate,
        venues,
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
