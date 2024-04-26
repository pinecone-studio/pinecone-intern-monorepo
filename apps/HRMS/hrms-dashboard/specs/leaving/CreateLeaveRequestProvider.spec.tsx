import { render } from '@testing-library/react';
import { LeaveReqCreationProvider } from '../../src/app/leaving/_providers/LeaveReqCreationProvider';
import React from 'react';

describe('Leave Request Creation provider should render', () => {
  it('should render', async () => {
    render(<LeaveReqCreationProvider />);
  });
});
