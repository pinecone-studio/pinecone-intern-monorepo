import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BuildingDetails from '@/app/admin/_components/BuildingDetails';

describe('BuildingDetails Component', () => {
  it('displays all building detail values', () => {
    render(<BuildingDetails />);

    expect(screen.getByText('2012')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('4 давхарт')).toBeInTheDocument();
    expect(screen.getByText('5 давхарт')).toBeInTheDocument();
    expect(screen.getByText('Ламинат')).toBeInTheDocument();
    expect(screen.getByText('2 тагттай')).toBeInTheDocument();
    expect(screen.getByText('Байгаа')).toBeInTheDocument();

    const tumurVakum = screen.getAllByText('Төмөр вакум');
    expect(tumurVakum.length).toBe(2);
  });
});
