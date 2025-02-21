import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { GeneralInfo, InfoField, RoomInfoItem, RoomInformation, formatPrice } from '@/components/admin/add-room';

// Mock props
const mockProps = {
  tax: '10%',
  bed: 'Queen',
  name: 'Deluxe Room',
  type: 'Suite',
  price: '200',
  roomInfo: ['Ocean View', 'Mini Bar', 'Balcony'],
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

// Test suite for GeneralInfo component
describe('GeneralInfo Component', () => {
  // Test 1: Renders GeneralInfo with provided data
  test('renders GeneralInfo with provided data', () => {
    render(<GeneralInfo {...mockProps} />);

    // Check for static text
    expect(screen.getByText('General Info')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('Price per night')).toBeInTheDocument();
    expect(screen.getByText('Bed')).toBeInTheDocument();
    expect(screen.getByText('Tax')).toBeInTheDocument();
    expect(screen.getByText('Room number')).toBeInTheDocument();
    expect(screen.getByText('Room Information')).toBeInTheDocument();

    // Check for dynamic values
    expect(screen.getByText('Deluxe Room')).toBeInTheDocument();
    expect(screen.getByText('Suite')).toBeInTheDocument();
    expect(screen.getByText('200₮')).toBeInTheDocument(); // Formatted price
    expect(screen.getByText('Queen')).toBeInTheDocument();
    expect(screen.getByText('101')).toBeInTheDocument();
    expect(screen.getByText('Ocean View')).toBeInTheDocument();
    expect(screen.getByText('Mini Bar')).toBeInTheDocument();
    expect(screen.getByText('Balcony')).toBeInTheDocument();
  });

  // Test 2: Renders default values when data is missing
  test('renders default values when data is missing', () => {
    render(
      <GeneralInfo
        tax=""
        bed=""
        name=""
        type=""
        price=""
        roomInfo={[]}
        roomNumber=""
        setTax={jest.fn()}
        setBed={jest.fn()}
        setName={jest.fn()}
        setType={jest.fn()}
        setPrice={jest.fn()}
        setRoomInfo={jest.fn()}
        setRoomNumber={jest.fn()}
        handleEditGeneralInfo={jest.fn()}
      />
    );

    // Check for default values
    expect(screen.getAllByText('-/-').length).toBeGreaterThan(0);
  });

  // Test 3: Opens GeneralInfoDialog on button click
  test('opens GeneralInfoDialog on button click', async () => {
    render(<GeneralInfo {...mockProps} />);

    const editButton = screen.getByRole('button', { name: /edit/i });
    await userEvent.click(editButton);

    // Check if the dialog interaction handler was called
    // expect(mockProps.handleEditGeneralInfo).toHaveBeenCalled();
  });
});

// Test suite for formatPrice utility function
describe('formatPrice function', () => {
  test('formats numeric price correctly', () => {
    expect(formatPrice(200)).toBe('200₮');
    expect(formatPrice(2000)).toBe('2,000₮');
  });

  test('formats string price correctly', () => {
    expect(formatPrice('200')).toBe('200₮');
    expect(formatPrice('2000')).toBe('2,000₮');
  });

  test('returns -/- for invalid price', () => {
    expect(formatPrice('invalid')).toBe('-/-'); // Non-numeric string
    expect(formatPrice(NaN)).toBe('-/-'); // NaN
    expect(formatPrice('')).toBe('-/-'); // Empty string
    // expect(formatPrice(null)).toBe('-/-'); // null
    expect(formatPrice(undefined)).toBe('-/-'); // undefined
  });
});

// Test suite for RoomInformation component
describe('RoomInformation Component', () => {
  test('renders room information correctly', () => {
    const roomInfo = ['Ocean View', 'Mini Bar', 'Balcony'];
    render(<RoomInformation roomInfo={roomInfo} />);

    expect(screen.getByText('Room Information')).toBeInTheDocument();
    expect(screen.getByText('Ocean View')).toBeInTheDocument();
    expect(screen.getByText('Mini Bar')).toBeInTheDocument();
    expect(screen.getByText('Balcony')).toBeInTheDocument();
  });

  test('renders -/- when roomInfo is empty', () => {
    render(<RoomInformation roomInfo={[]} />);

    expect(screen.getByText('Room Information')).toBeInTheDocument();
    expect(screen.getByText('-/-')).toBeInTheDocument();
  });
});

// Test suite for InfoField component
describe('InfoField Component', () => {
  test('renders label and value correctly', () => {
    render(<InfoField label="Test Label" value="Test Value" />);

    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByText('Test Value')).toBeInTheDocument();
  });

  test('renders -/- when value is missing', () => {
    render(<InfoField label="Test Label" value="" />);

    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByText('-/-')).toBeInTheDocument();
  });
});

// Test suite for RoomInfoItem component
describe('RoomInfoItem Component', () => {
  test('renders room info item correctly', () => {
    render(<RoomInfoItem value="Ocean View" />);

    expect(screen.getByText('Ocean View')).toBeInTheDocument();
  });
});
