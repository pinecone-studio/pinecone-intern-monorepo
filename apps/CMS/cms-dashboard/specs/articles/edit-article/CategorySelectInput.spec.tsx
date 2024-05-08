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
const mockedLaoding = true;
describe('Title Input component', () => {
  it('Component must be defined', () => {
    const { getByTestId } = render(<CategorySelectInput categories={mockedCategories} loading={mockedLaoding} />);
    const select = getByTestId('category-select-input-select-button');
    fireEvent.mouseDown(select);
    expect(getByTestId('categories-option-1')).toBeDefined();
  });
});
