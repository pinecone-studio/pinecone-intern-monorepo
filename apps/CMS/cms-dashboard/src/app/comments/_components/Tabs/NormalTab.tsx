'use client';

import React from 'react';

type NormalTabProps = {
  onClick?: () => void;
};

const NormalTab: React.FC<NormalTabProps> = ({ onClick }) => {
  return (
    <button data-testid="normal-tab-test-id" onClick={onClick} className="btn">
      Бүгд
    </button>
  );
};

export default NormalTab;
