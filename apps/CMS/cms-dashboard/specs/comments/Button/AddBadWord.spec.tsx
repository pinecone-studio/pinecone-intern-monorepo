import { render } from '@testing-library/react';
import AddBadWord from '@/app/comments/_components/Button/AddBadWord';

describe('CreateCommentButton component', () => {
  it('renders CreateCommentButton', () => {
    const { getByTestId } = render(<AddBadWord />);
    const addButton = getByTestId('add-bad-word-button-test-id');
    expect(addButton).toBeDefined();
  });
});
