// StudentsTable.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import StudentsTable from '../../src/app/student/_features/studentsTable/StudentsTable';

const mockStudentsData = [
  {
    firstName: 'TEST',
    studentCode: '123456789',
    email: 'TEST@gmail.com',
    phoneNumber: '98989898989',
    active: true,
    profileImgUrl: '1234567URL',
  },
];

describe('StudentsTable', () => {
  it('renders table headers correctly', () => {
    render(<StudentsTable studentsData={[]} />);
    expect(screen.getByText('Сурагчийн Нэр')).toBeDefined();
    expect(screen.getByText('Код')).toBeDefined();
    expect(screen.getByText('Цахим хаяг')).toBeDefined();
    expect(screen.getByText('Утасны дугаар')).toBeDefined();
    expect(screen.getByText('Төлөв')).toBeDefined();
  });

  it('renders student data correctly', () => {
    render(<StudentsTable studentsData={mockStudentsData} />);
    expect(screen.getByText('TEST')).toBeDefined();
    expect(screen.getByText('123456789')).toBeDefined();
    expect(screen.getByText('TEST@gmail.com')).toBeDefined();
  });
});
