import React from 'react';

import { LeaveRequestCreationContext } from '../../src/app/leaving/_providers/LeaveRequestCreationProvider';
import { CreateLeaveRequestMain } from '../../src/app/leaving/_features/CreateLeaveRequestMain';
import { render, act, fireEvent } from '@testing-library/react';

describe('Create Leave Request Modal', () => {
  it('should set setIsOpen function false when button is clicked and close the Leave Request Creation modal', async () => {
    const setIsOpen = jest.fn();

    const { getByTestId } = render(
      <LeaveRequestCreationContext.Provider value={{ setIsOpen, isOpen: true }}>
        <CreateLeaveRequestMain />
      </LeaveRequestCreationContext.Provider>
    );

    const closeButton = getByTestId('modalClosingButton');

    act(() => {
      fireEvent.click(closeButton);
    });
  });
});
