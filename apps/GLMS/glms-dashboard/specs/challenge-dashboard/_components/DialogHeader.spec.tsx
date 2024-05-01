import React from 'react';
import { render, screen } from '@testing-library/react';
import { DialogHeader } from '../../../src/app/challenge-dashboard/_components/DialogHeader';

describe('DialogHeader', () => {
  const title = 'Dialog Title';
  const onCloseMock = jest.fn();

  beforeEach(() => {
    render(<DialogHeader title={title} onClose={onCloseMock} />);
  });

  it('renders the title correctly', () => {
    const titleElement = screen.getByText(title);
    expect(titleElement).toBeDefined()
    expect(titleElement.tagName).toBe('H1');
  });
});
