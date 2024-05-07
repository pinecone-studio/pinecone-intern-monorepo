import { render } from '@testing-library/react';
import { LeaveRequestCreationProvider } from '../../src/app/leaving/_providers/LeaveRequestCreationProvider';
import React from 'react';
import { CreateLeaveRequestSelectedDayOff } from '../../src/app/leaving/_components';

describe('Leave Request Creation provider should render', () => {
  it('should render', async () => {
    render(
      <LeaveRequestCreationProvider>
        <CreateLeaveRequestSelectedDayOff />
      </LeaveRequestCreationProvider>
    );
  });
});
