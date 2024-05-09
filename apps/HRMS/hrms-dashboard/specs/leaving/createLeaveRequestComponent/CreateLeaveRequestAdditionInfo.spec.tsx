import React from 'react';
import { LeaveRequestCreationProvider } from '../../../src/app/leaving/_providers/LeaveRequestCreationProvider';
import { act, fireEvent, render } from '@testing-library/react';
import { CreateLeaveRequestAdditionInfo } from '../../../src/app/leaving/_components';

describe('Create Leave Request: Additional information', () => {
  it('1. should fill input fields', async () => {
    const { getByTestId } = render(
      <LeaveRequestCreationProvider>
        <CreateLeaveRequestAdditionInfo />
      </LeaveRequestCreationProvider>
    );

    const typeSubstitute = getByTestId('step3Substitute-container').getElementsByTagName('input')[0];
    const typeWorkBrief = getByTestId('step3WorkBrief-container');
    const selectApprovedBy = getByTestId('step3ApprovedBy-container').getElementsByTagName('select')[0];
    const nextButton = getByTestId('nextButton');

    act(() => {
      fireEvent.change(typeSubstitute, { target: { value: 'Ajiltan 1' } });
    });

    act(() => {
      fireEvent.change(typeWorkBrief, { target: { value: 'Work brief' } });
    });

    act(() => {
      fireEvent.change(selectApprovedBy, { target: { value: 'remote' } });
    });

    act(() => {
      fireEvent.click(nextButton);
    });
  });
  it('2. should move to previous page', async () => {
    const { getByTestId } = render(
      <LeaveRequestCreationProvider>
        <CreateLeaveRequestAdditionInfo />
      </LeaveRequestCreationProvider>
    );

    const previousButton = getByTestId('returnPreviousStep');

    act(() => {
      fireEvent.click(previousButton);
    });
  });
});
