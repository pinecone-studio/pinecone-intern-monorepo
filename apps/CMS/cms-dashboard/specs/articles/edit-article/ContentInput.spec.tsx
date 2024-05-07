import { render } from '@testing-library/react';
import { ContentInput } from '../../../src/app/articles/edit-article/[id]/_components/ContentInput';

describe('Title Input component', () => {
  it('Component must be defined', () => {
    const { container } = render(<ContentInput />);
    expect(container).toBeDefined();
  });
});
