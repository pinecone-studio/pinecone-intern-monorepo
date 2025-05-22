import { CreatePostButton } from '@/app/create-post/_components/CreatePostButton';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('CreatePostButton component', () => {
  it('should call onSubmit when the button is clicked', () => {
    const mockSubmitFn = jest.fn();

    render(<CreatePostButton onSubmit={mockSubmitFn} />);
    fireEvent.click(screen.getByText('Зар оруулах хүсэлт илгээх'));

    expect(mockSubmitFn).toHaveBeenCalled();
  });
});
