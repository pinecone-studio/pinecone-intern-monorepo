import CheckOutHome from '@/components/main/CheckoutHome';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Check out home', () => {
  it('should render the Check Out Home', () => {
    render(<CheckOutHome />);
  });
});
