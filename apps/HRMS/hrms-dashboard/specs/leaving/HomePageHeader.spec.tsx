import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { LeaveRequestCreationContext } from '../../src/app/leaving/_providers/LeaveRequestCreationProvider';
import { CreateLeaveRequestMain } from '../../src/app/leaving/_features/CreateLeaveRequestMain';

describe('HomePageHeader', () => {
  it('should set setIsOpen function true when button is clicked and open Leave Request Creation modal', () => {
    const setIsOpen = jest.fn();

    const { getByTestId } = render(
      <LeaveRequestCreationContext.Provider value={{ setIsOpen }}>
        <CreateLeaveRequestMain />
      </LeaveRequestCreationContext.Provider>
    );

    const openButton = getByTestId('open-request-btn');

    act(() => {
      fireEvent.click(openButton);
    });
  });
});
