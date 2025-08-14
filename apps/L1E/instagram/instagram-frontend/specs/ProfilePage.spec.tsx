import "@testing-library/jest-dom"
import ProfilePage from '@/app/(main)/profile/page';
import { render, screen } from '@testing-library/react';

jest.mock('@/components/Profile', () => ({ 
  __esModule: true,
  default: ({ userName, bio }: any) => (
    <div>
      Mocked Profile: {userName} - {bio}
    </div>
  ),
}));

describe('ProfilePage', () => {
  it('renders Profile component with correct props', () => {
    render(<ProfilePage />);
    
    expect(screen.getByText(/Mocked Profile: Naraa0121 - Naraa_dev/i)).toBeInTheDocument();
  });
});
