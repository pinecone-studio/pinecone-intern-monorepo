import { render } from '@testing-library/react';
import SuccessModal from '../../src/components/requestForm/Successmodal'; // Adjust path as necessary

describe('SuccessModal', () => {
  it('should render the modal when isOpen is true', () => {
    render(<SuccessModal isOpen={true} onClose={jest.fn()} />);
  });
});
