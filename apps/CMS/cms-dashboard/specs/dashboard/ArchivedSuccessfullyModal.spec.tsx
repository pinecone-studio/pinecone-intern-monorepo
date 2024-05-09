import { ArchivedSuccessfullyModal } from '@/app/dashboard/_components/ArchivedSuccessfullyModal';
import { render } from '@testing-library/react';

describe('Archive success overlay component test', () => {
  it('1. Should render Archive success overlay component', async () => {
    const { container } = render(<ArchivedSuccessfullyModal title="test" />);

    expect(container).toBeDefined();
  });
});
