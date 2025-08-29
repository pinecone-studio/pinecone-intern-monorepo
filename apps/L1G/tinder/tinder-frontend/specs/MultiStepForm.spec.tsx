import { MultiStepForm1 } from '@/components/MultiStepForm1';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('@/components/CreateAcc', () => ({
  CreateAccount: ({ onSuccess }) => (
    <div>
      Create an account
      <button onClick={onSuccess}>Next</button>
    </div>
  ),
}));
jest.mock('@/components/ConfirmEmail', () => ({
  ConfirmEmail: ({ onSuccess }) => (
    <div>
      Confirm email
      <button onClick={onSuccess}>Next</button>
    </div>
  ),
}));
jest.mock('@/components/CreatePassword', () => ({
  CreatePassword: ({ onSuccess }) => (
    <div>
      Create password
      <button onClick={onSuccess}>Next</button>
    </div>
  ),
}));
jest.mock('@/components/GenderOfUser', () => ({
  GenderOfUser: ({ onSuccess }) => (
    <div>
      What’s your gender?
      <button onClick={onSuccess}>Next</button>
    </div>
  ),
}));
jest.mock('@/components/GenderSelect', () => ({
  GenderSelect: ({ onSuccess }) => (
    <div>
      Who are you interested in?
      <button onClick={onSuccess}>Next</button>
    </div>
  ),
}));

describe('MultiStepForm1', () => {
  const mockSetStep = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders createAccount step and triggers onSuccess', () => {
    render(<MultiStepForm1 step="createAccount" setStep={mockSetStep} />);
    expect(screen.getByText(/Create an account/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText('Next'));

    expect(mockSetStep).toHaveBeenCalledWith('genderOfUser');
  });
  it('renders genderSelect step and triggers onSuccess', () => {
    render(<MultiStepForm1 step="genderOfUser" setStep={mockSetStep} />);
    expect(screen.getByText('What’s your gender?')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Next'));
    expect(mockSetStep).toHaveBeenCalledWith('genderSelect');
  });
    it('renders genderSelect step and triggers onSuccess', () => {
    render(<MultiStepForm1 step="genderSelect" setStep={mockSetStep} />);
    expect(screen.getByText('Who are you interested in?')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Next'));
    expect(mockSetStep).toHaveBeenCalledWith('ageSelect');
  });

  it('handles invalid step gracefully', () => {
    render(<MultiStepForm1 step="invalidStep" setStep={mockSetStep} />);
    expect(screen.queryByText(/Create an account/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/confirm email/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/create password/i)).not.toBeInTheDocument();
    expect(screen.queryByText('What’s your gender?')).not.toBeInTheDocument();
    expect(screen.queryByText('Who are you interested in?')).not.toBeInTheDocument();
  });
});
