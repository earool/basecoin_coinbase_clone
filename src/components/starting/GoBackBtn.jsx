import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as LeftArrow } from '../../assets/icons/others/left_arrow.svg';

function GoBackButton() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('..');
  };

  return (
    <button
      type="button"
      onClick={goBack}
      className="bg-gray-border rounded-3xl p-2 mr-5 mt-2"
    >
      <div>
        <LeftArrow />
      </div>
    </button>
  );
}

export default GoBackButton;
