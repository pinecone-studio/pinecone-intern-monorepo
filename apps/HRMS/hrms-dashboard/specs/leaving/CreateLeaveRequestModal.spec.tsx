import React from 'react';
import { LeaveRequestCreationContext } from '../../src/app/leaving/_providers/LeaveRequestCreationProvider';
import { CreateLeaveRequestMain } from '../../src/app/leaving/_features/CreateLeaveRequestMain';
import { render, act, fireEvent } from '@testing-library/react';

describe('Create Leave Request Modal', () => {
  it('should close the Leave Request Creation modal when button is clicked and ', async () => {
    const { getByTestId } = render(
      <LeaveRequestCreationContext.Provider value={{ stepNumber: 1 }}>
        <CreateLeaveRequestMain />
      </LeaveRequestCreationContext.Provider>
    );

    const closeButton = getByTestId('modalClosingButton');

    act(() => {
      fireEvent.click(closeButton);
    });
  });
});
