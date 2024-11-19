import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Loading } from '@/components/main/assets';

describe('Main Loading', () => {
  it('should render the main loading', () => {
    render(<Loading />);
  });
});
