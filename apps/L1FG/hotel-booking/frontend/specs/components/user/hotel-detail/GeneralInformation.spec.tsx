import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GeneralInformation } from '@/components/user/hotel-detail';
import { Hotel } from '@/generated';

jest.mock('nuqs', () => ({
  useQueryState: jest.fn(() => [null, jest.fn()]), // Mock хийж байна
}));

describe('GeneralInformation Component', () => {
  it('should render hotel name and stars correctly', () => {
    const mockHotel: Hotel = {
      name: 'Test Hotel',
      starRating: 4,
    } as Hotel;

    render(<GeneralInformation data={mockHotel} />);

    // Зочид буудлын нэр байгаа эсэхийг шалгах
    expect(screen.getByText('Test Hotel'));

    // 4 од байгаа эсэхийг шалгах
    const stars = screen.getAllByTestId('star-icon');
    expect(stars);
  });

  it('should not render stars if starRating is undefined', () => {
    const mockHotel: Hotel = {
      name: 'No Star Hotel',
    } as Hotel;

    render(<GeneralInformation data={mockHotel} />);

    expect(screen.getByText('No Star Hotel'));

    // Од байхгүй эсэхийг шалгах
    expect(screen.queryByTestId('star-icon'));
  });
});
