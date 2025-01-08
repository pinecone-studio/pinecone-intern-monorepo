import { RefuseModal } from '@/components/RefuseModal';
import { fireEvent, render } from '@testing-library/react';

describe('should be RefuseModal render', () => {
  it('render the reguseModal', async () => {
    const { getByTestId } = render(
      <RefuseModal
        setRefuseValue={(e) => {
          console.log(e);
        }}
        isOpenModal={true}
        onClose={() => {
          console.log('');
        }}
        onConfirm={() => {
          console.log('');
        }}
      />
    );
    const input = getByTestId('areaButton');

    fireEvent.change(input, { target: { value: 'Test text' } });
  });
});
