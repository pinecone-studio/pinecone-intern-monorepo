import { render } from '@testing-library/react';
import { SubmitButton } from '../../../src/app/articles/edit-article/[id]/_components/SubmitButton';

describe('submit buttons component', () => {
  it('1-> should check if submit buttons component renders or not', () => {
    const { container } = render(<SubmitButton text="test" onClick={jest.fn()} bgColor="black" />);
    expect(container).toBeDefined();
  });
});
