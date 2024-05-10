import { render } from '@testing-library/react';
import { ToggleButtonForCommnent } from '../../src/app/articles/edit-article/[id]/_components/ToggleForComment';

describe('Toggle for comment', () => {
  it('1 -> check the component is displayed or not', () => {
    const { container } = render(<ToggleButtonForCommnent name="test" defaultChecked={false} value={true} helperText="test" formikError={true} onChange={jest.fn()} onBlur={jest.fn()} />);
    expect(container).toBeDefined();
  });
  it('1 -> check the component is displayed or not', () => {
    const { container } = render(<ToggleButtonForCommnent name="test" defaultChecked={undefined} value={false} helperText="test" formikError={true} onChange={jest.fn()} onBlur={jest.fn()} />);
    expect(container).toBeDefined();
  });
});
