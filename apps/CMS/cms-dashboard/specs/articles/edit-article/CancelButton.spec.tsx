import { CancelButton } from '@/app/articles/edit-article/[id]/_components/CancelButton';
import { render } from '@testing-library/react';

describe('cancel button component', () => {
  it('1-> should check if cancel button component renders or not', () => {
    const { container } = render(<CancelButton />);
    expect(container).toBeDefined();
  });
});
