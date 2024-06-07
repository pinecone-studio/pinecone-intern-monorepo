import { List } from '../_components/List';
export const testData = [
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
];
export const ReportMain = () => {
  return (
    <div className="w-screen flex justify-center items-center">
      <h1>Hello from Report Main with the {List(testData)}</h1>
    </div>
  );
};
