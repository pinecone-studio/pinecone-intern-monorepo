import { useAlert } from '@/components/providers/AlertProvider';
import PaymentTicket from '@/components/ticketConfirm/Payment';
import { CreateOrderDocument } from '@/generated';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { act, render, fireEvent } from '@testing-library/react';
/* eslint-disable */
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('@/components/providers/AlertProvider', () => ({
  useAlert: jest.fn(),
}));

const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

const mockCreateOrder: MockedResponse = {
  request: {
    query: CreateOrderDocument,
    variables: {
      input: {
        concertID: '',
        email: 'test@example.com',
        paymentType: 'credit_card',
        regularTicket: {
          price: 30,
          quantity: 2,
        },
        phoneNumber: 1234567890,
        standingAreaTicket: {
          price: 20,
          quantity: 3,
        },
        ticketID: '',
        ticketNumber: 12345,
        userID: '678ddd76c9cdc57819820762',
        totalPrice: 100,
        vipTicket: {
          price: 50,
          quantity: 1,
        },
        orderStatus: 'PENDING',
      },
    },
  },
  result: {
    data: {
      createOrder: {
        userID: '678ddd76c9cdc57819820762',
        concertID: '678ddd76c9cdc57819820769',
        ticketID: '678ddd76c9cdc57819820767',
        phoneNumber: 1234567890,
        email: 'test@example.com',
        totalPrice: 100,
        paymentType: 'credit_card',
        ticketNumber: 12345,
        vipTicket: {
          price: 50,
          quantity: 1,
        },
        regularTicket: {
          price: 30,
          quantity: 2,
        },
        standingAreaTicket: {
          price: 20,
          quantity: 3,
        },
        _id: '67aac32406158cdd3a06485d',
      },
    },
  },
};

describe('PaymentTicket', () => {
  const mockHandleChange = jest.fn();
  const mockHandleBack = jest.fn();
  const mockShowAlert = jest.fn();

  const mockValue = {
    concertday: '1',
    concertId: '678ddd76c9cdc57819820769',
    orderNumber: 12345,
    phoneNumber: 1234567890,
    email: 'test@example.com',
    totalPrice: 100,
    payType: 'credit_card',
    vipPrice: 50,
    vipQuantity: 1,
    standartPrice: 30,
    standartQuantity: 2,
    standingAreaPrice: 20,
    standingAreaQuantity: 3,
  };

  beforeEach(() => {
    (useAlert as jest.Mock).mockReturnValue({ showAlert: mockShowAlert });
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('calls createOrder when the form is submitted', async () => {
    localStorage.setItem('user', JSON.stringify({ _id: '678ddd76c9cdc57819820762' }));
    const { getByTestId } = render(
      <MockedProvider mocks={[mockCreateOrder]} addTypename={false}>
        <PaymentTicket text="" handleNext={jest.fn()} handleChange={mockHandleChange} handleBack={mockHandleBack} value={mockValue} ticketID="678ddd76c9cdc57819820767" />
      </MockedProvider>
    );
    await act(async () => {
      fireEvent.click(getByTestId('payment-section-button'));
    });
    expect(mockShowAlert).not.toHaveBeenCalledWith('error', 'Захиалга үүсэхэд алдаа гарлаа');
  });

  it('shows a warning alert if payType is empty', async () => {
    localStorage.setItem('user', JSON.stringify({ _id: '678ddd76c9cdc57819820762' }));
    const emptyPaytype = { ...mockValue, payType: '' };

    const { getByTestId } = render(
      <MockedProvider mocks={[mockCreateOrder]} addTypename={false}>
        <PaymentTicket text="" handleNext={jest.fn()} handleChange={mockHandleChange} handleBack={mockHandleBack} value={emptyPaytype} ticketID="678ddd76c9cdc57819820767" />
      </MockedProvider>
    );

    await act(async () => {
      fireEvent.click(getByTestId('payment-section-button'));
    });
    expect(mockShowAlert).toHaveBeenCalledWith('warning', 'Төлбөрийн нөхцөлөө сонгоно уу');
  });

  it('calls createOrder when the onError', async () => {
    localStorage.setItem('user', JSON.stringify({ _id: '678ddd76c9cdc57819820762' }));
    const onErrorValue = { ...mockValue, email: '', totalPrice: 0 };

    const { getByTestId } = render(
      <MockedProvider mocks={[mockCreateOrder]} addTypename={false}>
        <PaymentTicket text="" handleNext={jest.fn()} handleChange={mockHandleChange} handleBack={mockHandleBack} value={onErrorValue} ticketID="678ddd76c9cdc57819820767" />
      </MockedProvider>
    );

    await act(async () => {
      fireEvent.click(getByTestId('payment-section-button'));
    });
    expect(mockShowAlert).toHaveBeenCalledWith('error', 'Захиалга үүсэхэд алдаа гарлаа');
  });

  it('localStorage getItem field', async () => {
    render(
      <MockedProvider mocks={[mockCreateOrder]} addTypename={false}>
        <PaymentTicket text="" handleNext={jest.fn()} handleChange={mockHandleChange} handleBack={mockHandleBack} value={mockValue} ticketID="678ddd76c9cdc57819820767" />
      </MockedProvider>
    );
    expect(localStorage.getItem).toHaveBeenCalledWith('user');
  });
});
