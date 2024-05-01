import React from 'react';

import { LeaveRequestCreationContext } from '../../src/app/leaving/_providers/LeaveRequestCreationProvider';
import { CreateLeaveRequestMain } from '../../src/app/leaving/_features/CreateLeaveRequestMain';
import { CreateLeaveRequestGeneralInput } from '../../src/app/leaving/_components';
import { render, act, fireEvent } from '@testing-library/react';

describe('Create Leave Request Step1', () => {
  it('1. should set setStepNumber function 1 when next button is clicked and move to step-2', async () => {
    const setStepNumber = jest.fn();

    const { getByTestId } = render(
      <LeaveRequestCreationContext.Provider value={{ stepNumber: 0, setStepNumber, leaveReqStep: <CreateLeaveRequestGeneralInput />, isOpen: true }}>
        <CreateLeaveRequestMain />
      </LeaveRequestCreationContext.Provider>
    );

    const selectUserName = getByTestId('name-select-input').getElementsByClassName('MuiSelect-select')[0];
    const selectType = getByTestId('type-select-input').getElementsByClassName('MuiSelect-select')[0];
    const nextButton = getByTestId('nextButton');

    act(() => {
      fireEvent.mouseDown(selectUserName);
    });

    act(() => {
      fireEvent.click(getByTestId('WorkerName'));
    });

    act(() => {
      fireEvent.mouseDown(selectType);
    });

    act(() => {
      fireEvent.click(getByTestId('type-0'));
    });

    act(() => {
      fireEvent.click(nextButton);
    });
  });

  it('2. should work onChange function of DatePicker component when changing date', () => {
    const { getByTestId } = render(
      <LeaveRequestCreationContext.Provider value={{ stepNumber: 0, leaveReqStep: <CreateLeaveRequestGeneralInput />, isOpen: true }}>
        <CreateLeaveRequestMain />
      </LeaveRequestCreationContext.Provider>
    );

    const datePickerInput = getByTestId('date-picker-container').getElementsByTagName('input')[0];

    act(() => {
      fireEvent.change(datePickerInput, { target: { value: '12/30/2000' } });
    });
  });
});
