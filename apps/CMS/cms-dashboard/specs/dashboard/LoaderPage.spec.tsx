import { render } from '@testing-library/react';
import { LoaderPage } from '../../src/app/dashboard/_components/LoaderPage';

describe('Loader Page', () => {
  it('should check if the component exists or not', () => {
    const { container } = render(<LoaderPage />);
    expect(container).toBeDefined();    
  });
  it('should check if there is right text or not', () => {
    const { getByText } = render(<LoaderPage />);    
    expect(getByText('Уншиж байна')).toBeDefined();
  })
});
