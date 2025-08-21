import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MyProfileForm } from '@/components/MyProfileForm';
import { useGetAllInterestsQuery } from '@/generated';

// Mock the GraphQL hook
jest.mock('@/generated', () => ({
  useGetAllInterestsQuery: jest.fn(),
}));

describe('MyProfileForm', () => {
  const mockUseGetAllInterestsQuery = useGetAllInterestsQuery as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock interests data
    mockUseGetAllInterestsQuery.mockReturnValue({
      data: {
        getAllInterests: [
          { _id: 'art', interestName: 'Art' },
          { _id: 'music', interestName: 'Music' },
          { _id: 'sports', interestName: 'Sports' },
          { _id: 'travel', interestName: 'Travel' },
        ],
      },
    });
  });

  it('renders all form fields and buttons', () => {
    render(<MyProfileForm />);
    expect(screen.getByLabelText(/Date of birth/i));
  });
  it('submits form with updated values', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {
      //intenioanally empty
    });
    render(<MyProfileForm />);

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'janedoe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Bio/i), { target: { value: 'Updated bio' } });
    fireEvent.change(screen.getByLabelText(/Profession/i), { target: { value: 'Product Manager' } });
    fireEvent.change(screen.getByLabelText(/School/i), { target: { value: 'Google' } });

    const genderSelectTrigger = screen.getByRole('combobox', { name: /gender preference/i });
    fireEvent.mouseDown(genderSelectTrigger);

    const bothOption = await screen.findByText(/Both/i);
    fireEvent.click(bothOption);

    fireEvent.click(screen.getByRole('button', { name: /Update Profile/i }));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
      const submittedData = consoleSpy.mock.calls[0][0];
      // Log to debug
      console.log('Submitted data:', submittedData);
    });

    consoleSpy.mockRestore();
  });

  it('renders interests options from query data', () => {
    render(<MyProfileForm />);
    expect(screen.getByText(/Art/i)).toBeInTheDocument();
    expect(screen.getByText(/Music/i)).toBeInTheDocument();
    expect(screen.getByText(/Sports/i)).toBeInTheDocument();
  });
});
