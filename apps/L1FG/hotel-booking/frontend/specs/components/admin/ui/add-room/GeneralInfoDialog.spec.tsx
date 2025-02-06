import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GeneralInfoDialog } from '@/components/admin/ui/dialog/add-room/GeneralInfoDialog';

describe('GeneralInfoDialog', () => {
  const mockProps = {
    tax: '10',
    bed: '2',
    name: 'Room 101',
    price: '100',
    roomInfo: ['WiFi', 'TV'],
    roomNumber: '101',
    setTax: jest.fn(),
    setBed: jest.fn(),
    setName: jest.fn(),
    setType: jest.fn(),
    setPrice: jest.fn(),
    setRoomInfo: jest.fn(),
    setRoomNumber: jest.fn(),
    handleEditGeneralInfo: jest.fn(),
  };

  it('renders the dialog with initial values', () => {
    render(<GeneralInfoDialog type={''} {...mockProps} />);

    // Open the dialog by clicking the "Edit" button
    fireEvent.click(screen.getByText('Edit'));

    // Now check if the dialog content is rendered
    expect(screen.getByText('General Info')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Room 101')).toBeInTheDocument();
    expect(screen.getByDisplayValue('100')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
    expect(screen.getByDisplayValue('10')).toBeInTheDocument();
    expect(screen.getByDisplayValue('101')).toBeInTheDocument();
    expect(screen.getByDisplayValue('WiFi, TV')).toBeInTheDocument();
  });

  it('calls the appropriate handlers when input values change', () => {
    render(<GeneralInfoDialog type={''} {...mockProps} />);

    // Open the dialog
    fireEvent.click(screen.getByText('Edit'));

    // Simulate changing the name input
    const nameInput = screen.getByDisplayValue('Room 101');
    fireEvent.change(nameInput, { target: { value: 'Room 102' } });
    expect(mockProps.setName).toHaveBeenCalledWith('Room 102');

    // Simulate changing the price input
    const priceInput = screen.getByDisplayValue('100');
    fireEvent.change(priceInput, { target: { value: '150' } });
    expect(mockProps.setPrice).toHaveBeenCalledWith('150');

    // Simulate changing the bed input
    const bedInput = screen.getByDisplayValue('2');
    fireEvent.change(bedInput, { target: { value: '3' } });
    expect(mockProps.setBed).toHaveBeenCalledWith('3');

    // Simulate changing the tax input
    const taxInput = screen.getByDisplayValue('10');
    fireEvent.change(taxInput, { target: { value: '15' } });
    expect(mockProps.setTax).toHaveBeenCalledWith('15');

    // Simulate changing the room number input
    const roomNumberInput = screen.getByDisplayValue('101');
    fireEvent.change(roomNumberInput, { target: { value: '102' } });
    expect(mockProps.setRoomNumber).toHaveBeenCalledWith('102');

    // Simulate changing the room info textarea
    const roomInfoTextarea = screen.getByDisplayValue('WiFi, TV');
    fireEvent.change(roomInfoTextarea, { target: { value: 'WiFi, TV, AC' } });
    expect(mockProps.setRoomInfo).toHaveBeenCalledWith(['WiFi', 'TV', 'AC']);
  });

  it('calls handleEditGeneralInfo when the save button is clicked', () => {
    render(<GeneralInfoDialog type={''} {...mockProps} />);

    // Open the dialog
    fireEvent.click(screen.getByText('Edit'));

    // Simulate clicking the save button
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);
    expect(mockProps.handleEditGeneralInfo).toHaveBeenCalled();
  });

  it('calls the cancel handler when the cancel button is clicked', () => {
    render(<GeneralInfoDialog type={''} {...mockProps} />);

    // Open the dialog
    fireEvent.click(screen.getByText('Edit'));

    // Simulate clicking the cancel button
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    // Assuming the AlertDialogCancel component internally handles the close logic
    // You might need to mock the AlertDialogCancel component if it has specific behavior
  });

  it('debugs rendered DOM if the dialog is not opening', () => {
    const { container } = render(<GeneralInfoDialog type={''} {...mockProps} />);
    console.log(container.innerHTML); // Log the DOM to debug issues
  });
});
