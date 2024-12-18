import Interests from '@/components/profile/Interests';
import { render, screen } from '@testing-library/react';

describe('Interests Component', () => {
  it('should render successfully', () => {
    render(<Interests />);
    expect(screen.getAllByTestId('ner'));
  });
});
