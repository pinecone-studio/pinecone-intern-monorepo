import { List } from '../_components/List';
export const testData = [
  {
    name: 'Анастасия',
    category: [
      { name: 'HTML entry.', grade: 80, desc: 'good' },
      { name: 'CSS entry.', grade: 30, desc: 'good' },
      { name: 'JS entry.', grade: 80, desc: 'good' },
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
export const ReportMain = () => {
  return (
    <div className="w-screen">
      <h1>Hello from Report Main with the {List(testData)}</h1>
    </div>
  );
};
