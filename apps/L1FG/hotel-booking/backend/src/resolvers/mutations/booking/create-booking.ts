import { MutationResolvers } from '../../../generated';
import { BookingModel } from '../../../models';

export const createBooking: MutationResolvers['createBooking'] = async (_, { input }) => {
  const { userId, hotelId, roomId, startDate, endDate, phoneNumber, guestRequest, email, status, cardName, cardNumber, expirationDate, securityCode, country, firstName, lastName, middleName } = input;
  console.log(input);
  try {
    const newBooking = await BookingModel.create({
      userId,
      hotelId,
      roomId,
      startDate,
      endDate,
      phoneNumber,
      guestRequest,
      email,
      status,
      cardName,
      cardNumber,
      expirationDate,
      securityCode,
      country,
      firstName,
      lastName,
      middleName
    });
    return {
      code: 200,
      success: true,
      message: 'Booking created successfully',
      booking: newBooking,
    };
  } catch (e) {
    return {
      code: 500,
      success: false,
      message: 'Failed to create booking',
      booking: undefined,
    };
  }
};
