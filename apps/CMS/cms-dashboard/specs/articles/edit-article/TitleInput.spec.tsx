import { render } from '@testing-library/react';
import { TitleInput } from '../../../src/app/articles/edit-article/[id]/_components/TitleInput';

const normalProps = {
  name: 'mocked  name',
  onChange: jest.fn(),
  onBlur: jest.fn(),
  value: 'test',
  HelperText: 'Helper texr',
  error: 'article title cannot be empty',
  placeholder: 'test place holder',
};
describe('Title Input component', () => {
  it('Component must be defined', () => {
    const { container } = render(<TitleInput {...normalProps} />);
    expect(container).toBeDefined();
  });

  it('should not display error message when error prop is not provided', () => {
    const propsWithoutError = {
      name: 'mocked name',
      placeholder: 'test placeholder',
      onChange: jest.fn(),
      onBlur: jest.fn(),
      value: '',
      helperText: 'Helper text',
      error: '',
    };
    const { queryByText } = render(<TitleInput {...propsWithoutError} />);
    expect(queryByText('Error message')).toBeNull();
  });
});
