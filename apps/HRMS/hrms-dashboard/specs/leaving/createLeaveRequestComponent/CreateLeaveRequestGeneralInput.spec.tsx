import React from 'react';

import { LeaveRequestCreationProvider } from '../../../src/app/leaving/_providers/LeaveRequestCreationProvider';
import { render, act, fireEvent } from '@testing-library/react';
import { CreateLeaveRequestGeneralInput } from '../../../src/app/leaving/_components';

describe('Create Leave Request General Input', () => {
  it('1. should set values in input fields', async () => {
    const { getByTestId } = render(
      <LeaveRequestCreationProvider>
        <CreateLeaveRequestGeneralInput />
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
  });
});
