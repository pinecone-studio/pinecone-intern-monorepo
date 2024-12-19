import Done from '../../../src/components/common/Done';
import { render, screen } from '@testing-library/react';

describe('Done page component', () => {
  it('should render successfully', () => {
    render(<Done />);
    expect(screen.getByText('Start Swiping!'));
  });
});
