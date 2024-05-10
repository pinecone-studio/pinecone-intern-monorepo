import React from 'react';
import CheckIcon from '../../../../assets/icons/CheckIcon';
const ModalLogo = () => {
  return (
    <div data-testid="modal-logo" className=" relative">
      <div className=" w-12 h-12 bg-[#16A94A] rounded-xl rotate-[15deg] left-3 absolute"></div>
      <div className=" w-12 h-12 bg-[#16A94A] rounded-xl  p-3 justify-center items-center backdrop-blur-md absolute top-3  z-10 bg-gradient-to-b from-green-500 to-white : opacity-90">
        <CheckIcon />
      </div>
    </div>
  );
};

export default ModalLogo;
