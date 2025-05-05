  import { render, screen, fireEvent, waitFor } from '@testing-library/react';
  import '@testing-library/jest-dom'; 
  import { useCompleteSignupMutation } from "@/generated";
  import { useRouter } from "next/navigation";
  import { StepThree } from '@/app/signup/_components/StepThree';

  jest.mock("@/generated", () => ({
    useCompleteSignupMutation: jest.fn(),
  }));

  jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
  }));

  const mockCompleteSignup = jest.fn();
  const mockRouterPush = jest.fn();

  describe('StepThree Component', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      (useCompleteSignupMutation as jest.Mock).mockReturnValue([
        mockCompleteSignup,
        { loading: false },
      ]);
      (useRouter as jest.Mock).mockReturnValue({
        push: mockRouterPush,
      });
      Storage.prototype.getItem = jest.fn();
      Storage.prototype.removeItem = jest.fn(); 
    });

    it('renders the form with password and confirm password fields', () => {
      render(<StepThree />);
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
      expect(screen.getByLabelText('Confirm password')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
    });

    it('shows error when passwords do not match', async () => {
      render(<StepThree />);
      fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
      fireEvent.change(screen.getByLabelText('Confirm password'), { target: { value: 'different' } });
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));
      await waitFor(() => {
        expect(screen.getByText('passwords do not match')).toBeInTheDocument();
      });
      expect(mockCompleteSignup).not.toHaveBeenCalled();
    });

    it('shows error when email is not found in localStorage', async () => {
      (Storage.prototype.getItem as jest.Mock).mockReturnValue(null);
      render(<StepThree />);
      fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
      fireEvent.change(screen.getByLabelText('Confirm password'), { target: { value: 'password123' } });
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));
      await waitFor(() => {
        expect(screen.getByText('email not found')).toBeInTheDocument();
      });
      expect(mockCompleteSignup).not.toHaveBeenCalled();
    });

    it('calls completeSignup mutation when form is submitted with valid data', async () => {
      const mockEmail = 'test@example.com';
      (Storage.prototype.getItem as jest.Mock).mockReturnValue(mockEmail);    
      mockCompleteSignup.mockResolvedValue({
        data: {
          completeSignup: {
            token: 'mocked-jwt-token',
          },
        },
      });
      render(<StepThree />);
      fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
      fireEvent.change(screen.getByLabelText('Confirm password'), { target: { value: 'password123' } });
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));
      await waitFor(() => {
        expect(mockCompleteSignup).toHaveBeenCalledWith({
          variables: { email: mockEmail, password: 'password123' },
        });
      });
      expect(Storage.prototype.getItem).toHaveBeenCalledWith('email');
      expect(Storage.prototype.removeItem).toHaveBeenCalledWith('email');
      expect(mockRouterPush).toHaveBeenCalledWith('/');
    });
    
    it('shows error when completeSignup mutation fails', async () => {
      const mockEmail = 'test@example.com';
      (Storage.prototype.getItem as jest.Mock).mockReturnValue(mockEmail);
      mockCompleteSignup.mockRejectedValue(new Error('Failed'));  
      render(<StepThree />);
      fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
      fireEvent.change(screen.getByLabelText('Confirm password'), { target: { value: 'password123' } });
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));      
      await waitFor(() => {
        expect(screen.getByText('failed to set password')).toBeInTheDocument();
      });
    });

    it('disables button and shows loading text when loading', () => {
      (useCompleteSignupMutation as jest.Mock).mockReturnValue([
        mockCompleteSignup,
        { loading: true },
      ]);
      render(<StepThree />);      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveTextContent('Logging in...');
    });

    it('shows error when token is missing in response', async () => {
      const mockEmail = 'test@example.com';
      (Storage.prototype.getItem as jest.Mock).mockReturnValue(mockEmail);
      mockCompleteSignup.mockResolvedValueOnce({
        data: {
          completeSignup: {
            token: null, 
          },
        },
      });
      render(<StepThree />);
      fireEvent.change(screen.getByLabelText('Password'), {
        target: { value: 'password123' },
      });
      fireEvent.change(screen.getByLabelText('Confirm password'), {
        target: { value: 'password123' },
      });
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));
      await waitFor(() => {
        expect(screen.getByText('failed to set password')).toBeInTheDocument();
      });
    });
  });