import { render } from '@testing-library/react';
import React from 'react';
import { MenuAllBtn } from '../../src/app/dashboard/_components/MenuAllBtn'
 
describe('MenuBar', () => {
  it('1. Should render menu button component', async () => {
    const { getByTestId } = render(<MenuAllBtn statusName='Test' status="Test Button" number={18}/>)
 
    const title = getByTestId('title-test-id');
    const number = getByTestId('number-test-id');
    expect(title).toBeDefined();
    expect(number).toBeDefined();
  });
 
  it('should render menu button component with provided props', () => {
    const statusName = 'Test';
    const status = 'Test';
    const number = 18;
    const { getByTestId } = render(<MenuAllBtn statusName={statusName} status={status} number={number}/>);
 
    const title = getByTestId('title-test-id');
    const numberElement = getByTestId('number-test-id');
    const divider = getByTestId('divider-test-id');
 
    expect(title).toBeDefined();
    expect(numberElement).toBeDefined();
    expect(divider).toBeDefined();
  });
});