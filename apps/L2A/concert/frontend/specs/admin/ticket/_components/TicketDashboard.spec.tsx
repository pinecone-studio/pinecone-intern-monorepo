import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TicketDashboard from '@/app/admin/ticket/_components/TicketDashboard';
import '@testing-library/jest-dom';

describe('TicketDashboard Component', () => {
  beforeEach(() => {
    jest.spyOn(window, 'prompt').mockImplementation(() => 'Шинэ нэр');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render all initial rows', () => {
    render(<TicketDashboard />);
    expect(screen.getByTestId('row-0')).toBeInTheDocument();
    expect(screen.getByTestId('row-1')).toBeInTheDocument();
    expect(screen.getByTestId('row-2')).toBeInTheDocument();
  });

  it('should delete and favorite a row when delete button is clicked', () => {
    render(<TicketDashboard />);
    const deleteBtn = screen.getByTestId('delete-btn-0');
    const starBtn = screen.getByTestId('favorite-btn-0');
    fireEvent.click(deleteBtn);
    fireEvent.click(starBtn);
    expect(screen.queryByTestId('row-2')).not.toBeInTheDocument();
  });

  it('should toggle featured status when star is clicked', () => {
    render(<TicketDashboard />);
    const featureBtn = screen.getByTestId('feature-btn-0');
    const beforeIcon = featureBtn.innerHTML;
    fireEvent.click(featureBtn);
    const afterIcon = screen.getByTestId('feature-btn-0').innerHTML;
    expect(beforeIcon).not.toEqual(afterIcon);
  });
});
