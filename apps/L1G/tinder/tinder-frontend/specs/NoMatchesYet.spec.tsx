import { NoMatchesYet } from '@/components/NoMatchesYet';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('lucide-react', () => ({
  HeartOff: jest.fn((props) => <div data-testid={props['data-testid']} />),
}));

describe('Container Component', () => {
  test('renders without error', () => {
    expect(() => render(<NoMatchesYet />)).not.toThrow();
  });

  test('renders with custom props without error', () => {
    expect(() => render(<NoMatchesYet heading="Test" subtext="Test subtext" />)).not.toThrow();
  });
});
