/*eslint-disable*/
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import AdminTable, { TableHeaders, ConcertRow, TablePagination } from '@/components/adminHero/AdminHero';
import { useGetConcertsQuery } from '@/generated';

jest.mock('@/generated', () => ({
  useGetConcertsQuery: jest.fn(),
}));

jest.mock('@/components/ui/table', () => ({
  Table: ({ children }: { children: React.ReactNode }) => <table>{children}</table>,
  TableBody: ({ children }: { children: React.ReactNode }) => <tbody>{children}</tbody>,
  TableCell: ({ children }: { children: React.ReactNode }) => <td>{children}</td>,
  TableHead: ({ children }: { children: React.ReactNode }) => <th>{children}</th>,
  TableHeader: ({ children }: { children: React.ReactNode }) => <thead>{children}</thead>,
  TableRow: ({ children, className }: { children: React.ReactNode; className?: string }) => <tr className={className}>{children}</tr>,
}));

jest.mock('@/components/ui/pagination', () => ({
  Pagination: ({ children, className }: { children: React.ReactNode; className?: string }) => <div className={className}>{children}</div>,
  PaginationContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  PaginationItem: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  PaginationLink: ({ children, onClick, isActive, className }: { children: React.ReactNode; onClick?: () => void; isActive?: boolean; className?: string }) => (
    <button onClick={onClick} className={`${className} ${isActive ? 'active' : ''}`}>
      {children}
    </button>
  ),
  PaginationNext: ({ onClick, className }: { onClick?: () => void; className?: string }) => (
    <button onClick={onClick} className={className}>
      Next
    </button>
  ),
  PaginationPrevious: ({ onClick, className }: { onClick?: () => void; className?: string }) => (
    <button onClick={onClick} className={className}>
      Previous
    </button>
  ),
}));

jest.mock('@/components/adminHero/ActionButtons', () => ({
  ActionButtons: () => <div data-testid="action-buttons">Actions</div>,
}));

const mockConcert = {
  _id: '1',
  concertName: 'Test Concert',
  artistName: ['Artist 1', 'Artist 2'],
  concertDay: '2025-02-19',
  concertPlan: 'Plan A',
  concertTime: '19:00',
  concertPhoto: 'photo.jpg',
  vipTicket: { quantity: 100, price: 200000 },
  regularTicket: { quantity: 200, price: 100000 },
  standingAreaTicket: { quantity: 300, price: 50000 },
};

