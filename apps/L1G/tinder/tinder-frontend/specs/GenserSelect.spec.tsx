import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import { GenderSelect } from '@/components/GenderSelect';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('GenderSelect', () => {
  const push = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push });
  });

  it('renders the heading correctly', () => {
    render(<GenderSelect />);
    expect(screen.getByText('Who are you interested in?')).toBeInTheDocument();
  });

  it('shows select options on mouseDown trigger', async () => {
    render(<GenderSelect />);

    const trigger = screen.getByRole('button');
    fireEvent.mouseDown(trigger);

    await waitFor(() => {
      expect(screen.getByText('Male')).toBeInTheDocument();
      expect(screen.getByText('Female')).toBeInTheDocument();
      expect(screen.getByText('Both')).toBeInTheDocument();
    });
  });

  it('disables Next button initially', () => {
    render(<GenderSelect />);
    const nextButton = screen.getByTestId('Next-Button');
    expect(nextButton).toBeDisabled();
  });

  it('enables Next button after selecting an interest and navigates on click', async () => {
    render(<GenderSelect />);

    const trigger = screen.getByRole('button');
    fireEvent.mouseDown(trigger); // dropdown нээх

    await waitFor(() => {
      fireEvent.click(screen.getByText('Male')); // сонгох
    });

    const nextButton = screen.getByTestId('Next-Button');
    expect(nextButton).not.toBeDisabled();

    fireEvent.click(nextButton);
    expect(push).toHaveBeenCalledWith('/');
  });
});
