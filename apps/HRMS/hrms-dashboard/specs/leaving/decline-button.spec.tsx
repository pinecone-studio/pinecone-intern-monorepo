import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DeclineButton from '../../src/app/leaving/_components/DeclineButton';
import { useDeclineRequestMutation } from '../../src/generated';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('../../src/generated/index', () => ({
  useDeclineRequestMutation: jest.fn(() => [jest.fn(), {}]),
}));

describe('DeclineButton', () => {
  it('calls the decline mutation', async () => {
    const mockId = '1';
    const { getByText } = render(<DeclineButton id={mockId} />);

    fireEvent.click(getByText('Татгалзах'));

    expect(useDeclineRequestMutation).toHaveBeenCalledWith();
  });
});
