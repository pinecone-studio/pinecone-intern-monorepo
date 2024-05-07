import React from 'react';

import { LeaveRequestCreationProvider } from '../../src/app/leaving/_providers/LeaveRequestCreationProvider';
import { render, act } from '@testing-library/react';
import { CreateLeaveRequestDaysOrDayOff } from '../../src/app/leaving/_components';

describe('Create Leave Request Step2', () => {
  it('1. should move to step 2 from step 1', async () => {
    HTMLDialogElement.prototype.showModal = jest.fn();

    const { getByTestId } = render(
      <LeaveRequestCreationProvider>
        <CreateLeaveRequestDaysOrDayOff />
      </LeaveRequestCreationProvider>
    );

    expect(getByTestId('step2Component')).toBeDefined();

    act(() => {
      getByTestId('radioButtonDayOff').click();
    });

    act(() => {
      getByTestId('radioButtonDays').click();
    });

    act(() => {
      getByTestId('nextButton').click();
    });
  });
  it('2. should return to step 1 from step 2', async () => {
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
