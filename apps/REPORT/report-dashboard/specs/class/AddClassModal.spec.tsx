import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddClassModal } from '../../src/app/class/_features/AddClassModal';
import '@testing-library/jest-dom';

// Mock the hooks and modules
jest.mock('../../src/generated', () => ({
  ClassType: {
    Coding: 'CODING',
    Design: 'DESIGN',
  },
  useCreateClassMutation: () => [jest.fn()],
  useGetClassesQuery: () => ({ refetch: jest.fn() }),
}));

describe('AddClassModal', () => {
  const mockOnOpenChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the modal content when open', () => {
    render(<AddClassModal open={true} onOpenChange={mockOnOpenChange} />);
    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
    expect(screen.getByTestId('modal-header')).toHaveTextContent('Анги нэмэх');
  });

  it('does not render the modal content when closed', () => {
    render(<AddClassModal open={false} onOpenChange={mockOnOpenChange} />);
    expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument();
  });

  it('renders all input fields', () => {
    render(<AddClassModal open={true} onOpenChange={mockOnOpenChange} />);
    expect(screen.getByTestId('class-name-input')).toBeInTheDocument();
    expect(screen.getByTestId('teacher1-input')).toBeInTheDocument();
    expect(screen.getByTestId('teacher2-input')).toBeInTheDocument();
    expect(screen.getByTestId('start-date-input')).toBeInTheDocument();
    expect(screen.getByTestId('end-date-input')).toBeInTheDocument();
  });

  it('renders the radio group for class type', () => {
    render(<AddClassModal open={true} onOpenChange={mockOnOpenChange} />);
    expect(screen.getByTestId('class-type-radio-group')).toBeInTheDocument();
    expect(screen.getByTestId('coding-radio-button')).toBeInTheDocument();
    expect(screen.getByTestId('design-radio-button')).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty form', async () => {
    render(<AddClassModal open={true} onOpenChange={mockOnOpenChange} />);

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getAllByText('This field is required')).toHaveLength(5);
    });
  });

  it('submits the form with valid data', async () => {
    render(<AddClassModal open={true} onOpenChange={mockOnOpenChange} />);

    await userEvent.type(screen.getByTestId('class-name-input'), 'Test Class');
    await userEvent.type(screen.getByTestId('teacher1-input'), 'Teacher 1');
    await userEvent.type(screen.getByTestId('teacher2-input'), 'Teacher 2');
    await userEvent.type(screen.getByTestId('start-date-input'), '2023-01-01');
    await userEvent.type(screen.getByTestId('end-date-input'), '2023-12-31');

    fireEvent.click(screen.getByTestId('design-radio-button'));

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(
      () => {
        expect(mockOnOpenChange).toHaveBeenCalledWith(false);
      },
      { timeout: 2500 }
    );
  });

  it('disables submit button while loading', async () => {
    render(<AddClassModal open={true} onOpenChange={mockOnOpenChange} />);

    // Fill out the form fields
    await userEvent.type(screen.getByTestId('class-name-input'), 'Test Class');
    await userEvent.type(screen.getByTestId('teacher1-input'), 'Teacher 1');
    await userEvent.type(screen.getByTestId('teacher2-input'), 'Teacher 2');
    await userEvent.type(screen.getByTestId('start-date-input'), '2023-01-01');
    await userEvent.type(screen.getByTestId('end-date-input'), '2023-12-31');

    // Click the submit button to trigger form submission
    fireEvent.click(screen.getByTestId('submit-button'));

    // Assert that the button is initially disabled
    expect(screen.getByTestId('submit-button')).toBeDisabled;

    // Wait for the loading state to resolve (button should become enabled)
    await waitFor(
      () => {
        expect(screen.getByTestId('submit-button')).not.toBeDisabled();
      },
      { timeout: 10000 }
    );
  });

  it('changes class type when radio button is clicked', async () => {
    render(<AddClassModal open={true} onOpenChange={mockOnOpenChange} />);

    expect(screen.getByTestId('coding-radio-container')).toHaveClass('bg-slate-100');
    expect(screen.getByTestId('design-radio-container')).toHaveClass('bg-white');

    fireEvent.click(screen.getByTestId('design-radio-button'));

    expect(screen.getByTestId('coding-radio-container')).toHaveClass('bg-white');
    expect(screen.getByTestId('design-radio-container')).toHaveClass('bg-slate-100');
  });
});
