import { SheetMenu } from '@/components/Sheetmenu';
import { render } from '@testing-library/react';

describe('aboutus page', () => {
  it('should render the sheetMenu Component', () => {
    render(<SheetMenu />);
  });
});
