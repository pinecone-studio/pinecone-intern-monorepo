import { render } from '@testing-library/react';
import { HelperText } from '../../../src/app/articles/edit-article/[id]/_components/HelperText';

describe('HelperText', () => {
  it('1 -> should check if helper text is defined or not', () => {
    const { container } = render(<HelperText error={undefined} />);
    expect(container).toBeDefined();
  });
});
