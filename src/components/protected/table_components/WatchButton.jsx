import React from 'react';
import { useDispatch } from 'react-redux';

import { toggleCoinInWatchlist } from '../../../store/userSlice';
import { ReactComponent as Star } from '../../../assets/icons/others/star.svg';

function WatchButton({ coinId }) {
  const dispatch = useDispatch();

  const toggleWatchlistHandler = () => {
    dispatch(toggleCoinInWatchlist(coinId));
  };

  return (
    <button
      className="m-auto text-white w-5 cursor-pointer flex items-center"
      type="button"
      onClick={toggleWatchlistHandler}
    >
      <Star className="stroke-gray-border-darker hover:stroke-my-blue hover:text-my-blue" />
    </button>
  );
}

export default WatchButton;
