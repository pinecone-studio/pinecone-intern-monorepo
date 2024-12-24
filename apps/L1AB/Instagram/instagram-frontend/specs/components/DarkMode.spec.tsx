import { DarkMode } from '@/components/DarkMode';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from 'next-themes';

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  Switch: ({ checked, onChange }: { checked: boolean; onChange: (_value: any) => void }) => {
    const handleClick = () => {
      if (checked)
        onChange({
          target: {
            checked: true,
          },
        });
      onChange({
        target: {
          checked: true,
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
