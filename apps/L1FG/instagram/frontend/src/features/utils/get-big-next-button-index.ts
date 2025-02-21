export const getBigNextButtonIndex = ({ bigIndex, currentIndex, trayLength, storiesLength }: { bigIndex: number; currentIndex: number; trayLength: number; storiesLength: number }): boolean => {
  if (bigIndex == trayLength - 1) {
    if (currentIndex == storiesLength - 1) {
      return false;
    }
  }
  return true;
};
