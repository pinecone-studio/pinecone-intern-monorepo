import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Policies } from '@/components/admin/hotel-detail';

describe('Policies', () => {
  it('renders Policies successfully with data', () => {
    const mockData = {
      id: '1',
      images: [],
      name: 'Sample Hotel',
      policies: [
        { key: '1', value: 'No smoking' },
        { key: '2', value: 'No pets allowed' },
      ],
    };
    

    render(<Policies data={mockData} hotelRoomData={undefined} />);
  });
});
