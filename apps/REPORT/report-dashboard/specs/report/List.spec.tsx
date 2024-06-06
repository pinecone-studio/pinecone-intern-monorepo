import { render } from '@testing-library/react';
import { List } from '../../src/app/_report/_components/List';
const testData = [
  {
    name: 'Анастасия',
    category: [
      { name: 'HTML entry.', grade: 80, desc: 'good' },
      { name: 'HTML entry.', grade: 80, desc: 'good' },
      { name: 'HTML entry.', grade: 80, desc: 'good' },
    ],
  },
  {
    name: 'Анастасия',
    category: [
      { name: 'HTML entry.', grade: 80, desc: 'good' },
      { name: 'CSS entry.', grade: 30, desc: 'good' },
      { name: 'JS entry.', grade: 80, desc: 'good' },
      { name: 'SQL entry.', grade: 80, desc: 'good' },
    ],
  },
];
describe('List', () => {
  it('Should render list component', () => {
    const { container } = render(List(testData));
    expect(container).toBeDefined();
  });
});
