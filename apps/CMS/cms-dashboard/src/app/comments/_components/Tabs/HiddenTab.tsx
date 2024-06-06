'use client';

import React from 'react';

type HiddenTabProps = {
  onClick?: () => void;
};

const HiddenTab: React.FC<HiddenTabProps> = ({ onClick }) => {
  return (
    <button data-testid="hidden-tab-test-id" onClick={onClick}>
      Нуух
    </button>
  );
};

export default HiddenTab;
