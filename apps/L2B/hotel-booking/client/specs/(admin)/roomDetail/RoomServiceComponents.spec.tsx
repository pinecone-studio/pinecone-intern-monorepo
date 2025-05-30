import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { ServiceCategory, ServiceInput } from '@/app/(admin)/hotels/[hotelid]/[roomId]/_components/RoomServiceComponents';
import '@testing-library/jest-dom';

describe('ServiceCategory', () => {
  it('renders services when provided', () => {
    render(<ServiceCategory label="Amenities" services={['WiFi', 'TV']} />);

    expect(screen.getByTestId('service-category-Amenities')).toBeInTheDocument();
    expect(screen.getByTestId('service-badge-WiFi')).toBeInTheDocument();
    expect(screen.getByTestId('service-badge-TV')).toBeInTheDocument();
    expect(screen.queryByText('-/-')).not.toBeInTheDocument();
  });

  it('renders fallback when no services are provided', () => {
    render(<ServiceCategory label="Amenities" services={[]} />);

    expect(screen.getByTestId('service-category-Amenities')).toBeInTheDocument();
    expect(screen.getByText('-/-')).toBeInTheDocument();
    expect(screen.queryByTestId(/service-badge-/)).not.toBeInTheDocument();
  });

  it('renders correct label', () => {
    render(<ServiceCategory label="Facilities" services={['Pool']} />);
    expect(screen.getByText('Facilities')).toBeInTheDocument();
  });
});

describe('ServiceInput', () => {
  const mockOnChange = jest.fn();
  const mockOnAdd = jest.fn();
  const mockOnRemove = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with provided services', () => {
    render(<ServiceInput label="Services" services={['Cleaning', 'Breakfast']} value="" onChange={mockOnChange} onAdd={mockOnAdd} onRemove={mockOnRemove} />);

    expect(screen.getByTestId('badge-Cleaning')).toBeInTheDocument();
    expect(screen.getByTestId('badge-Breakfast')).toBeInTheDocument();
    expect(screen.getByTestId('service-input-field-Services')).toBeInTheDocument();
  });

  it('calls onRemove when service badge is clicked', () => {
    render(<ServiceInput label="Services" services={['Cleaning']} value="" onChange={mockOnChange} onAdd={mockOnAdd} onRemove={mockOnRemove} />);

    fireEvent.click(screen.getByTestId('remove-service-Cleaning'));
    expect(mockOnRemove).toHaveBeenCalledWith('Cleaning');
  });

  it('calls onChange when input value changes', () => {
    render(<ServiceInput label="Services" services={[]} value="" onChange={mockOnChange} onAdd={mockOnAdd} onRemove={mockOnRemove} />);

    const input = screen.getByTestId('service-input-field-Services');
    fireEvent.change(input, { target: { value: 'Laundry' } });
    expect(mockOnChange).toHaveBeenCalledWith('Laundry');
  });

  it('calls onAdd when Enter key is pressed', () => {
    render(<ServiceInput label="Services" services={[]} value="Test" onChange={mockOnChange} onAdd={mockOnAdd} onRemove={mockOnRemove} />);

    const input = screen.getByTestId('service-input-field-Services');
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(mockOnAdd).toHaveBeenCalled();
  });

  it('shows correct placeholder when no services exist', () => {
    render(<ServiceInput label="Amenities" services={[]} value="" onChange={mockOnChange} onAdd={mockOnAdd} onRemove={mockOnRemove} />);

    expect(screen.getByPlaceholderText('Add amenities...')).toBeInTheDocument();
  });

  it('shows empty placeholder when services exist', () => {
    render(<ServiceInput label="Amenities" services={['WiFi']} value="" onChange={mockOnChange} onAdd={mockOnAdd} onRemove={mockOnRemove} />);

    expect(screen.getByPlaceholderText('')).toBeInTheDocument();
  });
});
