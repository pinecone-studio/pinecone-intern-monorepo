import BuildingInfoSection from '@/app/user-listing/edit/_components/BuildingInfoSection';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('BuildingInfoSection', () => {
  it('renders section header and description', () => {
    render(<BuildingInfoSection />);

    expect(screen.getByText('Барилгын дэлгэрэнгүй')).toBeInTheDocument();
    expect(screen.getByText('Барилгын техникийн мэдээлэл')).toBeInTheDocument();
  });

  it('renders all label-value pairs as inputs with correct default values', () => {
    render(<BuildingInfoSection />);

    const expectedFields = [
      ['Ашиглалтанд орсон он', '2012'],
      ['Цонхны тоо', '6'],
      ['Цонх', 'Төмөр вакум'],
      ['Хаалга', 'Төмөр вакум'],
      ['Хэдэн давхарт', '4 давхарт'],
      ['Барилгын давхар', '5 давхарт'],
      ['Шал', 'Ламинат'],
      ['Тагт', '2 тагттай']
    ];

    expectedFields.forEach(([label, value]) => {
    const inputs = screen.getAllByDisplayValue(value);
    expect(inputs.length).toBeGreaterThan(0);
    expect(screen.getByText(label)).toBeInTheDocument();
    });
  });
});
