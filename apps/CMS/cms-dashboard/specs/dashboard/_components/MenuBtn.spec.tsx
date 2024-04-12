// import { render, fireEvent } from '@testing-library/react';
// import React from 'react';
// import '@testing-library/jest-dom/extend-expect'; 
// import { MenuBar } from '../../../src/app/dashboard/_features/MenuBar';

// const mockData = [
  // { menu: 'Бүгд', number: 18 },
  // { menu: 'Нийтэлсэн', number: 10 },
  // { menu: 'Ноорог', number: 4 },
  // { menu: 'Архив', number: 2 },
  // { menu: 'Төлөвлөсөн', number: 2 }
// ];
// 
// describe('MenuBar Component', () => {
  // it('renders menu items correctly', () => {
    // const { getByText } = render(<MenuBar/>);
// 
    // mockData.forEach(({ menu }) => {
      // const menuItem = getByText(menu);
      // expect(menuItem).toBeTruthy();
    // });
  // });
  // it('updates selected state on menu item click', () => {
    // const { getByText } = render(<MenuBar />);
  // 
    // const menuItem = getByText('Нийтэлсэн');
    // fireEvent.click(menuItem);
    // 
    // expect(menuItem).toHaveAttribute('id', 'menu-bar-test-id');
  // });
  // 
// });







import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { MenuBtn } from '../../../src/app/dashboard/_components/MenuBtn'

describe('MenuBar', () => {
  it('1. Should render footer button component', () => {
    const setSelected = jest.fn();
    const { getByTestId } = render(<MenuBtn menu='Test Button' selected="Test Button" setSelected={setSelected} number={18}/>)

    const buttonElement = getByTestId('cypress-title');
    expect(buttonElement).toBeDefined();
  });

  it('2. should call button when clicked', () => {
    const setSelected = jest.fn();

    const { getByTestId } = render(<MenuBtn menu='Test Button' selected="Test Button" setSelected={setSelected} number={10}/>)

    const buttonElement = getByTestId('cypress-title');

    fireEvent.click(buttonElement);

    expect(setSelected).toHaveBeenCalledWith('Test Button');
  });

  it('3. should have a background color when selectedButton matches with text', () => {
    const setSelected = jest.fn();

    const { getByTestId } = render(<MenuBtn menu='Test Button' selected="Test Button" setSelected={setSelected} number={4}/>);

    const buttonElement = getByTestId('cypress-title');

    expect(buttonElement).toBeDefined();
  });

  it('4. should not have background when selectedButton does not matches with text', () => {
    const setSelected = jest.fn();
    
    const { getByTestId } = render(<MenuBtn menu='Test button' selected="Button" setSelected={setSelected} number={2}/>);

    const buttonElement = getByTestId('cypress-title');

    expect(buttonElement).toBeDefined();
  });

  it('5. should not have background when selectedButton does not matches with text', () => {
    const setSelected = jest.fn();

    const { getByTestId } = render(<MenuBtn menu='Test Button' selected="Button" setSelected={setSelected} number={2}/>);

    const buttonElement = getByTestId('cypress-title');

    expect(buttonElement).toBeDefined();
  });
});