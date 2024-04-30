import React from 'react';

import { LeaveReqCreationProvider } from '../../src/app/leaving/_providers/LeaveReqCreationProvider';
import { CreateLeaveReqMain } from '../../src/app/leaving/_features/CreateLeaveReqMain';
import { render, act, fireEvent, waitFor } from '@testing-library/react';

describe('Create Leave Request Step2', () => {
  it('1. should move to step 2 from step 1', async () => {
    const { getByTestId } = render(
      <LeaveReqCreationProvider>
        <CreateLeaveReqMain />
      </LeaveReqCreationProvider>
    );

    const leaveRequestOpeningButton = getByTestId('open-request-btn');

    act(() => {
      fireEvent.click(leaveRequestOpeningButton);
    });

    const modal = getByTestId('leaveRequestModal');

    expect(modal).toBeDefined();

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

    await waitFor(() => {
      expect(getByTestId('step2Component')).toBeDefined();
    });

    act(() => {
      getByTestId('radioButtonDayOff').click();
    });

    act(() => {
      getByTestId('nextButton').click();
    });

    await waitFor(() => {
      expect(getByTestId('leaveRequestDayOff')).toBeDefined();
    });
  });
  it('2. should return to step 1 from step 2', async () => {
    const { getByTestId } = render(
      <LeaveReqCreationProvider>
        <CreateLeaveReqMain />
      </LeaveReqCreationProvider>
    );

    const leaveRequestOpeningButton = getByTestId('open-request-btn');

    act(() => {
      fireEvent.click(leaveRequestOpeningButton);
    });

    const modal = getByTestId('leaveRequestModal');

    expect(modal).toBeDefined();

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

    await waitFor(() => {
      expect(getByTestId('step2Component')).toBeDefined();
    });

    act(() => {
      getByTestId('returnPreviousStep').click();
    });
    await waitFor(() => {
      expect(getByTestId('date-picker-container')).toBeDefined();
    });
  });
});
