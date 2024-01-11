import React from 'react';

import { ReactComponent as LeftArrow } from '../../../assets/icons/others/left_arrow.svg';

function PopoutHeader({ onClose, title }) {
  return (
    <div className="pb-4 flex items-center relative justify-center">
      <button
        className="w-6 h-6 absolute left-0"
        type="button"
        onClick={onClose}
      >
        <LeftArrow />
      </button>
      <h2 className="text-center font-medium text-[18px]">{title}</h2>
    </div>
  );
}

export default PopoutHeader;
