import { LeadApprovedModal } from '@/components/LeadApprovedModal';
import { fireEvent, render } from '@testing-library/react';

describe('should be LeadApprovedModal render', () => {
  it('render the LeadApprovedModal', async () => {
    const text = {
      header: 'a',
      description: 'a',
    };
    const { getByTestId } = render(
      <LeadApprovedModal
        isOpen={true}
        onClose={() => {
          console.log('');
        }}
        onSubmit={() => {
          console.log('');
        }}
        text={text}
        employeeName="Name"
      />
    );
    const button = getByTestId('approve-btn');

    fireEvent.click(button);
  });
});
