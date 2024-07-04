import React from 'react';
import { render } from '@testing-library/react';
import { ArticlesButton } from '@/app/articles/_components';

describe('ArticleButton', () =>{
  it('should render assessment button component', () => {
    const { container } = render(<ArticlesButton text="hello test"/>);
    expect(container).toBeDefined();
  })
} )


