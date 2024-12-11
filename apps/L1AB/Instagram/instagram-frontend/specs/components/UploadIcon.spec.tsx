import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import UploadIcon from '@/components/icon/UploadIcon';

describe('UploadIcon', () => {
  it('should render successfully', async () => {
    render(<UploadIcon />);
  });
});
