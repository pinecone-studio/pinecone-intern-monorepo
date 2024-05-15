import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { LeaveRequestCreationContext } from '../../../src/app/leaving/_providers/LeaveRequestCreationProvider';
import { CreateLeaveRequestGeneralInput } from '../../../src/app/leaving/_features/CreateLeaveRequestSteps/CreateLeaveRequestGeneralInput';
import { CreateLeaveRequestDaysOrDayOff } from '../../../src/app/leaving/_features/CreateLeaveRequestSteps/CreateLeaveRequestDaysOrDayOff';
import { CreateLeaveRequestButtonCustom } from '../../../src/app/leaving/_components/CreateLeaveRequestButtonCustom';

describe('Leave Request Creation Buttom', () => {
  it('should click next button', async () => {
    const onClick = jest.fn();
    const onClickPrev = jest.fn();

    const { getByTestId } = render(
      <LeaveRequestCreationContext.Provider value={{ leaveReqStep: <CreateLeaveRequestGeneralInput /> }}>
        <CreateLeaveRequestButtonCustom onClick={onClick} onClickPrev={onClickPrev} />
      </LeaveRequestCreationContext.Provider>
    );
    act(() => {
      fireEvent.click(getByTestId('nextButton'));
    });
  });
  it('should click next button', async () => {
    const onClick = jest.fn();
    const onClickPrev = jest.fn();

    const { getByTestId } = render(
      <LeaveRequestCreationContext.Provider value={{ leaveReqStep: <CreateLeaveRequestDaysOrDayOff /> }}>
        <CreateLeaveRequestButtonCustom onClick={onClick} onClickPrev={onClickPrev} />
      </LeaveRequestCreationContext.Provider>
    );
    act(() => {
      fireEvent.click(getByTestId('returnPreviousStep'));
    });
  });
});
