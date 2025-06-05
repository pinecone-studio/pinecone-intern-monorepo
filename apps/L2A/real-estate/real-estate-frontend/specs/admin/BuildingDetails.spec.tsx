import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BuildingDetails from '@/app/admin/_components/BuildingDetails';

describe('BuildingDetails Component', () => {
  it('displays all building detail values (true case)', () => {
    const mockData = {
      windowsCount: 6,
      windowType: 'Төмөр вакум',
      door: 'Төмөр вакум',
      floorNumber: 4,
      totalFloors: 5,
      roofMaterial: 'Ламинат',
      flooring: 'Ламинат',
      balcony: true,
      lift: true,
    };

    render(<BuildingDetails data={mockData as any} />);

    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getAllByText('Төмөр вакум')).toHaveLength(2);
    expect(screen.getByText('4 давхарт')).toBeInTheDocument();
    expect(screen.getByText('5 давхар')).toBeInTheDocument();
    expect(screen.getByText('Ламинат')).toBeInTheDocument();
    expect(screen.getAllByText('Байгаа')).toHaveLength(2); 
  });

  it('shows Байхгүй when balcony and lift are false', () => {
    const mockData = {
      windowsCount: 4,
      windowType: 'Модон',
      door: 'Модон',
      floorNumber: 2,
      totalFloors: 3,
      roofMaterial: 'Плита',
      balcony: false,
      lift: false,
    };

    render(<BuildingDetails data={mockData as any} />);
    expect(screen.getAllByText('Байхгүй')).toHaveLength(2);
  });
});
