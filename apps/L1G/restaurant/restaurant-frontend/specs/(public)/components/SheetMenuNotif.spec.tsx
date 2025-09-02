import { SheetMenuNotif } from '@/components/sheets/SheetMenuNotif';
import { render } from '@testing-library/react';

describe('aboutus page', () => {
  it('should render the sheetMenu Component', () => {
    render(<SheetMenuNotif />);
  });
});
