import { act, fireEvent, render } from '@testing-library/react';
import { LeaveRequestCreationProvider } from '../../../src/app/leaving/_providers/LeaveRequestCreationProvider';
import React from 'react';
import { CreateLeaveRequestDaysOrDayOff } from '../../../src/app/leaving/_features/CreateLeaveRequestSteps/CreateLeaveRequestDaysOrDayOff';

describe('Leave Request Creation Days or DayOff', () => {
  it('should fill Leave Request Creation: Days selected inputs and move to Addition info section', async () => {
    const { getByTestId } = render(
      <LeaveRequestCreationProvider>
        <CreateLeaveRequestDaysOrDayOff />
      </LeaveRequestCreationProvider>
    );

    act(() => {
      getByTestId('radioButtonDays').click();
    });

    const startDatePicker = getByTestId('starDate-picker-container').getElementsByTagName('input')[0];
    const endDatePicker = getByTestId('endDate-picker-container').getElementsByTagName('input')[0];
    const nextButton = getByTestId('nextButton');

    act(() => {
      fireEvent.change(startDatePicker, { target: { value: '2024-01-01' } });
    });

    act(() => {
      fireEvent.change(endDatePicker, { target: { value: '2024-01-05' } });
    });

    act(() => {
      fireEvent.click(nextButton);
    });
  });
  it('should fill Leave Request Creation: DayOff selected inputs and move to Addition info section', async () => {
    const { getByTestId } = render(
      <LeaveRequestCreationProvider>
        <CreateLeaveRequestDaysOrDayOff />
      </LeaveRequestCreationProvider>
    );

    act(() => {
      getByTestId('radioButtonDayOff').click();
    });

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
  });
});
