import React from 'react';
import { useDispatch } from 'react-redux';

import { toggleCoinInWatchlist } from '../../../store/userSlice';
import { ReactComponent as Star } from '../../../assets/icons/others/star.svg';

function WatchButton({ coinId, isWatched }) {
  const dispatch = useDispatch();
  const styleClass = isWatched
    ? 'stroke-my-blue text-my-blue'
    : 'stroke-gray-border-darker';

  const toggleWatchlistHandler = () => {
    dispatch(toggleCoinInWatchlist(coinId));
  };

  return (
    <button
      className="m-auto text-white w-5 cursor-pointer flex items-center"
      type="button"
      onClick={toggleWatchlistHandler}
    >
      <Star className={styleClass} />
    </button>
  );
}

export default WatchButton;
