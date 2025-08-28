/* eslint-disable max-lines */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MyProfileForm } from '@/components/MyProfileForm';
import { useGetAllInterestsQuery } from '@/generated';
import userEvent from '@testing-library/user-event';
window.HTMLElement.prototype.hasPointerCapture = () => false;

jest.mock('@/generated', () => ({
  useGetAllInterestsQuery: jest.fn(),
}));

describe('MyProfileForm', () => {
  const mockUseGetAllInterestsQuery = useGetAllInterestsQuery as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseGetAllInterestsQuery.mockReturnValue({
      data: {
        getAllInterests: [
          { _id: 'art', interestName: 'Art' },
          { _id: 'music', interestName: 'Music' },
          { _id: 'sports', interestName: 'Sports' },
          { _id: 'travel', interestName: 'Travel' },
          { _id: 'bowling', interestName: null },
        ],
      },
    });
  });

  it('renders all form fields and buttons', () => {
    render(<MyProfileForm />);
    expect(screen.getByLabelText(/Date of birth/i));
  });

  it('renders interests options from query data', async () => {
    render(<MyProfileForm />);

    const trigger = screen.getByTestId('multi-select-trigger');
    fireEvent.click(trigger);

    expect(await screen.findByText('Art')).toBeInTheDocument();
    expect(await screen.findByText('Music')).toBeInTheDocument();
    expect(await screen.findByText('Sports')).toBeInTheDocument();
    expect(await screen.findByText('Travel')).toBeInTheDocument();
  });
  it('handles undefined field value in MultiSelect', () => {
    mockUseGetAllInterestsQuery.mockReturnValue({
      data: undefined,
    });

    render(<MyProfileForm />);
    const multiSelect = screen.getByTestId('multi-select-trigger');
    expect(multiSelect).toBeInTheDocument();
  });
  it('handles form with no default interests value', () => {
    mockUseGetAllInterestsQuery.mockReturnValue({
      data: { getAllInterests: [{ _id: 'test', interestName: 'Test' }] },
    });
    render(<MyProfileForm />);

    const multiSelect = screen.getByTestId('multi-select-trigger');
    expect(multiSelect).toBeInTheDocument();
  });
  it('handles interest selection via MultiSelect', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {
      //Intentionally empty
    });

    render(<MyProfileForm />);

    const trigger = screen.getByTestId('multi-select-trigger');
    fireEvent.click(trigger);

    const travelOption = await screen.findAllByText('Travel');
    fireEvent.click(travelOption[0]);

    const submitButton = screen.getByRole('button', { name: /update profile/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();

      const submittedData = consoleSpy.mock.calls[0][0];
      expect(submittedData).toBeDefined();
      expect(Array.isArray(submittedData.interests)).toBe(true);
      expect(submittedData.interests).toContain('travel');
    });

    consoleSpy.mockRestore();
  });

  test('allows selecting each gender preference option', async () => {
    render(<MyProfileForm />);

    // Open the dropdown/select trigger first
    const genderSelectTrigger = screen.getByTestId('gender-select-trigger');
    await userEvent.click(genderSelectTrigger);

    // Wait for options to appear
    const maleOption = await screen.findByTestId('option-male');
    await userEvent.click(maleOption);

    // Assert the select now shows 'Male'
    expect(genderSelectTrigger).toHaveTextContent(/male/i);
  });

  it('does not allow selecting more than 10 interests', async () => {
    mockUseGetAllInterestsQuery.mockReturnValue({
      data: {
        getAllInterests: Array.from({ length: 12 }, (_, i) => ({ _id: `id${i}`, interestName: `Interest${i}` })),
      },
    });

    render(<MyProfileForm />);

    const trigger = screen.getByTestId('multi-select-trigger');
    fireEvent.click(trigger);

    for (let i = 0; i < 12; i++) {
      const interestOption = await screen.findByText(`Interest${i}`);
      fireEvent.click(interestOption);
    }

    // The form should only allow 10 selections max
    const submitButton = screen.getByRole('button', { name: /update profile/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const consoleSpy = jest.spyOn(console, 'log');
      expect(consoleSpy).toHaveBeenCalled();
      const submittedData = consoleSpy.mock.calls[0][0];
      expect(submittedData.interests.length).toBeLessThanOrEqual(10);
      consoleSpy.mockRestore();
    });
  });
  it('renders correctly with empty interests data', () => {
    mockUseGetAllInterestsQuery.mockReturnValue({
      data: { getAllInterests: [] },
    });

    render(<MyProfileForm />);

    expect(screen.getByTestId('multi-select-trigger')).toBeInTheDocument();
    expect(screen.queryByText('Art')).not.toBeInTheDocument();
  });
  it('handles query error gracefully', () => {
    mockUseGetAllInterestsQuery.mockReturnValue({
      data: null,
    });

    render(<MyProfileForm />);

    expect(screen.getByTestId('multi-select-trigger')).toBeInTheDocument();
  });

  it('falls back to empty array when data is undefined', () => {
    mockUseGetAllInterestsQuery.mockReturnValue({
      data: undefined,
    });

    render(<MyProfileForm />);

    const trigger = screen.getByTestId('multi-select-trigger');
    expect(trigger).toBeInTheDocument();

    fireEvent.click(trigger);

    expect(screen.queryByRole('option')).not.toBeInTheDocument();
  });
});
