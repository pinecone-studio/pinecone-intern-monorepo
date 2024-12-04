import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { FilterHotelCard } from '@/components/main/assets';

describe('Main Filter Hotel Card', () => {
  it('should render the filter hotel card', () => {
    render(<FilterHotelCard id="1" name="Ub Hotel" image="https://example.com/image1.jpg" rating={3} stars={3} />);
  });
});
