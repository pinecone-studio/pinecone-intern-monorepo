import React from 'react';
import { render } from '@testing-library/react';
import { UpdateButton } from '../../src/app/employee-details/_components';
describe('UpdateButton', () => {
  const handleMock = jest.fn();
  it('Should render update button component ', () => {
    const { container } = render(<UpdateButton onClick={handleMock} />);
    expect(container).toBeDefined();
  });
});
