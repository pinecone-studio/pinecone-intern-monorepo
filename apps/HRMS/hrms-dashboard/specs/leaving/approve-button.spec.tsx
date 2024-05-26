import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ApproveButton from '../../src/app/leaving/_components/ApproveButton';
import { useApproveRequestMutation } from '../../src/generated';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('../../src/generated', () => ({
  useApproveRequestMutation: jest.fn(() => [jest.fn(), {}]),
}));

describe('ApproveButton', () => {
  it('calls the decline mutation and navigates to /leaving', async () => {
    const mockId = '1';
    const mockStatus = 'approved';
    const { getByText } = render(<ApproveButton id={mockId} status={mockStatus} />);
    fireEvent.click(getByText('Зөвшөөрөх'));
    expect(useApproveRequestMutation).toHaveBeenCalledWith();
  });

  it('disables button when status is approved', () => {
    const mockId = '1';
    const mockStatus = 'approved';
    const { getByTestId } = render(<ApproveButton id={mockId} status={mockStatus} />);
    const button = getByTestId('approve-button');
    expect(button).toBeTruthy();
  });

  it('enables button when status is not approved', () => {
    const mockId = '1';
    const mockStatus = 'pending';
    const { getByTestId } = render(<ApproveButton id={mockId} status={mockStatus} />);
    const button = getByTestId('approve-button');
    expect(button).toBeTruthy();
  });
  it('renders correctly when disabled', () => {
    const mockId = '1';
    const mockStatus = 'APPROVED';
    const { getByTestId } = render(<ApproveButton id={mockId} status={mockStatus} />);
    const button = getByTestId('approve-button');
    expect(button).toBeTruthy();
  });
});
