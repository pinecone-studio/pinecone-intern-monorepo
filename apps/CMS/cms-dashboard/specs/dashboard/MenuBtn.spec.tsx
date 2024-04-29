import { render} from '@testing-library/react';
import React from 'react';
import { MenuBtn } from '../../src/app/dashboard/_components/MenuBtn'
 
describe('MenuBar', () => {
  it('1. Should render menu button component', async () => {
    const { getByTestId } = render(<MenuBtn statusName='Test' status="Test Button" number={18}/>)
 
    const title = getByTestId('title-test-id');
    const numberElement = getByTestId('number-test-id');
    const divider = getByTestId('divider-test-id');
 
    expect(title).toBeDefined();
    expect(numberElement).toBeDefined();
    expect(divider).toBeDefined();
  });
 
  it('should render menu button component with provided props', () => {
    const statusName = 'Test';
    const status = 'Test';
    const number = 18;
    const { getByTestId } = render(<MenuBtn statusName={statusName} status={status} number={number}/>);
 
    const title = getByTestId('title-test-id');
    const numberElement = getByTestId('number-test-id');
    const divider = getByTestId('divider-test-id');
 
    expect(title).toBeDefined();
    expect(numberElement).toBeDefined();
    expect(divider).toBeDefined();
  });
});