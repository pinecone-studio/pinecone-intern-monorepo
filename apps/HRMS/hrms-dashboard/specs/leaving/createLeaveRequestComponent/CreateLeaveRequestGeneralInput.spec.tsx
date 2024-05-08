import React from 'react';

import { LeaveRequestCreationProvider } from '../../../src/app/leaving/_providers/LeaveRequestCreationProvider';
import { CreateLeaveRequestMain } from '../../../src/app/leaving/_features/CreateLeaveRequestMain';
import { render, act, fireEvent, waitFor } from '@testing-library/react';

describe('Create Leave Request General Input', () => {
  it('1. should set values in input fields and move to step-2', async () => {
    const { getByTestId } = render(
      <LeaveRequestCreationProvider>
        <CreateLeaveRequestMain />
      </LeaveRequestCreationProvider>
    );

    const datePicker = getByTestId('date-picker-container').getElementsByTagName('input')[0];
    const selectUserName = getByTestId('name-select-input').getElementsByTagName('select')[0];
    const selectType = getByTestId('type-select-input').getElementsByTagName('select')[0];
    const nextButton = getByTestId('nextButton');

    act(() => {
      fireEvent.change(datePicker, { target: { value: '2000-01-01' } });
    });

    act(() => {
      fireEvent.change(selectUserName, { target: { value: 'WorkerName' } });
    });

    act(() => {
      fireEvent.change(selectType, { target: { value: 'remote' } });
    });

    act(() => {
      fireEvent.click(nextButton);
    });

    await waitFor(() => expect(getByTestId('step2Component')).toBeDefined());
  });
});
