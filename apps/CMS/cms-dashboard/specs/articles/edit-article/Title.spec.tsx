import { render } from '@testing-library/react';
import { Title } from '../../../src/app/articles/edit-article/[id]/_components/Title';

describe('arrow components', () => {
  it('1-> should check arrow component is rendered or not', () => {
    const { container } = render(<Title title={'be off'} />);
    expect(container).toBeDefined();
  });

  it('2 -> should check if the component receives propsText or not', () => {
    const { getByTestId } = render(<Title title={'artful'} />);
    const propsText = getByTestId('content-title-id');
    expect(propsText).toBeDefined();
  });
});
