import React from 'react';

function Table({
  children,
  headerRow,
  dataRows,
  placeholderRows,
  isLoading,
  isSuccess,
}) {
  let content;

  if (isLoading) {
    content = placeholderRows;
  }

  if (isSuccess) {
    content = dataRows;
  }

  return (
    <div className="sm:main-container">
      {children}
      <table
        // onClick={handleTableClick}
        role="grid"
        className="w-full table-styling"
      >
        <thead className="hidden sm:table-header-group border-y-2 border-gray-border">
          {headerRow}
        </thead>
        <tbody>{content}</tbody>
      </table>
    </div>
  );
}

export default Table;

// const handleTableClick = (e) => {
//   if (e.target.tagName === 'TD') {
//     const row = e.target.closest('tr');
//     const cells = row.getElementsByTagName('td');
//     const name = cells[0].innerText;
//     console.log(name);
//   }
// };

// const buyHandler = () => {
//   console.log('buy');
// };
