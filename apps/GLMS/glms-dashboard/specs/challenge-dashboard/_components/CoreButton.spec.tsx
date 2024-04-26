import React from 'react';
import { render } from '@testing-library/react';
import { Button } from '../../../src/app/challenge-dashboard/_components/CoreButton';

describe('CoreButton tests are here', () => {
  it('Should render assessment button component', () => {
    const { container } = render(<Button label="Click me" h={40} w={150} />);
    expect(container).toBeDefined();
  });

  it('Should render button with backgroundColor', () => {
    const buttonText = 'Click Me';
    const buttonColor = 'rgb(40, 40, 43)';

    const { getByText } = render(<Button label={buttonText} color={buttonColor} />);
    const buttonElement = getByText(buttonText);
    const styles = getComputedStyle(buttonElement);

    expect(styles.backgroundColor).toBe('rgb(40, 40, 43)');
  });

  it('Should render button with no backgroundColor', () => {
    const buttonText = 'Click Me';

    const { getByText } = render(<Button label={buttonText} />);
    const buttonElement = getByText(buttonText);
    const styles = getComputedStyle(buttonElement);

    expect(styles.backgroundColor).toBe('rgb(75, 72, 68)');
  });

  it('Should render button with fontSize', () => {
    const buttonText = 'Click Me';

    const { getByText } = render(<Button label={buttonText} fontSize={14} />);
    const buttonElement = getByText(buttonText);
    const styles = getComputedStyle(buttonElement);

    expect(styles.fontSize).toBe('14px');
  });

  it('Should render button with fontSize', () => {
    const buttonText = 'Click Me';

    const { getByText } = render(<Button label={buttonText} />);
    const buttonElement = getByText(buttonText);
    const styles = getComputedStyle(buttonElement);

    expect(styles.borderRadius).toBe('20px');
  });
});
