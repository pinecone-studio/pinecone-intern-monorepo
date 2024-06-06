import DeleteReplyButton from '@/app/comments/_components/Button/DeleteReplyButton';
import { render } from '@testing-library/react';

describe('DeleteButton component', () => {
  it('renders DeleteButton', () => {
    const { getByTestId } = render(<DeleteReplyButton />);
    const backButton = getByTestId('delete-reply-button-test-id');
    expect(backButton).toBeDefined();
  });
});
