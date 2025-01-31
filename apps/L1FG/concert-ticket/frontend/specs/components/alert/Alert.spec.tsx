import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Alertt from '@/components/alert/Alert';
import '@testing-library/jest-dom';

jest.useFakeTimers(); // This allows us to control and mock setTimeout or setInterval

describe('Alertt Component', () => {
   it('renders the success alert and hides after duration', async () => {
     const onCloseMock = jest.fn();

     // Render the component
     render(<Alertt type="success" message="Success alert!" duration={2000} onClose={onCloseMock} />);

     // Check if the success icon is displayed
     expect(screen.getByText(/Success alert!/)).toBeInTheDocument();
     expect(screen.getByRole('button')).toBeInTheDocument(); // The close button is present

     // Fast-forward the timer within act
     act(() => {
       jest.advanceTimersByTime(2000);
     });

     // Wait for the alert to be removed after the duration
     await waitFor(() => {
       expect(screen.queryByText(/Success alert!/)).toBeNull();
     });

     // Check if onClose was called
     expect(onCloseMock).toHaveBeenCalled();
   });
  it('renders the success alert and hides after duration', async () => {
    const onCloseMock = jest.fn();

    // Render the component
    render(<Alertt type="success" message="Success alert!" duration={2000} onClose={onCloseMock} />);

    // Check if the success icon is displayed
    expect(screen.getByText(/Success alert!/)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument(); // The close button is present

    // Fast-forward the timer within act
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    // Wait for the alert to be removed after the duration
    await waitFor(() => {
      expect(screen.queryByText(/Success alert!/)).toBeNull();
    });

    // Check if onClose was called
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('renders the error alert and hides after duration', async () => {
    const onCloseMock = jest.fn();

    // Render the component
    render(<Alertt type="error" message="Error alert!" duration={3000} onClose={onCloseMock} />);

    // Check if the error icon is displayed
    expect(screen.getByText(/Error alert!/)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument(); // The close button is present

    // Fast-forward the timer within act
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    // Wait for the alert to be removed after the duration
    await waitFor(() => {
      expect(screen.queryByText(/Error alert!/)).toBeNull();
    });

    // Check if onClose was called
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('renders the warning alert and hides after duration', async () => {
    const onCloseMock = jest.fn();

    // Render the component
    render(<Alertt type="warning" message="Warning alert!" duration={2500} onClose={onCloseMock} />);

    // Check if the warning icon is displayed
    expect(screen.getByText(/Warning alert!/)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument(); // The close button is present

    // Fast-forward the timer within act
    act(() => {
      jest.advanceTimersByTime(2500);
    });

    // Wait for the alert to be removed after the duration
    await waitFor(() => {
      expect(screen.queryByText(/Warning alert!/)).toBeNull();
    });

    // Check if onClose was called
    expect(onCloseMock).toHaveBeenCalled();
  });

   it('closes the alert when the close button is clicked', async () => {
     const onCloseMock = jest.fn();

     // Render the Alertt component with a close button
     render(<Alertt type="success" message="This is a close test!" onClose={onCloseMock} />);

     // Ensure the alert is visible
     expect(screen.getByText(/This is a close test!/)).toBeInTheDocument();

     // Simulate a click on the close button
     fireEvent.click(screen.getByRole('button'));

     // Wait for the alert to be removed from the DOM
     await waitFor(() => {
       expect(screen.queryByText(/This is a close test!/)).toBeNull();
     });

     // Check if onClose was called
     expect(onCloseMock).toHaveBeenCalled();
   });

  it('displays the correct icon for each alert type', () => {
    render(<Alertt type="success" message="Success" />);
    expect(screen.getByText(/Success/)).toBeInTheDocument();
    expect(screen.getByTestId('check-circle-icon')).toBeInTheDocument(); // Check for success icon

    render(<Alertt type="error" message="Error" />);
    expect(screen.getByText(/Error/)).toBeInTheDocument();
    expect(screen.getByTestId('x-circle-icon')).toBeInTheDocument(); // Check for error icon

    render(<Alertt type="warning" message="Warning" />);
    expect(screen.getByText(/Warning/)).toBeInTheDocument();
    expect(screen.getByTestId('alert-triangle-icon')).toBeInTheDocument(); // Check for warning icon
  });
});
