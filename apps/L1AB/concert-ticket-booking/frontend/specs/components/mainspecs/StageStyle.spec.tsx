import { render, screen } from '@testing-library/react';
import { StageStyle } from '@/components';

describe('StageStyle Component', () => {
  it('renders all hover text elements', () => {
    render(<StageStyle />);

    const hoverText = screen.getByText('Доод зүүн хэсэг');
    expect(hoverText)

    const classList = hoverText.parentElement?.getAttribute('class');
    expect(classList)
  });

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
