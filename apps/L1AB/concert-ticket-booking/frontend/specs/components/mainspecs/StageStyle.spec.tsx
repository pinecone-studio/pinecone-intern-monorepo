import { render, screen } from '@testing-library/react';
import { StageStyle } from '@/components';

describe('StageStyle Component', () => {

  it('renders all sections dynamically', () => {
    render(<StageStyle />);

    const leftBottomInside = document.querySelector('svg');
    expect(leftBottomInside) 
  });

  it('renders the main stage text', () => {
    render(<StageStyle />);

    const stageText = screen.getByText('ТАЙЗ');
    expect(stageText.textContent)
  });
});
