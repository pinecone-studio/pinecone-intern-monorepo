import { render } from '@testing-library/react';
import { LeaveRequestCreationProvider } from '../../../src/app/leaving/_providers/LeaveRequestCreationProvider';
import React from 'react';

describe('Leave Request Creation provider should render', () => {
  it('should render', async () => {
    render(<LeaveRequestCreationProvider />);
  });
});
