jest.mock('@/generated', () => {
  const actual = jest.requireActual('@/generated');
  return {
    __esModule: true,
    ...actual,
    useGetPostByIdQuery: jest.fn(),
    useUpdatePostByIdMutation: jest.fn(() => [jest.fn(), { loading: false }]),
  };
});

import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import ListingDetailAdminView from '@/app/admin/_components/ListingDetailAdminView';
import { useParams } from 'next/navigation';
import { useGetPostByIdQuery } from '@/generated';
import userEvent from '@testing-library/user-event';

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} alt={props.alt || 'mocked image'} />,
}));

const mockData = {
  getPostById: {
    _id: '1',
    propertyOwnerId: 'owner-123',
    ownerName: 'Н.Мөнхтунгалаг',
    number: '99112233',
    title: 'Seoul royal county хотхон',
    description: 'Тайлбар',
    price: 880000000,
    size: 80,
    totalRooms: 1,
    restrooms: 2,
    garage: true,
    balcony: true,
    status: 'PENDING',
    images: Array(8).fill('/listingcard.png'),
    location: {
      district: 'Хан-Уул',
      city: 'Улаанбаатар',
      address: 'Зайсан гудамж',
    },
    windowsCount: 6,
    windowType: 'Төмөр вакум',
    door: 'Төмөр вакум',
    floorNumber: 4,
    totalFloors: 5,
    roofMaterial: 'Ламинат',
  },
};

describe('ListingDetailAdminView - Full Coverage', () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    (useGetPostByIdQuery as jest.Mock).mockReturnValue({ data: mockData });
  });

it('renders main information section', () => {
  render(<ListingDetailAdminView />);

  const container = screen.getByText('Ерөнхий мэдээлэл').closest('div')!;

  expect(screen.getByText('Н.Мөнхтунгалаг')).toBeInTheDocument();
  expect(screen.getByText('99112233')).toBeInTheDocument();
  expect(screen.getAllByText('Seoul royal county хотхон')[0]).toBeInTheDocument();
  expect(screen.getAllByText('880,000,000₮')[0]).toBeInTheDocument();
  expect(screen.getByText('80м²')).toBeInTheDocument();

  const sleepRoomSection = within(container).getByText('Унтлагын өрөө').closest('div')!;
  expect(within(sleepRoomSection).getByText('1 өрөө')).toBeInTheDocument();

  const toiletSection = within(container).getByText('Ариун цэврийн өрөө').closest('div')!;
  expect(within(toiletSection).getByText('2 өрөө')).toBeInTheDocument();

  expect(screen.getByText('Тайлбар')).toBeInTheDocument();
});

  it('renders image gallery', () => {
    render(<ListingDetailAdminView />);
    const images = screen.getAllByAltText('listing');
    expect(images.length).toBe(8);
  });

  it('renders location details', () => {
    render(<ListingDetailAdminView />);
    expect(screen.getByText('Хан-Уул')).toBeInTheDocument();
    expect(screen.getByText('Улаанбаатар')).toBeInTheDocument();
    expect(screen.getByText('Зайсан гудамж')).toBeInTheDocument();
  });

  it('renders building details section', () => {
    render(<ListingDetailAdminView />);
    expect(screen.getByText('Цонхны тоо:')).toBeInTheDocument();
    expect(screen.getAllByText('Төмөр вакум').length).toBe(2);
    expect(screen.getByText('4 давхарт')).toBeInTheDocument();
    expect(screen.getByText('5 давхар')).toBeInTheDocument();
    expect(screen.getByText('Ламинат')).toBeInTheDocument();
    expect(screen.getAllByText('Байгаа').length).toBeGreaterThanOrEqual(1);
  });

  it('renders status select with default value', () => {
    render(<ListingDetailAdminView />);
    expect(screen.getByText('Төлөв')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveValue('Хүлээгдэж буй');
  });

  it('calls onChange and updates status when select is changed', async () => {
    render(<ListingDetailAdminView />);
  
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('Хүлээгдэж буй'); 
  
    await userEvent.selectOptions(select, 'Зөвшөөрөх'); 
  
    await screen.findByText('Төлөв амжилттай солигдлоо');
  
    expect(select).toHaveValue('Зөвшөөрөх');
    expect(screen.getByText('Төлөв амжилттай солигдлоо')).toBeInTheDocument();
  });

  it('handles array id correctly from useParams', () => {
  (useParams as jest.Mock).mockReturnValue({ id: ['1'] }); 

  (useGetPostByIdQuery as jest.Mock).mockReturnValue({ data: mockData });

  render(<ListingDetailAdminView />);
  
  expect(screen.getByText('Ерөнхий мэдээлэл')).toBeInTheDocument(); 
});
});
