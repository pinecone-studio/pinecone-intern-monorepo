import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LocationDialog } from '@/components/admin/ui/dialog';

describe('LocationDialog Component', () => {
  const mockSetLocationName = jest.fn();
  const mockHandleEditHotelLocation = jest.fn();

  const props = {
    locationName: 'Initial Location',
    setLocationName: mockSetLocationName,
    handleEditHotelLocation: mockHandleEditHotelLocation,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component with the initial location name', () => {
    render(<LocationDialog {...props} />);

    const editButton = screen.getByRole('button', { name: 'Edit' });
    expect(editButton).toBeInTheDocument();

    fireEvent.click(editButton);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveValue('Initial Location');
  });

  it('should call setLocationName when the location is edited', () => {
    render(<LocationDialog {...props} />);

    fireEvent.click(screen.getByRole('button', { name: 'Edit' }));

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'New Location' } });

    expect(mockSetLocationName).toHaveBeenCalledWith('New Location');
  });

  it('should call handleEditHotelLocation when the Save button is clicked', () => {
    render(<LocationDialog {...props} />);

    fireEvent.click(screen.getByRole('button', { name: 'Edit' }));

    const saveButton = screen.getByRole('button', { name: 'Save' });
    fireEvent.click(saveButton);

    expect(mockHandleEditHotelLocation).toHaveBeenCalledTimes(1);
  });

  it('should not call setLocationName or handleEditHotelLocation when the Cancel button is clicked', () => {
    render(<LocationDialog {...props} />);

    fireEvent.click(screen.getByRole('button', { name: 'Edit' }));

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    fireEvent.click(cancelButton);

    expect(mockSetLocationName).not.toHaveBeenCalled();
    expect(mockHandleEditHotelLocation).not.toHaveBeenCalled();
  });
});
