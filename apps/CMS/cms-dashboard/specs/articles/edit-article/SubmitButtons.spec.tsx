import { render } from '@testing-library/react';
import { SubmitButtons } from '../../../src/app/articles/edit-article/[id]/_components/SubmitButtons';

describe('submit buttons component', () => {
  it('1-> should check if submit buttons component renders or not', () => {
    const { container } = render(<SubmitButtons />);
    expect(container).toBeDefined();
  });

  it('2-> should check if button of draft exists or not as well as verify it contains the right text', () => {
    const { getByTestId, getByText } = render(<SubmitButtons />);
    const draftButton = getByTestId('draft-button-id');
    expect(draftButton).toBeDefined();
    expect(getByText('Ноорогт хадгалах')).toBeDefined();
  });

  it('3-> should check if publish button exists or not as well as verify it contains the right text', () => {
    const { getByTestId, getByText } = render(<SubmitButtons />);
    const publishButton = getByTestId('publish-button-id');
    expect(publishButton).toBeDefined();
    expect(getByText('Нийтлэх')).toBeDefined();
  });
});
