import { render } from '@testing-library/react';
import React from 'react';
import { StatusTab } from '../../src/app/dashboard/_components/StatusTab';

describe('Status tab component test', () => {
  it('1. Should render status tab component', async () => {
    const { getByTestId } = render(<StatusTab selectedStatus="Test" thisStatus="Test" quantity={1} />);

    const statusTab = getByTestId('status-tab-test-id');

    expect(statusTab).toBeDefined();
  });
  it('2. Should render render status tab component when selected status and this status is not matched', async () => {
    const { getByTestId } = render(<StatusTab selectedStatus="Test" thisStatus="Test not match" quantity={1} />);

    const statusTab = getByTestId('status-tab-test-id');

    expect(statusTab).toBeDefined();
  });
});
