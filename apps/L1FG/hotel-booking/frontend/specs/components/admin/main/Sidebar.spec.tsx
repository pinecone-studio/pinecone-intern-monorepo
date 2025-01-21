import { Sidebar } from '@/features/admin/main/Sidebar';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Sidebar Component', () => {
  it('renders Sidebar successfully', () => {
    render(<Sidebar hotels="5" guests="3" />);
  });
});
