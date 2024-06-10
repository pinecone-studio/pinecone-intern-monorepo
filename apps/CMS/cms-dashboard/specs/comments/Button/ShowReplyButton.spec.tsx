import { render } from '@testing-library/react';
import ShowReplyForm from '@/app/comments/_components/Button/ShowReplyFormButton';

describe('ShowReplyForm component', () => {
  it('renders ShowReplyForm', () => {
    const { getByTestId } = render(<ShowReplyForm />);
    const addButton = getByTestId('show-reply-form-button-test-id');
    expect(addButton).toBeDefined();
  });
});
