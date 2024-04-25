import React from 'react';

import { LeaveReqCreationContext } from '../../src/app/leaving/_providers/LeaveReqCreationProvider';
import { CreateLeaveReqMain } from '../../src/app/leaving/_features/CreateLeaveReqMain';
import { render, act, fireEvent } from '@testing-library/react';

describe('Create Leave Request Modal', () => {
  it('should set setIsOpen function false when button is clicked and close the Leave Request Creation modal', async () => {
    const setIsOpen = jest.fn();

    const { getByTestId } = render(
      <LeaveReqCreationContext.Provider value={{ setIsOpen, isOpen: true }}>
        <CreateLeaveReqMain />
      </LeaveReqCreationContext.Provider>
    );

    const closeButton = getByTestId('modalClosingButton');

    act(() => {
      fireEvent.click(closeButton);
    });
  });
});
