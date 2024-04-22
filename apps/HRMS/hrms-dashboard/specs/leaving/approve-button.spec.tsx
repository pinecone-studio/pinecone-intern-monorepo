import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ApproveButton from '../../src/app/leaving/_components/ApproveButton';
import { useApproveRequestMutation } from '../../src/generated';
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('../../src/generated/index', () => ({
  useApproveRequestMutation: jest.fn(() => [jest.fn(), {}]),
}));

describe('ApproveButton', () => {
  it('calls the approve mutation and redirects on click', async () => {
    const mockId = '1';
    const { getByText } = render(<ApproveButton id={mockId} />);
    fireEvent.click(getByText('Зөвшөөрөх'));

    expect(useApproveRequestMutation).toHaveBeenCalledWith();
  });
});
