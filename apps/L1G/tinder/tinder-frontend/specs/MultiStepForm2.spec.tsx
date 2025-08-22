import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MultiStepForm2 from '@/components/MultiStepForm2';

jest.mock('@/components/HowOldAreYou', () => ({
  __esModule: true,
  default: ({ onSuccess, onBack }) => (
    <div>
      How old are you
      <button data-testid="next" onClick={onSuccess}>
        Next
      </button>
      <button data-testid="back" onClick={onBack}>
        Back
      </button>
    </div>
  ),
}));

jest.mock('@/components/YourDetailsPage', () => ({
  __esModule: true,
  YourDetailsPage: ({ onSuccess, onBack }) => (
    <div>
      Your details
      <button data-testid="next" onClick={onSuccess}>
        Next
      </button>
      <button data-testid="back" onClick={onBack}>
        Back
      </button>
    </div>
  ),
}));

jest.mock('@/components/ProfileImages', () => ({
  ProfileImages: ({ onSuccess }) => (
    <div>
      Upload your image
      <button data-testid="next" onClick={onSuccess}>
        Next
      </button>
    </div>
  ),
}));
jest.mock('@/components/YouAreAllSet', () => ({
  YouAreAllSet: ({ onSuccess }) => (
    <div>
      You&#39;re all set
      <button data-testid="start-swiping" onClick={onSuccess}>
        Start swiping
      </button>
    </div>
  ),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

describe('MultiStepForm2', () => {
  const mockSetStep = jest.fn();
  const mockRouter = { push: jest.fn(), replace: jest.fn(), prefetch: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders ageSelect step and triggers onSuccess and onBack', () => {
    render(<MultiStepForm2 step="ageSelect" setStep={mockSetStep} router={mockRouter} />);
    expect(screen.getByText(/How old are you/i)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('next'));
    expect(mockSetStep).toHaveBeenCalledWith('details');

    fireEvent.click(screen.getByTestId('back'));
    expect(mockSetStep).toHaveBeenCalledWith('genderSelect');
  });

  it('renders details step and triggers onSuccess and onBack', () => {
    render(<MultiStepForm2 step="details" setStep={mockSetStep} router={mockRouter} />);
    expect(screen.getByText(/your details/i)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('next'));
    expect(mockSetStep).toHaveBeenCalledWith('uploadImages');

    fireEvent.click(screen.getByTestId('back'));
    expect(mockSetStep).toHaveBeenCalledWith('ageSelect');
  });

  it('renders uploadImages step and triggers onSuccess', () => {
    render(<MultiStepForm2 step="uploadImages" setStep={mockSetStep} router={mockRouter} />);
    expect(screen.getByText(/upload your image/i)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('next'));
    expect(mockSetStep).toHaveBeenCalledWith('allSet');
  });

  it('renders allSet step and triggers router.push', () => {
    render(<MultiStepForm2 step="allSet" setStep={mockSetStep} router={mockRouter} />);
    expect(screen.getByText(/you're all set/i)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('start-swiping'));
    expect(mockRouter.push).toHaveBeenCalledWith('/home');
  });

  it('handles invalid step gracefully', () => {
    render(<MultiStepForm2 step="invalidStep" setStep={mockSetStep} router={mockRouter} />);
    expect(screen.queryByText(/How old are you/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/your details/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/upload your image/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/you're all set/i)).not.toBeInTheDocument();
  });
});