describe('AdminTable', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('TableHeaders', () => {
    it('renders all header columns', () => {
      render(<TableHeaders />);
      const headers = ['Тоглолтын нэр', 'Артист', 'Нийт тоо', 'VIP', 'Regular', 'Задгай', 'Тоглох өдрүүд', 'Нийт ашиг', 'Үйлдэл'];
      headers.forEach((header) => {
        expect(screen.getByText(header)).toBeInTheDocument();
      });
    });
  });

  describe('ConcertRow', () => {
    it('renders concert information correctly', () => {
      render(<ConcertRow concert={mockConcert} />);

      expect(screen.getByText('Test Concert')).toBeInTheDocument();
      expect(screen.getByText('Artist 1, Artist 2')).toBeInTheDocument();
      expect(screen.getByText('600')).toBeInTheDocument(); // Total quantity
      expect(screen.getByText('100')).toBeInTheDocument(); // VIP quantity
      expect(screen.getByText('02/19')).toBeInTheDocument(); // Formatted date
    });
    it('should format date when concertDay exists', () => {
      const concertWithDate = {
        ...mockConcert,
        concertDay: '2025-02-19',
      };

      render(<ConcertRow concert={concertWithDate} />);
      expect(screen.getByText('02/19')).toBeInTheDocument();
    });

    it('should show dash when concertDay is missing', () => {
      const concertWithoutDate = {
        ...mockConcert,
        concertDay: undefined,
      };

      render(<ConcertRow concert={concertWithoutDate} />);
      expect(screen.getByText('-')).toBeInTheDocument();
    });

    it('handles missing ticket information', () => {
      const concertWithMissingData = {
        ...mockConcert,
        vipTicket: null,
        regularTicket: null,
        standingAreaTicket: null,
      };

      render(<ConcertRow concert={concertWithMissingData} />);
      expect(screen.getByText('0₮')).toBeInTheDocument();
    });
  });

  describe('TablePagination', () => {
    const mockOnPageChange = jest.fn();
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it('should handle Previous button clicks correctly', () => {
      render(<TablePagination currentPage={2} totalPages={3} onPageChange={mockOnPageChange} />);

      const prevButton = screen.getByText('Previous');
      fireEvent.click(prevButton);

      expect(mockOnPageChange).toHaveBeenCalledWith(1);
    });

    it('should handle Next button clicks correctly', () => {
      render(<TablePagination currentPage={1} totalPages={3} onPageChange={mockOnPageChange} />);

      const nextButton = screen.getByText('Next');
      fireEvent.click(nextButton);

      expect(mockOnPageChange).toHaveBeenCalledWith(2);
    });

    it('should handle page number clicks', () => {
      render(<TablePagination currentPage={1} totalPages={3} onPageChange={mockOnPageChange} />);

      const pageTwo = screen.getByText('2');
      fireEvent.click(pageTwo);

      expect(mockOnPageChange).toHaveBeenCalledWith(2);
    });
    it('renders pagination controls', () => {
      render(<TablePagination currentPage={1} totalPages={3} onPageChange={mockOnPageChange} />);

      expect(screen.getByText('Previous')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText('Next')).toBeInTheDocument();
    });

    it('handles page changes correctly', () => {
      render(<TablePagination currentPage={1} totalPages={3} onPageChange={mockOnPageChange} />);

      fireEvent.click(screen.getByText('2'));
      expect(mockOnPageChange).toHaveBeenCalledWith(2);

      fireEvent.click(screen.getByText('Next'));
      expect(mockOnPageChange).toHaveBeenCalledWith(2);
    });
  });

  describe('AdminTable', () => {
    it('displays error state', () => {
      (useGetConcertsQuery as jest.Mock).mockReturnValue({ error: new Error('Failed to load') });
      render(<AdminTable />);
      expect(screen.getByText('Error loading concerts')).toBeInTheDocument();
    });

    it('renders concerts data correctly', () => {
      const mockConcerts = [mockConcert];
      (useGetConcertsQuery as jest.Mock).mockReturnValue({
        data: { getConcerts: mockConcerts },
        loading: false,
      });

      render(<AdminTable />);
      expect(screen.getByText('Test Concert')).toBeInTheDocument();
    });

    it('handles pagination correctly', () => {
      const mockConcerts = Array(15)
        .fill(mockConcert)
        .map((concert, index) => ({
          ...concert,
          _id: String(index),
          concertName: `Concert ${index}`,
        }));

      (useGetConcertsQuery as jest.Mock).mockReturnValue({
        data: { getConcerts: mockConcerts },
        loading: false,
      });

      render(<AdminTable />);
      expect(screen.getByText('Concert 0')).toBeInTheDocument();
      expect(screen.queryByText('Concert 10')).not.toBeInTheDocument();

      fireEvent.click(screen.getByText('Next'));
      expect(screen.getByText('Concert 10')).toBeInTheDocument();
    });
  });
  describe('AdminTableLoader', () => {
    it('should display loader when loading', () => {
      (useGetConcertsQuery as jest.Mock).mockReturnValue({
        loading: true,
        data: null,
        error: null,
      });

      const { container } = render(<AdminTable />);

      const loader = container.querySelector('.loader');
      expect(loader).toBeInTheDocument();
      expect(loader).toHaveClass('items-center', 'justify-center', 'flex', 'text-black');
    });

    it('should not display loader when not loading', () => {
      (useGetConcertsQuery as jest.Mock).mockReturnValue({
        loading: false,
        data: { getConcerts: [] },
        error: null,
      });

      const { container } = render(<AdminTable />);

      const loader = container.querySelector('.loader');
      expect(loader).not.toBeInTheDocument();
    });
  });
  describe('AdminTable data handling', () => {
    const mockConcert = {
      _id: '1',
      concertName: 'Test Concert',
      artistName: ['Artist 1'],
      concertDay: '2025-02-19',
      concertTime: '19:00',
      concertPhoto: 'photo.jpg',
      concertPlan: 'Plan A',
      vipTicket: { quantity: 100, price: 200000 },
      regularTicket: { quantity: 200, price: 100000 },
      standingAreaTicket: { quantity: 300, price: 50000 },
    };

    it('should handle undefined data', () => {
      (useGetConcertsQuery as jest.Mock).mockReturnValue({
        loading: false,
        data: undefined,
        error: null,
      });

      render(<AdminTable />);

      expect(screen.queryByText(mockConcert.concertName)).not.toBeInTheDocument();
    });

    it('should handle null getConcerts', () => {
      (useGetConcertsQuery as jest.Mock).mockReturnValue({
        loading: false,
        data: { getConcerts: null },
        error: null,
      });

      render(<AdminTable />);

      expect(screen.queryByText(mockConcert.concertName)).not.toBeInTheDocument();
    });

    it('should handle empty concerts array', () => {
      (useGetConcertsQuery as jest.Mock).mockReturnValue({
        loading: false,
        data: { getConcerts: [] },
        error: null,
      });

      render(<AdminTable />);

      expect(screen.queryByText(mockConcert.concertName)).not.toBeInTheDocument();
    });

    it('should render concerts when data is available', () => {
      (useGetConcertsQuery as jest.Mock).mockReturnValue({
        loading: false,
        data: { getConcerts: [mockConcert] },
        error: null,
      });

      render(<AdminTable />);
      expect(screen.getByText(mockConcert.concertName)).toBeInTheDocument();
    });
  });
});
