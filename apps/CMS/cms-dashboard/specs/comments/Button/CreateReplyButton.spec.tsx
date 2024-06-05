import { render } from '@testing-library/react';
import CreateReplyButton from '@/app/comments/_components/Button/CreateReplyButton';

describe('CreateReplyButton component', () => {
  it('renders CreateReplyButton', () => {
    const { getByTestId } = render(<CreateReplyButton />);
    const addButton = getByTestId('create-reply-button-test-id');
    expect(addButton).toBeDefined();
  });
});
