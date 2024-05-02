import { fireEvent, render } from '@testing-library/react';
import { ToggleButtonForCommnent } from '../../src/app/articles/edit-article/[id]/_components/ToggleForComment';

describe('Toggle for comment', () => {
  it('1 -> check the component is displayed or not', () => {
    const { container } = render(<ToggleButtonForCommnent isChecked={true} />);
    expect(container).toBeDefined();
  });

  it('2 -> check correctly when checked is true', () => {
    const { getByText } = render(<ToggleButtonForCommnent isChecked={true} />);
    expect(getByText('Сэтгэгдэл идэвхтэй')).toBeDefined();
  });
  it('3 -> check correctly when checked is false', () => {
    const { getByText } = render(<ToggleButtonForCommnent isChecked={false} />);
    expect(getByText('Сэтгэгдэл идэвхгүй')).toBeDefined();
  });

  it('4 -> updates checked state correctly when input is clicked', () => {
    const { getByTestId, getByText } = render(<ToggleButtonForCommnent isChecked={false} />);
    const inputElement = getByTestId('input-test-id');    
    fireEvent.click(inputElement);    
    expect(getByText('Сэтгэгдэл идэвхтэй')).toBeDefined();
  });
  it('5 -> updates checked state correctly when input is clicked', () => {
    const { getByTestId, getByText } = render(<ToggleButtonForCommnent isChecked={true} />);
    const inputElement = getByTestId('input-test-id');    
    fireEvent.click(inputElement);    
    expect(getByText('Сэтгэгдэл идэвхгүй')).toBeDefined();
  });
});
