import React from 'react';
import { render, screen } from '@testing-library/react';
import { Notification } from '@/app/_features/Notification';


describe('Notification component', () => {
  it('renders notification title', () => {
    render(<Notification />);
    const title = screen.getByText('Мэдэгдэл');
    expect(title).toBeTruthy();
  });

  it('renders all notifications with correct text and status', () => {
    render(<Notification />);

    expect(screen.getByText('#32193 Таны захиалсан хоол бэлтгэгдлээ.')).toBeTruthy();
    expect(screen.getByText('Хүлээгдэж буй')).toBeTruthy();

    expect(screen.getByText('#32193 Таны захиалга хийгдэж эхэллээ.')).toBeTruthy();
    expect(screen.getByText('Бэлтгэгдэж буй')).toBeTruthy();

    expect(screen.getByText('#33998 Таны захиалга бэлтгэгдэх дууслаа.')).toBeTruthy();
    expect(screen.getAllByText('Амжилттай')[0]).toBeTruthy();

    expect(screen.getByText('#34021 Таны захиалга амжилттай хүргэгдлээ.')).toBeTruthy();
    expect(screen.getAllByText('Амжилттай')[1]).toBeTruthy();
  });

  it('renders correct number of notification cards', () => {
    render(<Notification />);
    const cards = screen.getAllByText(/#\d+/); // match lines like "#32193 ..."
    expect(cards.length).toBe(4);
  });
});
