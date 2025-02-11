import { useAlert } from '@/components/providers/AlertProvider';
import ReservationConfirm from '@/components/ticketConfirm/ReservationConfirm';
import { MockedProvider } from '@apollo/client/testing';
import { act, fireEvent, render } from '@testing-library/react';
const value = {
  concertday: 'day',
  concertId: 'concert123',
  orderNumber: 12345,
  phoneNumber: 99999999,
  email: '',
  payType: 'qpay',
  totalPrice: 50000,
  vipPrice: 20000,
  vipQuantity: 1,
  standartPrice: 15000,
  standartQuantity: 1,
  standingAreaPrice: 15000,
  standingAreaQuantity: 1,
};
const mockHandleNext = jest.fn();
const mockHandleChange = jest.fn();
const mockHandleBack = jest.fn();

jest.mock('@/components/providers/AlertProvider', () => ({
  useAlert: jest.fn(),
}));

describe('reservation confirm', () => {
  const mockShowAlert = jest.fn();
  it('should warning alert', async () => {
    (useAlert as jest.Mock).mockReturnValue({ showAlert: mockShowAlert });
    const { getByTestId } = render(
      <MockedProvider>
        <ReservationConfirm ticketID="678ddd76c9cdc57819820767" handleBack={mockHandleBack} handleChange={mockHandleChange} handleNext={mockHandleNext} value={value} text="" />
      </MockedProvider>
    );

    await act(async () => {
      fireEvent.click(getByTestId('ticket-buy-continue'));
    });

    expect(mockShowAlert).toHaveBeenCalledWith('warning', 'Захиалагчийн мэдээллийг бөглөнө үү');
  });
  it('should successful handle next', async () => {
    (useAlert as jest.Mock).mockReturnValue({ showAlert: mockShowAlert });
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
    const { getByTestId } = render(
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
    await act(async () => {
      fireEvent.click(getByTestId('ticket-buy-continue'));
    });
    expect(mockHandleNext).toHaveBeenCalled();
  });
});
