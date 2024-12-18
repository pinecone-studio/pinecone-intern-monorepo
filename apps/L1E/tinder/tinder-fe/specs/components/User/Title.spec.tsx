import { Title } from '@/components/mkae/Title';
import { render, screen } from '@testing-library/react';

describe('Title and Descriptions component', () => {
  it('should call success', () => {
    render(<Title text="hehe" desc="haha" />);
    expect(screen.getByText('haha'));
  });
});
