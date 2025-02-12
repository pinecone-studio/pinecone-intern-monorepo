import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GeneralInfo } from '@/components/admin/add-hotel';
import { getRatingLabel } from '@/components/admin/add-hotel';
import { GeneralInfoDialog } from '@/components/admin/ui/dialog';

jest.mock('lucide-react', () => ({
  Phone: () => <div data-testid="phone-icon">Mocked Phone Icon</div>,
}));
jest.mock('@/components/admin/ui/dialog', () => ({
  GeneralInfoDialog: jest.fn(() => <div data-testid="mocked-dialog">Mocked GeneralInfoDialog</div>),
}));
jest.mock('@/components/admin/svg', () => ({
  OrangeStar: jest.fn(() => <div data-testid="filled-star">★</div>),
  Star: jest.fn(() => <div data-testid="empty-star">☆</div>),
}));
describe('GeneralInfo Component', () => {
  const mockProps = {
    name: 'Test Hotel',
    rating: '8.5',
    starRating: '4',
    description: 'A wonderful place to stay.',
    phoneNumber: '+1234567890',
    setName: jest.fn(),
    setRating: jest.fn(),
    setStarRating: jest.fn(),
    setDescription: jest.fn(),
    setPhoneNumber: jest.fn(),
    handleEditHotelGeneralInfo: jest.fn(),
  };
  const renderComponent = (props = {}) => {
    return render(<GeneralInfo {...mockProps} {...props} />);
  };
  describe('getRatingLabel', () => {
    it('returns "Excellent" for ratings >=9', () => {
      expect(getRatingLabel(9)).toBe('Excellent');
      expect(getRatingLabel('9.5')).toBe('Excellent');
    });
    it('returns "Very good" for ratings >=8', () => {
      expect(getRatingLabel(8)).toBe('Very good');
      expect(getRatingLabel('8.4')).toBe('Very good');
    });
    it('returns "Good" for ratings >=7', () => {
      expect(getRatingLabel(7)).toBe('Good');
      expect(getRatingLabel('7.0')).toBe('Good');
    });

    it('returns "None" for ratings below 7', () => {
      expect(getRatingLabel(6.9)).toBe('None');
      expect(getRatingLabel('6')).toBe('None');
    });
  });

  it('displays the phone icon', () => {
    renderComponent();
    expect(screen.getByTestId('phone-icon')).toBeInTheDocument();
  });

  it('renders all filled stars when starRating is 5', () => {
    renderComponent({ starRating: '5' });
    const filledStars = screen.getAllByTestId('filled-star');
    expect(filledStars.length).toBe(5);
  });

  it('renders all empty stars when starRating is invalid', () => {
    renderComponent({ starRating: 'invalid' });
    const emptyStars = screen.getAllByTestId('empty-star');
    expect(emptyStars.length).toBe(5);
  });

  it('renders empty stars when starRating is 0', () => {
    renderComponent({ starRating: '0' });
    const emptyStars = screen.getAllByTestId('empty-star');
    expect(emptyStars.length).toBe(5);
  });

  it('renders the component correctly', () => {
    renderComponent();
    expect(screen.getByText('General Info')).toBeInTheDocument();
    expect(screen.getByTestId('mocked-dialog')).toBeInTheDocument();
  });

  it('displays the correct name', () => {
    renderComponent();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Test Hotel')).toBeInTheDocument();
  });

  it('displays "-/-" when name is not provided', () => {
    renderComponent({ name: '' });
    expect(screen.getByText('-/-')).toBeInTheDocument();
  });

  it('displays the correct phone number', () => {
    renderComponent();
    expect(screen.getByText('Phone Number')).toBeInTheDocument();
    expect(screen.getByText('+1234567890')).toBeInTheDocument();
  });

  it('displays "-/-" when phone number is not provided', () => {
    renderComponent({ phoneNumber: '' });
    expect(screen.getByText('-/-')).toBeInTheDocument();
  });

  it('displays the correct rating and label', () => {
    renderComponent();
    expect(screen.getByText('Rating')).toBeInTheDocument();
    expect(screen.getByText('8.5')).toBeInTheDocument();
    expect(screen.getByText('Very good')).toBeInTheDocument();
  });

  it('displays "0.0" and "None" when rating is not provided', () => {
    renderComponent({ rating: '' });
    expect(screen.getByText('0.0')).toBeInTheDocument();
    expect(screen.getByText('None')).toBeInTheDocument();
  });

  it('renders the correct number of stars', () => {
    renderComponent();
    const filledStars = screen.getAllByTestId('filled-star');
    const emptyStars = screen.getAllByTestId('empty-star');
    expect(filledStars.length).toBe(4); // starRating is '4'
    expect(emptyStars.length).toBe(1); // 5 - 4 = 1
  });

  it('displays the correct description', () => {
    renderComponent();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('A wonderful place to stay.')).toBeInTheDocument();
  });

  it('displays "-/-" when description is not provided', () => {
    renderComponent({ description: '' });
    expect(screen.getByText('-/-')).toBeInTheDocument();
  });

  it('passes the correct props to GeneralInfoDialog', () => {
    renderComponent();
    expect(GeneralInfoDialog).toHaveBeenCalledWith(
      expect.objectContaining({
        name: mockProps.name,
        rating: mockProps.rating,
        starRating: mockProps.starRating,
        description: mockProps.description,
        phoneNumber: mockProps.phoneNumber,
        setName: mockProps.setName,
        setRating: mockProps.setRating,
        setStarRating: mockProps.setStarRating,
        setDescription: mockProps.setDescription,
        setPhoneNumber: mockProps.setPhoneNumber,
        handleEditHotelGeneralInfo: mockProps.handleEditHotelGeneralInfo,
      }),
      expect.anything()
    );
  });
});
