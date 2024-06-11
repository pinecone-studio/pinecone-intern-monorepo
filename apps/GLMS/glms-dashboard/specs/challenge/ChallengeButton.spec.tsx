import { ChallengeButton } from '../../src/app/challenge/_components';
import React from 'react';
import { render } from '@testing-library/react';

describe('Challenge Button', () => {
  it('Should render challenge button component', () => {
    const { container } = render(<ChallengeButton text="hello test" />);
    expect(container).toBeDefined();
  });
});
