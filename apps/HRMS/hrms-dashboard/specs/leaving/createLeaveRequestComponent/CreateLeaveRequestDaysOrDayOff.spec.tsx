import React from 'react';

import { LeaveRequestCreationProvider } from '../../../src/app/leaving/_providers/LeaveRequestCreationProvider';
import { render, act, fireEvent, waitFor } from '@testing-library/react';
import { CreateLeaveRequestAdditionInfo, CreateLeaveRequestDaysOrDayOff } from '../../../src/app/leaving/_components';

describe('Create Leave Request Step2', () => {
  it('1. should choose Days', async () => {
    HTMLDialogElement.prototype.showModal = jest.fn();

    const { getByTestId } = render(
      <LeaveRequestCreationProvider>
        <CreateLeaveRequestDaysOrDayOff />
        <CreateLeaveRequestAdditionInfo />
      </LeaveRequestCreationProvider>
    );

    expect(getByTestId('step2Component')).toBeDefined();

    const nextButton = getByTestId('nextButton');

    act(() => {
      nextButton.click();
    });

    act(() => {
      getByTestId('radioButtonDays').click();
    });

    expect(getByTestId('leaveRequestDays')).toBeDefined();

    const startDatePicker = getByTestId('starDate-picker-container').getElementsByTagName('input')[0];
    const endDatePicker = getByTestId('endDate-picker-container').getElementsByTagName('input')[0];

    act(() => {
      fireEvent.change(startDatePicker, { target: { value: '2024-01-01' } });
    });

    act(() => {
      fireEvent.change(endDatePicker, { target: { value: '2024-01-05' } });
    });

    act(() => {
      fireEvent.click(nextButton);
    });

    await waitFor(() => expect(getByTestId('step3Component')).toBeDefined());
  });

  it('2. should choose Day-off', async () => {
    HTMLDialogElement.prototype.showModal = jest.fn();

    const { getByTestId } = render(
      <LeaveRequestCreationProvider>
        <CreateLeaveRequestDaysOrDayOff />
        <CreateLeaveRequestAdditionInfo />
      </LeaveRequestCreationProvider>
    );

    expect(getByTestId('step2Component')).toBeDefined();

    act(() => {
      getByTestId('radioButtonDayOff').click();
    });

    expect(getByTestId('leaveRequestDayOff')).toBeDefined();

    const datePicker = getByTestId('date-picker-container').getElementsByTagName('input')[0];
    const startHouPicker = getByTestId('startHour-picker-container').getElementsByTagName('input')[0];
    const endHourPicker = getByTestId('endHour-picker-container').getElementsByTagName('input')[0];
    const nextButton = getByTestId('nextButton');

    act(() => {
      fireEvent.change(datePicker, { target: { value: '2024-01-01' } });
    });

    act(() => {
      fireEvent.change(startHouPicker, { target: { value: '12:00' } });
    });

    act(() => {
      fireEvent.change(endHourPicker, { target: { value: '13:00' } });
    });

    act(() => {
      fireEvent.click(nextButton);
    });

    await waitFor(() => expect(getByTestId('step3Component')).toBeDefined());
  });
  it('3. should return to General Input from Choosing days or daty off step', async () => {
    const { getByTestId } = render(
      <LeaveRequestCreationProvider>
        <CreateLeaveRequestDaysOrDayOff />
      </LeaveRequestCreationProvider>
    );

    expect(getByTestId('step2Component')).toBeDefined();

    act(() => {
      getByTestId('returnPreviousStep').click();
    });
  });
});
