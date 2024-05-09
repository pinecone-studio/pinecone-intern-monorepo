import { render } from '@testing-library/react';
import { ArchiveSuccessOverlay } from '@/app/dashboard/_components/ArchiveSuccessOverlay';

describe('Archive success overlay component test', () => {
  it('1. Should render Archive success overlay component', async () => {
    const { container } = render(<ArchiveSuccessOverlay title="test" />);

    expect(container).toBeDefined();
  });
});
