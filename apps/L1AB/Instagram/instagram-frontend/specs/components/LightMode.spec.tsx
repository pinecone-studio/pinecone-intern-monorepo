import { DarkMode } from '@/components/DarkMode';
import { MoreButton } from '@/components/MoreButton';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from 'next-themes';
import { AnimationControls } from 'framer-motion';

const mockSvgControls: AnimationControls = {
  start: jest.fn(),
  stop: jest.fn(),
  set: jest.fn(),
  mount: jest.fn(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }),
  subscribe: jest.fn(),
};

const sampleProps = {
  isOpen: true,
  svgControls: mockSvgControls,
};

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  Switch: ({ checked, onChange }: { checked: boolean; onChange: (_value: any) => void }) => {
    const handleClick = () => {
      if (checked)
        onChange({
          target: {
            checked: false,
          },
        });
      onChange({
        target: {
          checked: false,
        },
      });
    };

    return <button data-testid="switch" onClick={handleClick}></button>;
  },
}));

describe('DarkMode', () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  it('should interact with the MoreButton component', async () => {
    render(<MoreButton {...sampleProps} />);
    fireEvent.keyDown(screen.getByTestId('dropDownMenu'));
  });

  it('should render successfully and toggle theme on button click', async () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <DarkMode />
      </ThemeProvider>
    );
    fireEvent.keyDown(getByTestId('darkModeTrigger'), { key: 'Enter' });

    const darkBtn = getByTestId('dark');
    fireEvent.click(darkBtn);
    const lightBtn = getByTestId('light');
    fireEvent.click(lightBtn);
    const switchElement = screen.getByTestId('switch');
    fireEvent.click(switchElement);
  });
  it('should render successfully and toggle theme on button click', async () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <DarkMode />
      </ThemeProvider>
    );
    fireEvent.keyDown(getByTestId('darkModeTrigger'), { key: 'Enter' });

    const switchElement = screen.getByTestId('switch').parentNode;

    fireEvent.click(switchElement!);
  });
});
