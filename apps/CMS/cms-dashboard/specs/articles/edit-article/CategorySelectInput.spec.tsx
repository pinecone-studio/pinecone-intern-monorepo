import { fireEvent, render } from '@testing-library/react';
import { CategorySelectInput } from '../../../src/app/articles/edit-article/[id]/_components/CategorySelectInput';
import { Category } from '@/generated';

const mockedCategories: [Category] = [
  {
    id: '1',
    name: 'test',
    createdAt: '2022-01-22',
  },
];

describe('Category Input component', () => {
  it('Component must be defined', () => {
    const { getByTestId } = render(
      <CategorySelectInput categories={mockedCategories} onChange={jest.fn()} onBlur={jest.fn()} name="test" value="test" helperText="test" formikError={false} defaultValue="test" loading={false} />
    );
    const select = getByTestId('category-select-input-select-button');
    fireEvent.mouseDown(select);
    expect(getByTestId('categories-option-0')).toBeDefined();
  });
  it('Component must be defined', () => {
    render(
      <CategorySelectInput categories={mockedCategories} onChange={jest.fn()} onBlur={jest.fn()} name="test" value="test" helperText="test" formikError={false} defaultValue="test" loading={true} />
    );
  });
  it('Component must be defined', () => {
    render(
      <CategorySelectInput
        categories={mockedCategories}
        onChange={jest.fn()}
        onBlur={jest.fn()}
        name="test"
        value={undefined}
        helperText="test"
        formikError={false}
        defaultValue="test"
        loading={false}
      />
    );
  });
});
