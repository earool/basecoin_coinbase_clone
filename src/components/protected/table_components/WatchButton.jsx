import React from 'react';

import { ReactComponent as Star } from '../../../assets/icons/others/star.svg';

function WatchButton() {
  const addToWatchlistHandler = () => {
    console.log('x');
  };

  return (
    <button
      className="m-auto text-white w-5 cursor-pointer flex items-center"
      type="button"
      onClick={addToWatchlistHandler}
    >
      <Star className="stroke-gray-border-darker hover:stroke-my-blue hover:text-my-blue" />
    </button>
  );
}

export default WatchButton;
