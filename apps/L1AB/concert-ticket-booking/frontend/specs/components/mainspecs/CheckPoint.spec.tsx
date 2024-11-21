import CheckPoint from '@/components/maincomponents/CheckPoint';
import { render } from '@testing-library/react';

describe('CheckPoint', () => {
  it('should render successfully', async () => {
    render(<CheckPoint footerText="Амжилттай үүсгэлээ." />);
  });
});
