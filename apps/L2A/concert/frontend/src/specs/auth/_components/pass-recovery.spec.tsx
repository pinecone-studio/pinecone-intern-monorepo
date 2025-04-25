import { PassRecovery } from '@/app/auth/_components/PassRecovery';
import { render } from '@testing-library/react';

describe('render passrecovery.tsx', () => {
  it('render passrecovery component', () => {
    render(<PassRecovery />);
  });
});
