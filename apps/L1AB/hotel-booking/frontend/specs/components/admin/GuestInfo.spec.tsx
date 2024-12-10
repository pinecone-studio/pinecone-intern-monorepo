import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { GuestInfo } from '@/components/admin';

jest.mock('@/components/admin/assets', () => ({
  DetailsContainer: ({ children }: { children: React.ReactNode }) => <div data-testid="DetailsContainer">{children}</div>,
  DetailsLeft: ({ children }: { children: React.ReactNode }) => <div data-testid="DetailsLeft">{children}</div>,
  DetailsRight: ({ children }: { children: React.ReactNode }) => <div data-testid="DetailsRight">{children}</div>,
  DetailsCard: ({ children }: { children: React.ReactNode }) => <div data-testid="DetailsCard">{children}</div>,
}));
  
describe("Admin Guest Info", () => {
    it("should render the admin guest info", () => {
        render(<GuestInfo />)
    })
})