import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing';
import { ClassCard } from '../../src/app/_topic/_components/ClassCard';
import { ClassType } from '../../src/generated';

const mockedData = {
  __typename: 'Class' as const,
  _id: '1',
  name: 'Sample Class',
  startDate: '2024-06-14',
  endDate: '2024-06-30',
  teachers: ['Teacher 1', 'Teacher 2'],
  classType: ClassType.Coding,
};

describe('ClassCard component', () => {
  const testData = {
    __typename: 'Class' as const,
    _id: '1',
    name: 'Sample Class',
    startDate: '2024-06-14',
    endDate: '2024-06-30',
    teachers: ['Teacher 1', 'Teacher 2'],
    classType: 'CODING',
  };

  it('renders with provided data', () => {
    const { getByTestId, getByText } = render(
      <MockedProvider>
        <ClassCard data={mockedData} />
      </MockedProvider>
    );

    expect(getByTestId('class-card')).toBeInTheDocument();
    expect(getByText(testData.name)).toBeInTheDocument();
    expect(getByText(`${testData.startDate} - ${testData.endDate}`)).toBeInTheDocument();
    testData.teachers?.forEach((teacher) => {
      expect(getByText(teacher)).toBeInTheDocument();
    });
  });

  it('renders without teachers if teachers data is undefined', () => {
    const testDataWithoutTeachers = { ...mockedData, teachers: undefined };
    const { getByTestId, queryByText } = render(
      <MockedProvider>
        <ClassCard data={testDataWithoutTeachers} />
      </MockedProvider>
    );

    expect(getByTestId('class-card')).toBeInTheDocument();
    expect(queryByText('Teacher 1')).not.toBeInTheDocument();
    expect(queryByText('Teacher 2')).not.toBeInTheDocument();
  });
});
