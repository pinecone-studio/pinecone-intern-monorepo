/* eslint-disable complexity */
import type React from 'react';

type Point = { x: number; y: number };

export const handleStart = (_clientX: number, _clientY: number, setIsDragging: React.Dispatch<React.SetStateAction<boolean>>, setStartPos: React.Dispatch<React.SetStateAction<Point>>) => {
  setIsDragging(true);
  setStartPos({ x: _clientX, y: _clientY });
};

export const handleMove = (
  _clientX: number,
  _clientY: number,
  isDragging: boolean,
  startPos: Point,
  setDragOffset: React.Dispatch<React.SetStateAction<Point>>,
  cardRef: React.RefObject<HTMLDivElement>,
  setIsHidden: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (!isDragging) return;

  const deltaX = _clientX - startPos.x;
  const deltaY = _clientY - startPos.y;

  setDragOffset({ x: deltaX, y: deltaY });

  if (cardRef.current) {
    const cardWidth = cardRef.current.offsetWidth;
    const threshold = cardWidth * 3;
    if (Math.abs(deltaX) > threshold) {
      setIsHidden(true);
    }
  }
};

export const handleEnd = (
  isDragging: boolean,
  dragOffset: Point,
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>,
  setDragOffset: React.Dispatch<React.SetStateAction<Point>>,
  setIsHidden: React.Dispatch<React.SetStateAction<boolean>>,
  handleLike: () => void,
  handleDislike: () => void
) => {
  if (!isDragging) return;

  setIsDragging(false);

  const threshold = 100;
  if (Math.abs(dragOffset.x) > threshold) {
    const direction = dragOffset.x > 0 ? 'right' : 'left';
    const finalX = direction === 'right' ? 1000 : -1000;

    setDragOffset({ x: finalX, y: dragOffset.y });
    setIsHidden(true);

    setTimeout(() => {
      if (direction === 'right') {
        handleLike();
      } else {
        handleDislike();
      }
    }, 200);
  } else {
    setIsHidden(false);
    setDragOffset({ x: 0, y: 0 });
  }
};

export const handleMouseMove = (e: MouseEvent, handleMoveFn: (_clientX: number, _clientY: number) => void) => {
  handleMoveFn(e.clientX, e.clientY);
};

export const handleMouseUp = (handleEndFn: () => void) => {
  handleEndFn();
};
