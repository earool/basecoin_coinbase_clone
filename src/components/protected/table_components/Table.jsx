import React from 'react';

import Button from '../../UI/Button';

function Table({ children }) {
  const handleTableClick = (e) => {
    if (e.target.tagName === 'TD') {
      const row = e.target.closest('tr');
      const cells = row.getElementsByTagName('td');
      const name = cells[0].innerText;
      console.log(name);
    }
  };

  const buyHandler = () => {
    console.log('buy');
  };

  return (
    <div className="sm:main-container">
      {children}
      <table
        onClick={handleTableClick}
        role="grid"
        className="w-full table-styling"
      >
        <thead className="hidden sm:table-header-group border-y-2 border-gray-border">
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Change</th>
            <th>Market cap</th>
            <th aria-label="buy column" />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>bitcon</td>
            <td>$ 50K</td>
            <td>+4%</td>
            <td>50 TB</td>
            <td>
              <Button
                aria-label="Buy"
                color="blue"
                ifFull={false}
                onClick={buyHandler}
              >
                Buy
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;
