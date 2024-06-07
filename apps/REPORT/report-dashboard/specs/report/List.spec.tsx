import { render } from '@testing-library/react';
import { List } from '../../src/app/_report/_components/List';
const testData = [
  {
    name: 'T. Буяндэлгэр',
    category: [
      { name: 'HTML entry.', grade: 80, desc: 'good' },
      { name: 'CSS entry.', grade: 30, desc: 'good' },
      { name: 'JS entry.', grade: 80, desc: 'good' },
      { name: 'TS entry.', grade: 80, desc: 'good' },
      { name: 'React entry.', grade: 80, desc: 'good' },
    ],
    days: [
      { name: '2024-05-12', status: 'P' },
      { name: '2024-05-14', status: 'S' },
      { name: '2024-05-17', status: 'A' },
      { name: '2024-05-17', status: 'A' },
      { name: '2024-05-17', status: 'A' },
      // P = present, S = sick, A = absent, E = excused, L = late
    ],
    sent: false,
  },
  {
    name: 'T. Буяндэлгэр',
    category: [
      { name: 'HTML entry.', grade: 80, desc: 'good' },
      { name: 'CSS entry.', grade: 30, desc: 'good' },
      { name: 'JS entry.', grade: 80, desc: 'good' },
      { name: 'TS entry.', grade: 80, desc: 'good' },
      { name: 'React entry.', grade: 80, desc: 'good' },
    ],
    days: [
      { name: '2024-05-12', status: 'P' },
      { name: '2024-05-14', status: 'S' },
      { name: '2024-05-17', status: 'A' },
      { name: '2024-05-17', status: 'A' },
      { name: '2024-05-17', status: 'A' },
      // P = present, S = sick, A = absent, E = excused, L = late
    ],
    sent: true,
  },
];
describe('List', () => {
  it('Should render list component', () => {
    const { container } = render(List(testData));
    expect(container).toBeDefined();
  });
});
