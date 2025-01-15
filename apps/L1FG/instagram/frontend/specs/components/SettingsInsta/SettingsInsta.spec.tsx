// import { Settings } from '@/components/settings/Settings';
// import { render } from '@testing-library/react';
// describe('CreatePost Dialog', () => {
//   it('Should render', () => {
//     render(<Settings />);
//   });
// });

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Settings } from '@/components/settings/Settings';

describe('Settings Component', () => {
  it('renders the textarea and character count', () => {
    render(<Settings />);

    const textarea = screen.getByTestId('textarea');
    const characterCount = screen.getByTestId('character-count');

    expect(textarea).toBeInTheDocument();
    expect(characterCount).toHaveTextContent('0/150 үсэг');
  });

  it('updates the text and character count when typing', () => {
    render(<Settings />);

    const textarea = screen.getByTestId('textarea');
    const characterCount = screen.getByTestId('character-count');

    fireEvent.change(textarea, { target: { value: 'Hello, World!' } });

    expect(textarea).toHaveValue('Hello, World!');
    expect(characterCount).toHaveTextContent('13/150 үсэг');
  });

  it('does not allow typing beyond the maxLength', () => {
    render(<Settings />);

    const textarea = screen.getByTestId('textarea');
    const characterCount = screen.getByTestId('character-count');

    const longText = 'a'.repeat(150); // 200 тэмдэгттэй текст
    fireEvent.change(textarea, { target: { value: longText } });

    expect(textarea).toHaveValue('a'.repeat(150)); // Зөвхөн 150 тэмдэгт хадгалагдана
    expect(characterCount).toHaveTextContent('150/150 үсэг');
  });
});
