import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { LeaveRequestCreationProvider } from '../../../src/app/leaving/_providers/LeaveRequestCreationProvider';
import React from 'react';
import { CreateLeaveRequestAdditionInfo, CreateLeaveRequestDaysOrDayOff } from '../../../src/app/leaving/_components';

describe('Leave Request Creation: Day Off selected', () => {
  it('should fill inputs and move to Addition info', async () => {
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
});
