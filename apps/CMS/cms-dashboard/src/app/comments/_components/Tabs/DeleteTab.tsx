'use client';

import React from 'react';

type DeleteTabProps = {
  onClick?: () => void;
};

const DeleteTab: React.FC<DeleteTabProps> = ({ onClick }) => {
  return (
    <button data-testid="delete-tab-test-id" onClick={onClick}>
      Устгасан
    </button>
  );
};

export default DeleteTab;
