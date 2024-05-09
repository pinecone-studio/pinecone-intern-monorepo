import React from 'react';
import PropTypes from 'prop-types';
import { Pen } from '../../asset/icons/Pen';

type UpdateButtonProps = {
  onClick: () => void;
};
export const UpdateButton = ({ onClick }: UpdateButtonProps) => {
  return (
    <button className="flex bg-[#1C20240A] px-1 py-2 items-center gap-2 rounded-lg" onClick={onClick} data-testid="update-button">
      <Pen />
      <p>Засварлах</p>
    </button>
  );
};

UpdateButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
