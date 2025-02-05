import { AdminSideInfo } from '@/components/adminSinglePage/AdminSideInfo';
import { render } from '@testing-library/react';

describe('AdminSideInfo', () => {
  it('should render successfully', () => {
    render(
      <AdminSideInfo
        property={{
          title: '',
          id: '',
          price: '',
          size: '',
          bedrooms: 0,
          bathrooms: 0,
          status: undefined,
          images: [],
        }}
      />
    );
  });
});
