/* eslint-disable */
import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { ConcertFormProvider } from '../../../src/components/admincontext/DialogContext';
import '@testing-library/jest-dom';
import { TestComponent } from './TestComponent';
describe('ConcertFormContext', () => {
  it('initializes with default form data', () => {
    render(
      <ConcertFormProvider>
        <TestComponent />
      </ConcertFormProvider>
    );

    const formDataText = screen.getByTestId('formData').textContent;
    const formData = formDataText ? JSON.parse(formDataText) : null;
    expect(formData).toEqual({
      concertname: '',
      concertPhoto: '',
      concertDescription: '',
      artistName: [''],
      dates: [],
      time: '',
      vipticketquantity: '',
      vipticketprice: '',
      regularticketquantity: '',
      regularticketprice: '',
      openfieldticketquantity: '',
      openfieldticketprice: '',
    });
  });
  it('updates form data on handleChange', () => {
    render(
      <ConcertFormProvider>
        <TestComponent />
      </ConcertFormProvider>
    );
    const input = screen.getByPlaceholderText('Concert Name');
    fireEvent.change(input, { target: { value: 'Test Concert' } });
    const formDataText = screen.getByTestId('formData').textContent;
    const formData = formDataText ? JSON.parse(formDataText) : null;
    expect(formData.concertname).toBe('Test Concert');
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
    const datesButton = screen.getByText('Select Dates');
    act(() => {
      datesButton.click();
    });
    const formDataText = screen.getByTestId('formData').textContent;
    const formData = formDataText ? JSON.parse(formDataText) : null;
    expect(formData.dates).toEqual(['2024-01-01T00:00:00.000Z', '2024-01-02T00:00:00.000Z']);
    expect(formData).toHaveProperty('dates');
    expect(formData.dates).toHaveLength(2);
    expect(formData.dates[0]).toBe('2024-01-01T00:00:00.000Z');
    expect(formData.dates[1]).toBe('2024-01-02T00:00:00.000Z');
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

    expect(formData).toHaveProperty('dates');
    expect(formData.dates).toHaveLength(0);
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
    expect(mockSubmit).toHaveBeenCalledWith({
      concertname: '',
      concertPhoto: '',
      concertDescription: '',
      artistName: [''],
      dates: [],
      time: '',
      vipticketquantity: '',
      vipticketprice: '',
      regularticketquantity: '',
      regularticketprice: '',
      openfieldticketquantity: '',
      openfieldticketprice: '',
    });
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
    const input = screen.getByPlaceholderText('Concert Name');
    fireEvent.change(input, { target: { id: 'concertname', value: 'Test Concert' } });
    const datesButton = screen.getByTestId('button');
    act(() => {
      datesButton.click();
    });
    const formDataText = screen.getByTestId('formData').textContent;
    const formData = formDataText ? JSON.parse(formDataText) : null;
    expect(formData.dates).toEqual(['2024-01-01T00:00:00.000Z', '2024-01-02T00:00:00.000Z']);
    expect(formData.concertname).toBe('Test Concert');
  });
});
