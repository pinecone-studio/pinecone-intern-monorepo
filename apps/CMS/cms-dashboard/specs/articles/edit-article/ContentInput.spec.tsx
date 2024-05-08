import { render } from '@testing-library/react';
import { ContentInput } from '../../../src/app/articles/edit-article/[id]/_components/ContentInput';

const normalProps = {
  name: 'mocked name',
  placeholder: 'testPlace holder',
  onChange: jest.fn(),
  onBlur: jest.fn(),
  value: '',
  helperText: 'Helper text',
  error: 'article content cannot be empty',
};
describe('Title Input component', () => {
  it('Component must be defined', () => {
    const { container } = render(<ContentInput {...normalProps} />);
    expect(container).toBeDefined();
  });

  it('does not display error message when error prop is not provided', () => {
    const propsWithoutError = {
      name: 'mocked name',
      placeholder: 'test placeholder',
      onChange: jest.fn(),
      onBlur: jest.fn(),
      value: '',
      helperText: 'Helper text',
      error: '',
    };
    const { queryByText } = render(<ContentInput {...propsWithoutError} />);
    expect(queryByText('Error message')).toBeNull();
  });
});
