import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { PaginationBar } from '../../src/app/profile/_components/PaginationBar';

describe('PaginationBar component', () => {
  test('clicking previous button calls pageFunc and initFunc with decremented values', () => {
    const pageFuncMock = jest.fn();
    const initFuncMock = jest.fn();
    const pageNum = 20;
    const pageNumInit = 200;

    const { getByText } = render(<PaginationBar pageFunc={pageFuncMock} pageNum={pageNum} initFunc={initFuncMock} pageNumInit={pageNumInit} />);

    const previousButton = getByText('Өмнөх');
    fireEvent.click(previousButton);

    expect(pageFuncMock).toHaveBeenCalledWith(pageNum - 10);
    expect(initFuncMock).toHaveBeenCalledWith(pageNumInit - 10);
  });

  test('clicking next button calls pageFunc and initFunc with incremented values', () => {
    const pageFuncMock = jest.fn();
    const initFuncMock = jest.fn();
    const pageNum = 20;
    const pageNumInit = 200;

    const { getByText } = render(<PaginationBar pageFunc={pageFuncMock} pageNum={pageNum} initFunc={initFuncMock} pageNumInit={pageNumInit} />);

    const nextButton = getByText('Дараах');
    fireEvent.click(nextButton);

    expect(pageFuncMock).toHaveBeenCalledWith(pageNum + 10);
    expect(initFuncMock).toHaveBeenCalledWith(pageNumInit + 10);
  });

  test('clicking previous button does not call pageFunc and initFunc if pageNum <= 10', () => {
    const pageFuncMock = jest.fn();
    const initFuncMock = jest.fn();
    const pageNum = 10;
    const pageNumInit = 100;

    const { getByText } = render(<PaginationBar pageFunc={pageFuncMock} pageNum={pageNum} initFunc={initFuncMock} pageNumInit={pageNumInit} />);

    const previousButton = getByText('Өмнөх');
    fireEvent.click(previousButton);

    expect(pageFuncMock).not.toHaveBeenCalled();
    expect(initFuncMock).not.toHaveBeenCalled();
  });
});
