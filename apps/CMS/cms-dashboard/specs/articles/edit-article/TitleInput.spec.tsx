import { render } from '@testing-library/react';
import { TitleInput } from '../../../src/app/articles/edit-article/[id]/_components/TitleInput';

describe('Title Input component', () => {
  it('Component must be defined', () => {
    const { container } = render(<TitleInput />);
    expect(container).toBeDefined();
  });
});
