import { InterestSelect } from '../../../src/components/signup/InterestSelect';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Interest page component', () => {
  it('should render successfully', () => {
    render(<InterestSelect />);
    expect(screen.getByText('Next'));
  });
  it('should render if pared.interested', () => {
    render(<InterestSelect />);
    fireEvent.change(screen.getByTestId('interest'));
  });
  it('should handlenext', () => {
    const { getByTestId } = render(<InterestSelect />);
    fireEvent.keyDown(getByTestId('trigger'), { key: 'Enter' });
    fireEvent.keyDown(getByTestId('male'), { key: 'Enter' });
    fireEvent.click(getByTestId('interest'));
  });
  // it('should handlenext', () => {
  //   const { getByTestId } = render(<InterestSelect />);
  //   fireEvent.click(getByTestId('interest'));
  // });
});
