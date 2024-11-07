import QuantityControl from '@/components/QuantityControl';
import { fireEvent, render, screen } from '@testing-library/react';

describe(`QuantityControl`, () => {
  let setCountMock: jest.Mock;

  beforeEach(() => {
    setCountMock = jest.fn();
  });

  it('эхний тоог харуулдаг', () => {
    render(<QuantityControl count={2} setCount={setCountMock} />);
    expect(screen.getByText('2'));
  });
  it('"+" товч дарагдахад тоо нэмэгдэж байгааг шалгах ', () => {
    render(<QuantityControl count={3} setCount={setCountMock} />);
    fireEvent.click(screen.getByText('+'));
  });

  it('"-" товч дарагдахад тоо багасаж байгааг шалгах (тоо нь нэгээс их үед)', () => {
    render(<QuantityControl count={2} setCount={setCountMock} />);
    fireEvent.click(screen.getByText('-'));
    expect(setCountMock);
  });
  it('тоо нь нэгээс доош буухгүй байхыг шалгах ', () => {
    render(<QuantityControl count={1} setCount={setCountMock} />);
    fireEvent.click(screen.getByText('-'));
    expect(setCountMock);
  });
});
