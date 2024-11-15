import { AddEventComponent } from '@/components/AddEventComponent';
import { render } from '@testing-library/react';

describe('DialogComponent', () => {
  it('should render successfully', () => {
    render(<AddEventComponent />);
  });
});
