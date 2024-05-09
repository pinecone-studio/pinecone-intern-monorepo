import { render } from '@testing-library/react';
import React from 'react';
import { CreateLeaveRequestSucceeded } from '../../../src/app/leaving/_components/createLeaveReqComp/CreateLeaveRequestSucceeded';

describe('Leave Request Creation succeeded', () => {
  it('should render', async () => {
    render(<CreateLeaveRequestSucceeded />);
  });
});
