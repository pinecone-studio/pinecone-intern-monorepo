import { render } from '@testing-library/react';
import { SubmitButton } from '../../../src/app/articles/edit-article/[id]/_components/SubmitButton';

describe('submit buttons component', () => {
  it('1-> should check if submit buttons component renders or not', () => {
    const { container } = render(<SubmitButton text="test" />);
    expect(container).toBeDefined();
  });

  it('2-> should check if button of draft exists or not as well as verify it contains the right text', () => {
    const { getByTestId, getByText } = render(<SubmitButton text="Ноорогт хадгалах" />);
    const submitButton = getByTestId('submit-button-id');
    expect(submitButton).toBeDefined();
    expect(getByText('Ноорогт хадгалах')).toBeDefined();
  });

  it('3-> should check if publish button exists or not as well as verify it contains the right text', () => {
    const { getByTestId, getByText } = render(<SubmitButton text="Нийтлэх" />);
    const submitButton = getByTestId('submit-button-id');
    expect(submitButton).toBeDefined();
    expect(getByText('Нийтлэх')).toBeDefined();
  });
});
