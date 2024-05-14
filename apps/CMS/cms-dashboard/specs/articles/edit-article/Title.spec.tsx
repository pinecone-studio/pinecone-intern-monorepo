import { render } from '@testing-library/react';
import { InputLabel } from '../../../src/app/articles/edit-article/[id]/_components/InputLabel';

describe('arrow components', () => {
  it('1-> should check arrow component is rendered or not', () => {
    const { container } = render(<InputLabel title={'be off'} />);
    expect(container).toBeDefined();
  });

  it('2 -> should check if the component receives propsText or not', () => {
    const { getByTestId } = render(<InputLabel title={'artful'} />);
    const propsText = getByTestId('content-title-id');
    expect(propsText).toBeDefined();
  });
});
