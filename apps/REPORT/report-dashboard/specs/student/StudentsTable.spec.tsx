import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StudentsTable from '../../src/app/student/_components/StudentsTable';

// Mock the imported components and modules
jest.mock('@/components/ui/table', () => ({
  Table: ({ children, ...props }) => <table {...props}>{children}</table>,
  TableBody: ({ children, ...props }) => <tbody {...props}>{children}</tbody>,
  TableCaption: ({ children, ...props }) => <caption {...props}>{children}</caption>,
  TableCell: ({ children, ...props }) => <td {...props}>{children}</td>,
  TableFooter: ({ children, ...props }) => <tfoot {...props}>{children}</tfoot>,
  TableHead: ({ children, ...props }) => <th {...props}>{children}</th>,
  TableHeader: ({ children, ...props }) => <thead {...props}>{children}</thead>,
  TableRow: ({ children, ...props }) => <tr {...props}>{children}</tr>,
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => <img {...props} />,
}));

jest.mock('../../src/app/student/_components/StudentAddModal', () => ({
  StudentAddModal: ({ open, onOpenChange }) => (
    <div data-testid="student-add-modal" data-open={open} onClick={() => onOpenChange(!open)}>
      Mock StudentAddModal
    </div>
  ),
}));

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }) => <button {...props}>{children}</button>,
}));

jest.mock('lucide-react', () => ({
  Plus: () => <span data-testid="plus-icon">Plus Icon</span>,
}));

describe('StudentsTable', () => {
  const mockStudentsData = [
    {
      firstName: 'John Doe',
      studentCode: 'JD001',
      email: 'john@example.com',
      phoneNumber: '1234567890',
      active: 'ACTIVE',
      profileImgUrl: '/john.jpg',
    },
    {
      firstName: 'Jane Smith',
      studentCode: 'JS002',
      email: 'jane@example.com',
      phoneNumber: '0987654321',
      active: 'INACTIVE',
      profileImgUrl: '/jane.jpg',
    },
  ];

  it('renders the StudentsTable component correctly', () => {
    render(<StudentsTable studentsData={mockStudentsData} />);

    expect(screen.getByText('Сурагч')).toBeInTheDocument();
    expect(screen.getByTestId('plus-icon')).toBeInTheDocument();
    expect(screen.getByText('Сурагчийн Нэр')).toBeInTheDocument();
    expect(screen.getByText('Код')).toBeInTheDocument();
    expect(screen.getByText('Цахим хаяг')).toBeInTheDocument();
    expect(screen.getByText('Утасны дугаар')).toBeInTheDocument();
    expect(screen.getByText('Төлөв')).toBeInTheDocument();
  });

  it('renders student data correctly', () => {
    render(<StudentsTable studentsData={mockStudentsData} />);

    mockStudentsData.forEach((student) => {
      expect(screen.getByText(student.firstName)).toBeInTheDocument();
      expect(screen.getByText(student.studentCode)).toBeInTheDocument();
      expect(screen.getByText(student.email)).toBeInTheDocument();
      expect(screen.getByText(student.phoneNumber)).toBeInTheDocument();
    });

    expect(screen.getByText('Идэвхтэй')).toBeInTheDocument();
    expect(screen.getByText('Идэвхгүй')).toBeInTheDocument();
  });

  it('opens the StudentAddModal when the button is clicked', () => {
    render(<StudentsTable studentsData={mockStudentsData} />);

    const openModalButton = screen.getByTestId('openModalButton');
    fireEvent.click(openModalButton);

    const modal = screen.getByTestId('student-add-modal');
    expect(modal).toHaveAttribute('data-open', 'true');
  });

  it('closes the StudentAddModal when onOpenChange is called', () => {
    render(<StudentsTable studentsData={mockStudentsData} />);

    const openModalButton = screen.getByTestId('openModalButton');
    fireEvent.click(openModalButton);

    const modal = screen.getByTestId('student-add-modal');
    expect(modal).toHaveAttribute('data-open', 'true');

    fireEvent.click(modal);
    expect(modal).toHaveAttribute('data-open', 'false');
  });

  it('renders the correct status class for active and inactive students', () => {
    render(<StudentsTable studentsData={mockStudentsData} />);

    const activeStatus = screen.getByText('Идэвхтэй');

    expect(activeStatus.parentElement).toHaveClass('bg-white');
  });

  it('renders an empty table when no student data is provided', () => {
    render(<StudentsTable studentsData={[]} />);

    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
  });
});
