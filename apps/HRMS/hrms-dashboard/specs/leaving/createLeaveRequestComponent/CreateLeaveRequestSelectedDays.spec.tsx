import { act, fireEvent, render } from '@testing-library/react';
import { LeaveRequestCreationProvider } from '../../../src/app/leaving/_providers/LeaveRequestCreationProvider';
import React from 'react';
import { CreateLeaveRequestDaysOrDayOff } from '../../../src/app/leaving/_components';

describe('Leave Request Creation: Days selected', () => {
  it('should fill inputs and move to Addition info section', async () => {
    const { getByTestId } = render(
      <LeaveRequestCreationProvider>
        <CreateLeaveRequestDaysOrDayOff />
      </LeaveRequestCreationProvider>
    );

    expect(getByTestId('step2Component')).toBeDefined();

    act(() => {
      getByTestId('radioButtonDays').click();
    });

    expect(getByTestId('leaveRequestDays')).toBeDefined();

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
});
