import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { RecruitingButton } from '../../src/app/recruiting/_components';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('RecruitingButton', () => {
  it('Should render profile button component', () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    const { getByText } = render(<RecruitingButton text="hello test" />);
    const button = getByText('hello test');
    fireEvent.click(button);
    expect(mockPush).toHaveBeenCalledWith('/jobrecruit');
  });
});
