import gql from 'graphql-tag';

export const MutationTypeDefs = gql`
  type Mutation {
    addUser(email: String!, password: String!): User!
    loginUser(email: String!, password: String!): User!
    createConcert(input: CreateConcertInput!): Concert!
    createVenue(name: String!, address: String!, city: String!, capacity: Int!): Venue!
    createTicketOrder(input: CreateTicketOrderInput!): TicketOrderPayload!
    createBooking(input: CreateBookingInput!, ticketIds: [String!]!): Booking!
    registerUser(email: String!, password: String!): User!
    sampleMutation(text: String): String!
    updateUserInfo(id: String!, email: String, password: String, phone: Int): User!
    OTP(email: String!): otp!
    OtpStep2(email: String!, otp: Int!): otp!
    OtpStep3(email: String!, otp: Int!, password: String!): User!
    changePassword(otp: String!, newPassword: String!): String!
    changeCurrentPassword(email: String!, currentPassword: String!, newPassword: String!): User!
    searchEvents(name: String): [Concert!]!
    deleteEvent(id: String!): Concert!
    featureAnEvent(concertId: String!): Concert!
    updateEventInfo(concertId: String!, description: String, title: String, artistName: String): Concert!
    createCancelRequest(userId: String!, ticketId: String!, bankName: String!, accountNumber: String!, bankOwnerName: String!): Request!
    changeStatus(requestId: String!): Request!
  }
`;
