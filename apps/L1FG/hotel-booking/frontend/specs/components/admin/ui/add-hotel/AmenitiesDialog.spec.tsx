import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import jest-dom for toBeInTheDocument
import { AmenitiesDialog } from '@/components/admin/ui/dialog';

describe('AmenitiesDialog', () => {
  const mockAmenities = ['WiFi', 'Pool', 'Gym'];
  const mockSetAmenities = jest.fn();
  const mockHandleEditHotelAmenities = jest.fn();

  const renderComponent = () => {
    return render(<AmenitiesDialog amenities={mockAmenities} setAmenities={mockSetAmenities} handleEditHotelAmenities={mockHandleEditHotelAmenities} />);
  };

  it('renders correctly', () => {
    renderComponent();
    // Check if the "Edit" button is rendered
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  it('opens the dialog and updates amenities when textarea changes', () => {
    renderComponent();

    // Open the dialog by clicking the "Edit" button
    fireEvent.click(screen.getByText('Edit'));

    // Check if the dialog content is rendered
    expect(screen.getByText('Amenities')).toBeInTheDocument();
    expect(screen.getByText('Amenties')).toBeInTheDocument();

    // Find the textarea and simulate a change event
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'WiFi, Pool, Gym, Spa' } });

    // Verify that setAmenities was called with the correct value
    expect(mockSetAmenities).toHaveBeenCalledWith(['WiFi', 'Pool', 'Gym', 'Spa']);
  });

  it('opens the dialog and calls handleEditHotelAmenities when Save button is clicked', () => {
    renderComponent();

    // Open the dialog by clicking the "Edit" button
    fireEvent.click(screen.getByText('Edit'));

    // Find the "Save" button and simulate a click event
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    // Verify that handleEditHotelAmenities was called
    expect(mockHandleEditHotelAmenities).toHaveBeenCalled();
  });

  it('opens the dialog and does not call handleEditHotelAmenities when Cancel button is clicked', () => {
    renderComponent();

    // Mock функцыг эхлээд цэвэрлэх
    mockHandleEditHotelAmenities.mockClear();

    // Open the dialog by clicking the "Edit" button
    fireEvent.click(screen.getByText('Edit'));

    // Find the "Cancel" button and simulate a click event
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    // Verify that handleEditHotelAmenities was not called
    expect(mockHandleEditHotelAmenities).not.toHaveBeenCalled();
  });
});
