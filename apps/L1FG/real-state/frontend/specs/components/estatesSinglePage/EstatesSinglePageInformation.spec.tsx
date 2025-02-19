import { render, screen } from '@testing-library/react';
import { EstatesSinglePageInformation } from '@/components/estatesSinglePage/EstatesSinglePageInformation';
import '@testing-library/jest-dom';

describe('EstatesSinglePageInformation', () => {
  const mockData = {
    price: '250000000',
    description: ' description',
    propertyDetail: {
      details: {
        completionDate: '2024-02-19T00:00:00.000Z',
        balcony: true,
        windowsCount: 4,
        windowType: 'Triple glasss',
        floorMaterial: 'Wooddd',
        floorNumber: 5,
        totalFloors: 12,
        lift: true,
      },
    },
  } as any;

  it('renders all property information correctly', () => {
    render(<EstatesSinglePageInformation data={mockData} />);

    expect(screen.getByText('Үнэ'));
    expect(screen.getByText('250000000'));

    expect(screen.getByText('Ашиглалтанд орсон он:'));
    expect(screen.getByText(/2024/));

    expect(screen.getByText('Тагт'));
    expect(screen.getByText('Тийм'));

    expect(screen.getByText('Цонхны тоо:'));
    expect(screen.getByText('4'));
    expect(screen.getByText('Цонх'));
    expect(screen.getByText('Triple glasss'));

    expect(screen.getByText('Шал:'));
    expect(screen.getByText('Wooddd'));
    expect(screen.getByText('Хэдэн давхарт:'));

    expect(screen.getByText('Нийт давхар:'));
    expect(screen.getByText('12'));

    expect(screen.getByText('Лифт'));
    expect(screen.getByText('Байгаа'));
  });

  it('handles missing optional data gracefully', () => {
    const incompleteData = {
      price: '250000000',
      description: 'Test description',
      propertyDetail: {
        details: {},
      },
    } as any;

    render(<EstatesSinglePageInformation data={incompleteData} />);

    expect(screen.getByText('250000000'));
    expect(screen.getByText('Test description'));

    expect(screen.getByText('Лифт'));
    expect(screen.queryByText('Байгаа'));
  });

  it('formats date correctly', () => {
    render(<EstatesSinglePageInformation data={mockData} />);

    const dateElement = screen.getByText(/2024/);
    expect(dateElement);
  });
});
