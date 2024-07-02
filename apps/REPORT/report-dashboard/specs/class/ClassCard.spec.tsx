// ClassCard.test.js
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ClassCard, { ClassWithTypename } from '../../src/app/class/_components/ClassCard';

describe('ClassCard component', () => {
  const mockData: ClassWithTypename = {
    __typename: 'Class',
    name: 'Math Class',
    startDate: '2024-07-01',
    endDate: '2024-12-31',
    teachers: ['Mr. Smith', 'Ms. Johnson'],
  };

  test('renders class card with data', () => {
    const { getByText } = render(<ClassCard data={mockData} />);

    expect(getByText('Math Class')).toBeInTheDocument();
    expect(getByText('2024-07-01 - 2024-12-31')).toBeInTheDocument();

    mockData.teachers.forEach((teacher) => {
      expect(getByText(teacher)).toBeInTheDocument();
    });
  });

  test('renders default message when data is missing', () => {
    const { getByText } = render(<ClassCard data={undefined as any} />);

    expect(getByText('No data available')).toBeInTheDocument();
  });
});
