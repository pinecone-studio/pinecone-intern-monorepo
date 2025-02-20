/* eslint-disable */
import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { ConcertFormProvider } from '../../../src/components/admincontext/DialogContext';
import '@testing-library/jest-dom';
import { TestComponent } from './TestComponent';
describe('ConcertFormContext', () => {
  const renderTicketTestComponent = () => {
    return render(
      <ConcertFormProvider>
        <TestComponent />
      </ConcertFormProvider>
    );
  };

  test('updates vipTicket.quantity with valid number', () => {
    renderTicketTestComponent();

    const input = screen.getByTestId('vip-quantity');
    fireEvent.change(input, { target: { value: '100' } });

    expect(screen.getByTestId('vip-quantity-display')).toHaveTextContent('100');
  });

  test('updates vipTicket.quantity to 0 when input is invalid', () => {
    renderTicketTestComponent();

    const input = screen.getByTestId('vip-quantity');
    fireEvent.change(input, { target: { value: 'abc' } });

    expect(screen.getByTestId('vip-quantity-display')).toHaveTextContent('0');
  });

  test('updates vipTicket.price with valid number', () => {
    renderTicketTestComponent();

    const input = screen.getByTestId('vip-price');
    fireEvent.change(input, { target: { value: '250' } });

    expect(screen.getByTestId('vip-price-display')).toHaveTextContent('250');
  });

  test('updates regularTicket.quantity with valid number', () => {
    renderTicketTestComponent();

    const input = screen.getByTestId('regular-quantity');
    fireEvent.change(input, { target: { value: '500' } });

    expect(screen.getByTestId('regular-quantity-display')).toHaveTextContent('500');
  });

  test('updates regularTicket.quantity to 0 when input is invalid', () => {
    renderTicketTestComponent();

    const input = screen.getByTestId('regular-quantity');
    fireEvent.change(input, { target: { value: 'invalid' } });

    expect(screen.getByTestId('regular-quantity-display')).toHaveTextContent('0');
  });

  test('updates regularTicket.price with valid number', () => {
    renderTicketTestComponent();

    const input = screen.getByTestId('regular-price');
    fireEvent.change(input, { target: { value: '150' } });

    expect(screen.getByTestId('regular-price-display')).toHaveTextContent('150');
  });

  test('updates standingAreaTicket.quantity with valid number', () => {
    renderTicketTestComponent();

    const input = screen.getByTestId('standing-quantity');
    fireEvent.change(input, { target: { value: '1000' } });

    expect(screen.getByTestId('standing-quantity-display')).toHaveTextContent('1000');
  });

  test('updates standingAreaTicket.quantity to 0 when input is invalid', () => {
    renderTicketTestComponent();

    const input = screen.getByTestId('standing-quantity');
    fireEvent.change(input, { target: { value: '!@#' } });

    expect(screen.getByTestId('standing-quantity-display')).toHaveTextContent('0');
  });

  test('updates standingAreaTicket.price with valid number', () => {
    renderTicketTestComponent();

    const input = screen.getByTestId('standing-price');
    fireEvent.change(input, { target: { value: '75' } });

    expect(screen.getByTestId('standing-price-display')).toHaveTextContent('75');
  });

  test('handles empty string by converting to 0', () => {
    renderTicketTestComponent();

    const input = screen.getByTestId('vip-quantity');
    fireEvent.change(input, { target: { value: '' } });

    expect(screen.getByTestId('vip-quantity-display')).toHaveTextContent('0');
  });

  test('handles negative numbers correctly', () => {
    renderTicketTestComponent();

    const input = screen.getByTestId('regular-price');
    fireEvent.change(input, { target: { value: '-50' } });

    expect(screen.getByTestId('regular-price-display')).toHaveTextContent('-50');
  });

  test('handles floating point input by truncating to integer', () => {
    renderTicketTestComponent();

    const input = screen.getByTestId('standing-price');
    fireEvent.change(input, { target: { value: '99.99' } });

    expect(screen.getByTestId('standing-price-display')).toHaveTextContent('99');
  });

  test('handles input with leading zeros', () => {
    renderTicketTestComponent();

    const input = screen.getByTestId('vip-quantity');
    fireEvent.change(input, { target: { value: '0050' } });

    expect(screen.getByTestId('vip-quantity-display')).toHaveTextContent('50');
  });
  it('initializes with default form data', () => {
    render(
      <ConcertFormProvider>
        <TestComponent />
      </ConcertFormProvider>
    );

    const formDataText = screen.getByTestId('formData').textContent;
    const formData = formDataText ? JSON.parse(formDataText) : null;
    expect(formData).toEqual({
      concertName: '',
      concertPhoto: '',
      concertPlan: '',
      concertDay: expect.any(String),
      concertTime: '00:00',
      artistName: [''],
      vipTicket: {
        price: 0,
        quantity: 0,
      },
      regularTicket: {
        price: 0,
        quantity: 0,
      },
      standingAreaTicket: {
        price: 0,
        quantity: 0,
      },
    });
  });
  it('updates form data on handleChange', () => {
    render(
      <ConcertFormProvider>
        <TestComponent />
      </ConcertFormProvider>
    );
    const input = screen.getByPlaceholderText('Concert Name');
    fireEvent.change(input, { target: { id: 'concertName', value: 'Test Concert' } });
    const formDataText = screen.getByTestId('formData').textContent;
    const formData = formDataText ? JSON.parse(formDataText) : null;
    expect(formData.concertName).toBe('Test Concert');
  });
  it('adds an artist', () => {
    render(
      <ConcertFormProvider>
        <TestComponent />
      </ConcertFormProvider>
    );
    const addButton = screen.getByText('Add Artist');
    act(() => {
      addButton.click();
    });
    const formDataText = screen.getByTestId('formData').textContent;
    const formData = formDataText ? JSON.parse(formDataText) : null;
    expect(formData.artistName).toEqual(['', '']);
  });
  it('changes an artist name', () => {
    render(
      <ConcertFormProvider>
        <TestComponent />
      </ConcertFormProvider>
    );
    const changeButton = screen.getByText('Change Artist');
    act(() => {
      changeButton.click();
    });
    const formDataText = screen.getByTestId('formData').textContent;
    const formData = formDataText ? JSON.parse(formDataText) : null;
    expect(formData.artistName[0]).toBe('New Artist');
  });
  it('removes an artist when more than one exists', () => {
    render(
      <ConcertFormProvider>
        <TestComponent />
      </ConcertFormProvider>
    );
    const addButton = screen.getByText('Add Artist');
    act(() => {
      addButton.click();
    });
    const removeButton = screen.getByText('Remove Artist');
    act(() => {
      removeButton.click();
    });
    const formDataText = screen.getByTestId('formData').textContent;
    const formData = formDataText ? JSON.parse(formDataText) : null;
    expect(formData.artistName).toEqual(['']);
  });
  it('does not remove the last artist', () => {
    render(
      <ConcertFormProvider>
        <TestComponent />
      </ConcertFormProvider>
    );
    const removeButton = screen.getByText('Remove Artist');
    act(() => {
      removeButton.click();
    });
    const formDataText = screen.getByTestId('formData').textContent;
    const formData = formDataText ? JSON.parse(formDataText) : null;
    expect(formData.artistName).toEqual(['']);
  });
  it('updates selected dates', () => {
    render(
      <ConcertFormProvider>
        <TestComponent />
      </ConcertFormProvider>
    );

    const datesButton = screen.getByTestId('button');
    act(() => {
      datesButton.click();
    });

    const formDataText = screen.getByTestId('formData').textContent;
    const formData = formDataText ? JSON.parse(formDataText) : null;

    expect(formData.date).toEqual([new Date('2024-01-01T00:00:00.000Z').toISOString()]);
  });

  it('handles undefined dates', () => {
    render(
      <ConcertFormProvider>
        <TestComponent />
      </ConcertFormProvider>
    );

    const clearButton = screen.getByText('Clear Dates');
    act(() => {
      fireEvent.click(clearButton);
    });

    const formDataText = screen.getByTestId('formData').textContent;
    const formData = formDataText ? JSON.parse(formDataText) : null;

    expect(formData).toHaveProperty('date');
    expect(formData.date).toEqual([]);
  });
  it('calls onSubmit with form data on submit', () => {
    const mockSubmit = jest.fn();
    render(
      <ConcertFormProvider onSubmit={mockSubmit}>
        <TestComponent />
      </ConcertFormProvider>
    );
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);
    expect(mockSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        concertName: '',
        concertPhoto: '',
        concertPlan: '',
        concertTime: '00:00',
        artistName: [''],
        vipTicket: { price: 0, quantity: 0 },
        regularTicket: { price: 0, quantity: 0 },
        standingAreaTicket: { price: 0, quantity: 0 },
      })
    );
  });
  it('throws an error when used outside provider', () => {
    expect(() => {
      render(<TestComponent />);
    }).toThrowError('useConcertForm must be used within a ConcertFormProvider');
  });
  it('does not throw error when onSubmit is not provided', () => {
    render(
      <ConcertFormProvider>
        <TestComponent />
      </ConcertFormProvider>
    );
    const form = screen.getByTestId('Concertform');
    expect(() => {
      fireEvent.submit(form);
    }).not.toThrow();
  });
  it('preserves other form data when updating dates', () => {
    render(
      <ConcertFormProvider>
        <TestComponent />
      </ConcertFormProvider>
    );

    const nameInput = screen.getByPlaceholderText('Concert Name');
    fireEvent.change(nameInput, { target: { name: 'concertName', value: 'Test Concert' } });

    const datesButton = screen.getByTestId('button');
    act(() => {
      datesButton.click();
    });

    const formDataText = screen.getByTestId('formData').textContent;
    const formData = formDataText ? JSON.parse(formDataText) : null;

    expect(formData.date).toEqual([new Date('2024-01-01T00:00:00.000Z').toISOString()]);
    expect(formData.concertName).toBe('Test Concert');
  });
});
