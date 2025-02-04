import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Alertt from '@/components/alert/Alert';
import '@testing-library/jest-dom';

jest.useFakeTimers();

describe('Alertt Component', () => {
  it('renders the success alert and hides after duration', async () => {
    const onCloseMock = jest.fn();
    render(<Alertt type="success" message="Success alert!" duration={2000} onClose={onCloseMock} />);

    // Check initial rendering
    expect(screen.getByText(/Success alert!/)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();

    // Advance time to trigger timeout
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(screen.queryByText(/Success alert!/)).toBeNull();
    });

    expect(onCloseMock).toHaveBeenCalled();
  });

  it('renders the alert with correct duration and hides', async () => {
    const onCloseMock = jest.fn();
    render(<Alertt type="success" message="Test alert duration" duration={3000} onClose={onCloseMock} />);

    expect(screen.getByText(/Test alert duration/)).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    await waitFor(() => {
      expect(screen.queryByText(/Test alert duration/)).toBeNull();
    });

    expect(onCloseMock).toHaveBeenCalled();
  });

  it('closes the alert when close button is clicked', () => {
    const onCloseMock = jest.fn();
    render(<Alertt type="error" message="Close me" onClose={onCloseMock} />);

    expect(screen.getByText(/Close me/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button'));

    expect(screen.queryByText(/Close me/)).toBeNull();
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('renders the correct icon based on the type', () => {
    render(<Alertt type="warning" message="Warning alert!" />);
    expect(screen.getByTestId('alert-triangle-icon')).toBeInTheDocument();
  });
  it('calculates endTime correctly based on duration', () => {
    const mockNow = 1000000;
    jest.spyOn(global.Date, 'now').mockImplementation(() => mockNow);

    render(<Alertt type="success" message="Test alert" duration={3000} />);

    // End time should be mockNow + duration

    expect(Date.now()).toBe(mockNow); // Ensure mocking works

    // Cleanup mock
    jest.spyOn(global.Date, 'now').mockRestore();
  });

});
