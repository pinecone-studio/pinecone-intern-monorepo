import ReservationConfirm from '@/components/ticketConfirm/ReservationConfirm';
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';

const mockHandleNext = jest.fn();
const mockHandleChange = jest.fn();
const mockHandleBack = jest.fn();

describe('reservation confirm', () => {
  it('should successful handle next', async () => {
    const MockedValue = {
      concertday: 'day',
      concertId: 'concert123',
      orderNumber: 12345,
      phoneNumber: 99999999,
      email: 'email@gmail.com',
      payType: 'qpay',
      totalPrice: 50000,
      vipPrice: 20000,
      vipQuantity: 1,
      standartPrice: 15000,
      standartQuantity: 1,
      standingAreaPrice: 15000,
      standingAreaQuantity: 1,
    };
    render(
      <MockedProvider>
        <ReservationConfirm
          ticketID="678ddd76c9cdc57819820767"
          handleBack={mockHandleBack}
          handleChange={mockHandleChange}
          handleNext={mockHandleNext}
          value={MockedValue}
          text=""
        ></ReservationConfirm>
      </MockedProvider>
    );
  });
});
