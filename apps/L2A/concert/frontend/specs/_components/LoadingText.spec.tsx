import LoadingText from '@/app/_components/LoadingText';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
describe('render loading text component', () => {
  it('should render loading text', () => {
    render(<LoadingText />);

    expect(screen.getByText('Түр хүлээнэ үү!')).toBeInTheDocument();
  });
});
