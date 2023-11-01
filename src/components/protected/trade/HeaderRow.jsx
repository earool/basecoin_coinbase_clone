import React from 'react';

function HeaderRow({ sortCriteria, sortDirection, handleSort }) {
  const handleButtonClick = (criteria) => {
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
        <button type="button">Name</button>
      </th>
      <th>
        <button type="button" onClick={() => handleButtonClick('price')}>
          Price{getSortSymbol('price')}
        </button>
      </th>
      <th>
        <button type="button" onClick={() => handleButtonClick('change')}>
          Change{getSortSymbol('change')}
        </button>
      </th>
      <th>
        <button
          className="min-w-[100px]"
          type="button"
          onClick={() => handleButtonClick('marketCap')}
        >
          Market cap{getSortSymbol('marketCap')}
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
