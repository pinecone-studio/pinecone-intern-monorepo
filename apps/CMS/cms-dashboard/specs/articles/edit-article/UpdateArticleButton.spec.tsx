import { UpdateArticleButton } from '@/app/articles/edit-article/[id]/_components';
import { render } from '@testing-library/react';

describe('publish button component', () => {
  it('1-> should check if publish button component renders or not', () => {
    const { container } = render(<UpdateArticleButton isValid={true} dirty={true} handleClick={jest.fn()} />);
    expect(container).toBeDefined();
  });
  it('2-> should disabled when formik is not valid', () => {
    const { container } = render(<UpdateArticleButton isValid={false} dirty={false} handleClick={jest.fn()} />);
    expect(container).toBeDefined();
  });
});
