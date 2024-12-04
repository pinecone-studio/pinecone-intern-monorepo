import { CheckOutHome } from '@/components/main';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Check out home', () => {
  it('should render The Check Out Home', () => {
    render(<CheckOutHome />);
  });
});
