import { Loading } from '@/components/main';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Main Loading', () => {
  it('should render the main loading', () => {
    render(<Loading />);
  });
});
