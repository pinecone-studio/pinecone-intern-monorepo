// ClassCard.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ClassCard, { ClassWithTypename } from '../../src/app/class/_components/ClassCard';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('ClassCard component', () => {
  const mockData: ClassWithTypename = {
    __typename: 'Class',
    _id: '123',
    name: 'Math Class',
    startDate: '2024-07-01',
    endDate: '2024-12-31',
    teachers: ['Mr. Smith', 'Ms. Johnson'],
  };

  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (require('next/navigation').useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  test('renders class card with data', () => {
    const { getByText } = render(<ClassCard data={mockData} />);

    expect(getByText('Math Class')).toBeInTheDocument();
    expect(getByText('2024-07-01 - 2024-12-31')).toBeInTheDocument();

    mockData.teachers.forEach((teacher) => {
      expect(getByText(teacher)).toBeInTheDocument();
    });
  });

  test('navigates to class page when clicked', () => {
    render(<ClassCard data={mockData} />);

    const classCard = screen.getByTestId('class-card');
    fireEvent.click(classCard);

    expect(mockPush).toHaveBeenCalledWith('/class/123');
  });

  test('renders default message when data is missing', () => {
    const { getByText } = render(<ClassCard data={undefined as any} />);

    expect(getByText('No data available')).toBeInTheDocument();
  });
});
