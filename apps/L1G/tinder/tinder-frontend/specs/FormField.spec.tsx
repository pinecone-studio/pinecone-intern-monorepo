import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileForm from '@/components/FormFIeld';
import { useGetAllInterestsQuery } from '@/generated';

jest.mock('@/generated');

const mockOnSuccess = jest.fn();
const mockOnBack = jest.fn();

const mocks = [
  { interestName: 'Sports', _id: '6891c2c840f976bed134b611' },
  { interestName: 'Reading', _id: '6891c2d340f976bed134b613' },
];

const useGetAllInterestsQueryMock = useGetAllInterestsQuery as jest.Mock;

describe('ProfileForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    useGetAllInterestsQueryMock.mockReturnValue({ data: null, loading: true, error: null });
    render(<ProfileForm onSuccess={mockOnSuccess} onBack={mockOnBack} />);
    expect(screen.getByText(/Loading interests.../i)).toBeInTheDocument();
  });

  it('renders error state', () => {
    useGetAllInterestsQueryMock.mockReturnValue({ data: null, loading: false, error: { message: 'Failed to fetch' } });
    render(<ProfileForm onSuccess={mockOnSuccess} onBack={mockOnBack} />);
    expect(screen.getByText(/Error: Failed to fetch/i)).toBeInTheDocument();
  });

  it('renders form fields with data', () => {
    useGetAllInterestsQueryMock.mockReturnValue({ data: { getAllInterests: mocks }, loading: false, error: null });
    render(<ProfileForm onSuccess={mockOnSuccess} onBack={mockOnBack} />);

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Bio')).toBeInTheDocument();
    expect(screen.getByLabelText('Interest')).toBeInTheDocument();
    expect(screen.getByLabelText('Profession')).toBeInTheDocument();
    expect(screen.getByLabelText('School/Work')).toBeInTheDocument();
  });

  it('submits form successfully', async () => {
    useGetAllInterestsQueryMock.mockReturnValue({ data: { getAllInterests: mocks }, loading: false, error: null });
    render(<ProfileForm onSuccess={mockOnSuccess} onBack={mockOnBack} />);

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('renders MultiSelect options from data', async () => {
    useGetAllInterestsQueryMock.mockReturnValue({ data: { getAllInterests: mocks }, loading: false, error: null });
    render(<ProfileForm onSuccess={mockOnSuccess} onBack={mockOnBack} />);

    const trigger = screen.getByLabelText('Interest');
    fireEvent.click(trigger);

    expect(await screen.findByText('Sports')).toBeInTheDocument();
    expect(await screen.findByText('Reading')).toBeInTheDocument();
  });

  it('handles empty interests array', () => {
    useGetAllInterestsQueryMock.mockReturnValue({ 
      data: { getAllInterests: [] }, 
      loading: false, 
      error: null 
    });
    render(<ProfileForm onSuccess={mockOnSuccess} onBack={mockOnBack} />);

    const trigger = screen.getByLabelText('Interest');
    fireEvent.click(trigger);

    expect(screen.queryByText('Sports')).not.toBeInTheDocument();
    expect(screen.queryByText('Reading')).not.toBeInTheDocument();
  });

  it('handles undefined data case', () => {
    useGetAllInterestsQueryMock.mockReturnValue({ 
      data: undefined, 
      loading: false, 
      error: null 
    });
    render(<ProfileForm onSuccess={mockOnSuccess} onBack={mockOnBack} />);

    const trigger = screen.getByLabelText('Interest');
    fireEvent.click(trigger);

    expect(screen.queryByText('Sports')).not.toBeInTheDocument();
    expect(screen.queryByText('Reading')).not.toBeInTheDocument();
  });

  it('calls onBack when Back button is clicked', () => {
    useGetAllInterestsQueryMock.mockReturnValue({ data: { getAllInterests: mocks }, loading: false, error: null });
    render(<ProfileForm onSuccess={mockOnSuccess} onBack={mockOnBack} />);
    
    fireEvent.click(screen.getByText('Back'));
    expect(mockOnBack).toHaveBeenCalled();
  });

  it('correctly maps interest data to options', () => {
  useGetAllInterestsQueryMock.mockReturnValue({
    data: { getAllInterests: mocks },
    loading: false,
    error: null
  });

  render(<ProfileForm onSuccess={mockOnSuccess} onBack={mockOnBack} />);

  const trigger = screen.getByLabelText('Interest');
  fireEvent.click(trigger);
  
  expect(screen.getByText('Sports')).toBeInTheDocument();
  expect(screen.getByText('Reading')).toBeInTheDocument();
  
  const interestOptions = screen.getAllByText(/Sports|Reading/);
  expect(interestOptions).toHaveLength(2);
});
});