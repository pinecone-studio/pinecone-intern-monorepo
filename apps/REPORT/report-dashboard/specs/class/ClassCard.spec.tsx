import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ClassCard } from '../../src/app/class/_components/ClassCard';

describe('ClassCard', () => {
  const mockData = {
    __typename: 'Class',
    name: 'Introduction to Programming',
    startDate: '2023-09-01',
    endDate: '2023-12-15',
    teachers: ['John Doe', 'Jane Smith'],
  };

  it('renders the class name correctly', () => {
    render(<ClassCard data={mockData} />);
    const classNameElement = screen.getByText('Introduction to Programming');
    expect(classNameElement).toBeInTheDocument();
  });

  it('renders the class date range correctly', () => {
    render(<ClassCard data={mockData} />);
    const dateRangeElement = screen.getByText('2023-09-01 - 2023-12-15');
    expect(dateRangeElement).toBeInTheDocument();
  });

  it('renders the teachers correctly', () => {
    render(<ClassCard data={mockData} />);
    const teacherElements = screen.getAllByText(/John Doe|Jane Smith/);
    expect(teacherElements).toHaveLength(2);
  });

  it('renders without crashing when data is missing', () => {
    render(<ClassCard data={undefined} />);
    const classCard = screen.getByTestId('class-card');
    expect(classCard).toBeInTheDocument();
  });

  it('does not render class name when data is missing', () => {
    render(<ClassCard data={undefined} />);
    const classNameElement = screen.queryByText('Introduction to Programming');
    expect(classNameElement).not.toBeInTheDocument();
  });

  it('does not render date range when data is missing', () => {
    render(<ClassCard data={undefined} />);
    const dateRangeElement = screen.queryByText('2023-09-01 - 2023-12-15');
    expect(dateRangeElement).not.toBeInTheDocument();
  });

  it('does not render teachers when data is missing', () => {
    render(<ClassCard data={undefined} />);
    const teacherElements = screen.queryAllByText(/John Doe|Jane Smith/);
    expect(teacherElements).toHaveLength(0);
  });
});
