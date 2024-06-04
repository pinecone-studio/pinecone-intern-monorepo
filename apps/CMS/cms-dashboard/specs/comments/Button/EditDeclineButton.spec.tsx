import { render } from '@testing-library/react';
import EditDeclineButton from '@/app/comments/_components/Button/EditDeclineButton';

describe('EditDeclineButton component', () => {
  it('renders EditDeclineButton', () => {
    const { getByTestId } = render(<EditDeclineButton />);
    const editButton = getByTestId('edit-decline-button-test-id');
    expect(editButton).toBeDefined();
  });
});
