import { AdminAboutApartment } from '@/components/adminSinglePage/AdminAboutApartment';
import { render } from '@testing-library/react';

describe('it should render successfully ', () => {
  it('should render successfully', () => {
    render(
      <AdminAboutApartment
        propertyInfo={{
          completionDate: '',
          windowsCount: 0,
          windowType: '',
          floorNumber: 0,
          totalFloors: 0,
          floorMaterial: '',
          balcony: false,
          lift: false,
        }}
      />
    );
  });
});
