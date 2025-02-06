import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GeneralInfo } from '@/components/admin/add-room';

const mockProps = {
  tax: '10%',
  bed: 'Queen',
  name: 'Deluxe Room',
  type: 'Suite',
  price: '$200',
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

describe('GeneralInfo Component', () => {
  test('renders GeneralInfo with provided data', () => {
    render(<GeneralInfo {...mockProps} />);

    expect(screen.getByText('General Info')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('Price per night')).toBeInTheDocument();
    expect(screen.getByText('Bed')).toBeInTheDocument();
    expect(screen.getByText('Tax')).toBeInTheDocument();
    expect(screen.getByText('Room number')).toBeInTheDocument();
    expect(screen.getByText('Room Information')).toBeInTheDocument();

    expect(screen.getByText('Deluxe Room')).toBeInTheDocument();
    expect(screen.getByText('Suite')).toBeInTheDocument();
    expect(screen.getByText('$200')).toBeInTheDocument();
    expect(screen.getByText('Queen')).toBeInTheDocument();
    expect(screen.getByText('10%')).toBeInTheDocument();
    expect(screen.getByText('101')).toBeInTheDocument();
    expect(screen.getByText('Ocean View')).toBeInTheDocument();
    expect(screen.getByText('Mini Bar')).toBeInTheDocument();
    expect(screen.getByText('Balcony')).toBeInTheDocument();
  });

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

    expect(screen.getAllByText('-/-').length).toBeGreaterThan(0);
  });
});
