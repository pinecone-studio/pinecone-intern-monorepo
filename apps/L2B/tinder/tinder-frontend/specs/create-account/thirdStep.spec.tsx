import ThirdStep from '@/app/auth/create-account/_components/ThirdStep';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

describe('ThirdStep Component', () => {
  const mockSetStep = jest.fn();

  beforeEach(() => {
    mockSetStep.mockClear();
  });

  test('renders all form fields correctly', () => {
    render(<ThirdStep setStep={mockSetStep} step={2} />);

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Bio/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Interest/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Profession/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/School\/Work/i)).toBeInTheDocument();
  });

  test('calls setStep on valid form submission', async () => {
    render(<ThirdStep setStep={mockSetStep} step={2} />);

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Bio/i), { target: { value: 'A developer' } });
    fireEvent.change(screen.getByLabelText(/Interest/i), { target: { value: 'Coding' } });
    fireEvent.change(screen.getByLabelText(/Profession/i), { target: { value: 'Engineer' } });
    fireEvent.change(screen.getByLabelText(/School\/Work/i), { target: { value: 'Remote Work' } });

    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    await waitFor(() => {
      expect(mockSetStep).toHaveBeenCalledWith(3);
    });
  });

  test('shows validation errors on empty submission', async () => {
    render(<ThirdStep setStep={mockSetStep} step={2} />);
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

  });

  test('calls setStep with previous step on back button', () => {
    render(<ThirdStep setStep={mockSetStep} step={2} />);
    fireEvent.click(screen.getByRole('button', { name: /Back/i }));
    expect(mockSetStep).toHaveBeenCalledWith(1);
  });
});