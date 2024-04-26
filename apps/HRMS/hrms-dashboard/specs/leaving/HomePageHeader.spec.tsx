import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { LeaveReqCreationContext } from '../../src/app/leaving/_providers/LeaveReqCreationProvider';
import { CreateLeaveReqMain } from '../../src/app/leaving/_features/CreateLeaveReqMain';

describe('HomePageHeader', () => {
  it('should set setIsOpen function true when button is clicked and open Leave Request Creation modal', () => {
    const setIsOpen = jest.fn();

    const { getByTestId } = render(
      <LeaveReqCreationContext.Provider value={{ setIsOpen }}>
        <CreateLeaveReqMain />
      </LeaveReqCreationContext.Provider>
    );

    const openButton = getByTestId('open-request-btn');

    act(() => {
      fireEvent.click(openButton);
    });
  });
});
