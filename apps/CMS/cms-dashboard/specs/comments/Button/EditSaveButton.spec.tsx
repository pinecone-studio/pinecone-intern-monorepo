import { render } from '@testing-library/react';
import EditSaveButton from '@/app/comments/_components/Button/EditSaveButton';

describe('EditSaveButton component', () => {
  it('renders EditSaveButton', () => {
    const { getByTestId } = render(<EditSaveButton />);
    const editButton = getByTestId('edit-save-button-test-id');
    expect(editButton).toBeDefined();
  });
});
