import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProfileInterest } from '@/app/edit-profile/profile/_components/ProfileInterest';
import '@testing-library/jest-dom';

const mockSetEditUserdata = jest.fn();

const mockUserdata = {
  name: 'John Doe',
  email: 'john@example.com',
  gender: 'male',
  dob: '01 Jan 2000',
  bio: 'Sample bio',
  interestOptions: ['Art', 'Music'],
  profession: 'Engineer',
  schoolOrWork: 'Google',
};

describe('ProfileInterest', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders interest labels and selection text', () => {
    render(<ProfileInterest editUserdata={mockUserdata} setEditUserdata={mockSetEditUserdata} />);
    expect(screen.getByText('Interest')).toBeInTheDocument();
    expect(screen.getByText(/You can select up to a maximum of 10 interests/i)).toBeInTheDocument();
  });

  it('renders selected interests as active buttons', () => {
    render(<ProfileInterest editUserdata={mockUserdata} setEditUserdata={mockSetEditUserdata} />);
    const artButton = screen.getByText('Art');
    const musicButton = screen.getByText('Music');
    expect(artButton).toHaveClass('bg-gray-900');
    expect(musicButton).toHaveClass('bg-gray-900');
  });

  it('adds a new interest when clicked', () => {
    render(<ProfileInterest editUserdata={mockUserdata} setEditUserdata={mockSetEditUserdata} />);
    const techButton = screen.getByText('Technology');
    fireEvent.click(techButton);

    expect(mockSetEditUserdata).toHaveBeenCalledTimes(1);
    const updateFn = mockSetEditUserdata.mock.calls[0][0];
    const result = updateFn(mockUserdata);

    expect(result.interestOptions).toEqual(expect.arrayContaining(['Art', 'Music', 'Technology']));
  });

  it('removes a selected interest when clicked again', () => {
    render(<ProfileInterest editUserdata={mockUserdata} setEditUserdata={mockSetEditUserdata} />);
    const musicButton = screen.getByText('Music');
    fireEvent.click(musicButton);

    expect(mockSetEditUserdata).toHaveBeenCalledTimes(1);
    const updateFn = mockSetEditUserdata.mock.calls[0][0];
    const result = updateFn(mockUserdata);

    expect(result.interestOptions).not.toContain('Music');
  });

  it('disables unselected interests when 10 are selected', () => {
    const filledUserData = {
      ...mockUserdata,
      interestOptions: ['Art', 'Music', 'Technology', 'Design', 'Education', 'Health', 'Fashion', 'Travel', 'Food', 'Sports'],
    };
    render(<ProfileInterest editUserdata={filledUserData} setEditUserdata={mockSetEditUserdata} />);
    const extraButton = screen.getByText('Gaming');
    expect(extraButton).toBeDisabled();
  });

  it('does not update interests when clicking a disabled button', () => {
    const filledUserData = {
      ...mockUserdata,
      interestOptions: ['Art', 'Music', 'Technology', 'Design', 'Education', 'Health', 'Fashion', 'Travel', 'Food', 'Sports'],
    };
    render(<ProfileInterest editUserdata={filledUserData} setEditUserdata={mockSetEditUserdata} />);
    const disabledButton = screen.getByText('Gaming');
    fireEvent.click(disabledButton);

    // It should not call mockSetEditUserdata at all
    expect(mockSetEditUserdata).not.toHaveBeenCalled();
  });
});
