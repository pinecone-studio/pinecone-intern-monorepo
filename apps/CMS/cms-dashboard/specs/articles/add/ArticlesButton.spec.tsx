import React from 'react';
import { render } from '@testing-library/react';
import { ArticlesButton } from '@/app/articles/_components/add/ArticlesButton';

describe('ArticlesButton', () => {
  it('should render the ArticlesButton component', () => {
    const { container } = render(<ArticlesButton able={false} addClass="test-class" text="Publish" typeText="submit" dataCy="test-button" />);
    expect(container).toBeDefined();
  });
});
