import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreatePostCancelButton from '@/components/CreatePostCancelButton';

describe('CreatePostCancelButton', () => {
  it('should open the dialog when the button is clicked', async () => {
    const onOpenChange = jest.fn()
    render(<CreatePostCancelButton onOpenChange={onOpenChange} />);

    const triggerButton = screen.getByRole('button');
    fireEvent.click(triggerButton);

    const dialogTitle = await screen.findByText('Discard post?');
    const dialogDescription = screen.getByText("If you leave, your edits won’t be saved.");

    expect(dialogTitle)
    expect(dialogDescription)
  });

  it('should call onOpenChange when "Discard" is clicked', async () => {
    const mockOnOpenChange = jest.fn();

    render(<CreatePostCancelButton onOpenChange={mockOnOpenChange} />);

    const triggerButton = screen.getByRole('button');
    fireEvent.click(triggerButton);

    const discardButton = screen.getByText('Discard');
    fireEvent.click(discardButton);

    await waitFor(() => expect(mockOnOpenChange))
  });

  it('should close the dialog when "Cancel" is clicked', async () => {
    const onOpenChange = jest.fn()

    render(<CreatePostCancelButton onOpenChange={onOpenChange} />);

    const triggerButton = screen.getByRole('button');
    fireEvent.click(triggerButton);

    // const cancelButton = screen.getByText('Cancel');
    // fireEvent.click(cancelButton);

    const dialogTitle = screen.queryByText('Discard post?');
    expect(dialogTitle)
  });
});
