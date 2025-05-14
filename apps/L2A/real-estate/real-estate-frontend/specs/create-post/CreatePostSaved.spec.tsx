import { CreatePostSaved } from '@/app/create-post/_components/CreatePostSaved';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';


describe('CreatePostSaved Component', () => {
  it('renders correctly', () => {
    const mockSaveDraft = jest.fn();

    render(<CreatePostSaved onSaveDraft={mockSaveDraft} />);

    const button = screen.getByRole('button', { name: /Хадгалаад гарах/i });
    expect(button).toBeInTheDocument();
  });

  it('calls onSaveDraft when the button is clicked', () => {
    const mockSaveDraft = jest.fn();

    render(<CreatePostSaved onSaveDraft={mockSaveDraft} />);

    const button = screen.getByRole('button', { name: /Хадгалаад гарах/i });

    fireEvent.click(button);
    expect(mockSaveDraft).toHaveBeenCalledTimes(1);
  });
});
