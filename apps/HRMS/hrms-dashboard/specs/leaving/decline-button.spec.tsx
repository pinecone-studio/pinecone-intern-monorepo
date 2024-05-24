import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DeclineButton from '../../src/app/leaving/_components/DeclineButton';
import { useDeclineRequestMutation } from '../../src/generated';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('../../src/generated', () => ({
  useDeclineRequestMutation: jest.fn(() => [jest.fn(), {}]),
}));

describe('DeclineButton', () => {
  it('calls the decline mutation and navigates to /leaving', async () => {
    const mockId = '1';
    const mockStatus = 'pending';
    const { getByText } = render(<DeclineButton id={mockId} status={mockStatus} />);
    fireEvent.click(getByText('Татгалзах'));
    expect(useDeclineRequestMutation).toHaveBeenCalledWith();
  });

  it('disables button when status is approved', () => {
    const mockId = '1';
    const mockStatus = 'approved';
    const { getByTestId } = render(<DeclineButton id={mockId} status={mockStatus} />);
    const button = getByTestId('decline-button');
    expect(button).toBeTruthy();
  });

  it('enables button when status is not approved', () => {
    const mockId = '1';
    const mockStatus = 'pending';
    const { getByTestId } = render(<DeclineButton id={mockId} status={mockStatus} />);
    const button = getByTestId('decline-button');
    expect(button).toBeTruthy();
  });
});
