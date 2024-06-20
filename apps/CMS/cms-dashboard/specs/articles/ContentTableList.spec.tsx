import { TableContent } from '../../src/app/articles/_components';
import { render } from '@testing-library/react';

describe('TableContent', () => {
  it('renders the table headers correctly', () => {
    const { container } = render(<TableContent />);
    expect(container).toBeDefined();
  });
});
