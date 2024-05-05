import React from 'react';
import { render } from '@testing-library/react';
import CommentsButton from '../../src/app/comments/_components/CommentsButton';

describe('CommentsButton', () => {
  it('renders button with label', () => {
    const { getByText } = render(<CommentsButton label="Test Button" />);
    expect(getByText('Test Button')).toBeDefined();
  });

});
  it('Should render profile button component', () => {
    const { container } = render(<CommentsButton label="Test Label" />);
    expect(container).toBeDefined();
  });

describe('Button', () => {
    it('Shuold render button', () => {
      const { container } = render(<CommentsButton label="Test Button" />);
      expect(container).toBeDefined();
    });
  
    it('Should render button classname', () => {
      const { container } = render(<CommentsButton label="Test Button" btnType="primary" disabled />);
    expect(container).toBeDefined();
  });
});
  
