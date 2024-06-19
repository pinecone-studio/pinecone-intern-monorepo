import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing';
import { ClassCards } from '../../src/app/_topic/_features/ClassCards';
import { ClassType } from '../../src/generated';

const mockedData = [
  {
    __typename: 'Class' as const,
    _id: '1',
    name: 'Sample Class',
    startDate: '2024-06-14',
    endDate: '2024-06-30',
    teachers: ['Teacher 1', 'Teacher 2'],
    classType: ClassType.Coding,
  },
  {
    __typename: 'Class' as const,
    _id: '2',
    name: 'Sample Class 2',
    startDate: '2024-06-14',
    endDate: '2024-06-30',
    teachers: ['Teacher 3', 'Teacher 4'],
    classType: ClassType.Design,
  },
];

describe('ClassCards component', () => {
  it('renders with provided data', () => {
    const { getByTestId, getByText } = render(
      <MockedProvider>
        <ClassCards data={mockedData} />
      </MockedProvider>
    );

    expect(getByTestId('class-cards')).toBeInTheDocument();
    expect(getByText('Sample Class')).toBeInTheDocument();
    expect(getByText('Sample Class 2')).toBeInTheDocument();
    expect(getByText('Teacher 1')).toBeInTheDocument();
    expect(getByText('Teacher 2')).toBeInTheDocument();
    expect(getByText('Teacher 3')).toBeInTheDocument();
    expect(getByText('Teacher 4')).toBeInTheDocument();
  });
});
