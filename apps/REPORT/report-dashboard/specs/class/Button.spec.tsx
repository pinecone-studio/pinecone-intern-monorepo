// ClassCard.test.js
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from '../../src/components/ui/button';

describe('ClassCard component', () => {
  test('Shadcn Button test', () => {
    const { getByText } = render(<Button asChild={true}>test</Button>);
  });
});
