export const getBigPreviousButtonIndex = ({ bigIndex, currentIndex }: { bigIndex: number; currentIndex: number }): boolean => {
  if (bigIndex == 0) {
    if (currentIndex <= 0) {
      return false;
    }
  }
  return true;
};
