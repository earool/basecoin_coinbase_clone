import React from 'react';

function HeaderRow({ sortCriteria, sortDirection, handleSort, isAllAssets }) {
  const handleButtonClick = (criteria) => {
    if (
      isAllAssets &&
      (sortCriteria === 'price' || sortCriteria === 'change')
    ) {
      return;
    }
    handleSort(criteria);
  };

  const getSortSymbol = (criteria) => {
    if (criteria === sortCriteria) {
      return sortDirection === 'asc' ? ' ▲' : ' ▼';
    }
    return '';
  };

  return (
    <tr>
      <th>
        <button type="button" onClick={() => handleButtonClick('id')}>
          Name{getSortSymbol('id')}
        </button>
      </th>
      <th>
        <button
          type="button"
          disabled={isAllAssets}
          onClick={() => handleButtonClick('price')}
        >
          Price{getSortSymbol('price')}
        </button>
      </th>
      <th>
        <button
          type="button"
          disabled={isAllAssets}
          onClick={() => handleButtonClick('change')}
        >
          Change{getSortSymbol('change')}
        </button>
      </th>
      <th>
        <button type="button" onClick={() => handleButtonClick('market_cap')}>
          Market cap{getSortSymbol('market_cap')}
        </button>
      </th>
      <th aria-label="buy" />
      <th>
        <p className="text-center">Watch</p>
      </th>
    </tr>
  );
}

export default HeaderRow;
