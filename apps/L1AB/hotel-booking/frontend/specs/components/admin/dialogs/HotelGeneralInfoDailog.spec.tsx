import { HotelGeneralInfoDailog } from '@/components/admin/dialogs';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Admin General Info Dialog', () => {
  it('should render the hotel general Info dialog', () => {
    render(<HotelGeneralInfoDailog name="hotel" phone="11111111" desc="desc" stars={0} />);
  });
});
