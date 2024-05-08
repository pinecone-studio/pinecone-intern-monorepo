import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { LeaveRequestCreationProvider } from '../../../src/app/leaving/_providers/LeaveRequestCreationProvider';
import { CreateLeaveRequestMain } from '../../../src/app/leaving/_features/CreateLeaveRequestMain';

describe('HomePageHeader', () => {
  it('should open Leave Request Creation modal while clicking the button', () => {
    HTMLDialogElement.prototype.showModal = jest.fn();
    HTMLDialogElement.prototype.close = jest.fn();

    const { getByTestId } = render(
      <LeaveRequestCreationProvider>
        <CreateLeaveRequestMain />
      </LeaveRequestCreationProvider>
    );

    const openButton = getByTestId('open-request-btn');

    act(() => {
      fireEvent.click(openButton);
    });
  });
});
