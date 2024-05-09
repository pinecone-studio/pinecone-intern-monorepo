import React from 'react';
import { LeaveRequestCreationContext } from '../../../src/app/leaving/_providers/LeaveRequestCreationProvider';
import { render, act, fireEvent } from '@testing-library/react';
import { CreateLeaveRequestModal } from '../../../src/app/leaving/_components';

describe('Create Leave Request Modal', () => {
  it('1. should close the Leave Request Creation modal when button is clicked and ', async () => {
    const { getByTestId } = render(
      <LeaveRequestCreationContext.Provider value={{ stepNumber: 1 }}>
        <CreateLeaveRequestModal />
      </LeaveRequestCreationContext.Provider>
    );

    const closeButton = getByTestId('modalClosingButton');

    act(() => {
      fireEvent.click(closeButton);
    });
  });
  it('2. should close the Leave Request Creation modal when button is clicked and ', async () => {
    const { getByTestId } = render(
      <LeaveRequestCreationContext.Provider value={{ stepNumber: 2 }}>
        <CreateLeaveRequestModal />
      </LeaveRequestCreationContext.Provider>
    );

    const closeButton = getByTestId('modalClosingButton');

    act(() => {
      fireEvent.click(closeButton);
    });
  });

  it('3. should render succeeded page ', async () => {
    const { getByTestId } = render(
      <LeaveRequestCreationContext.Provider value={{ isLeaveRequestSucceeded: true }}>
        <CreateLeaveRequestModal />
      </LeaveRequestCreationContext.Provider>
    );

    expect(getByTestId('LeaveRequestSucceeded')).toBeDefined();
  });
  it('4. should render Leave Request Creation modal ', async () => {
    const { getByTestId } = render(
      <LeaveRequestCreationContext.Provider value={{ isLeaveRequestSucceeded: false }}>
        <CreateLeaveRequestModal />
      </LeaveRequestCreationContext.Provider>
    );

    expect(getByTestId('createLeaveRequestModalContainer')).toBeDefined();
  });
});
