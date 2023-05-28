import React from 'react';

function Table({
  children,
  headerRow,
  dataRows,
  lowerTableComponent,
  placeholderRows,
  errorPara,
  isLoading,
  isSuccess,
  isError,
}) {
  let content;

  if (isLoading) {
    content = placeholderRows;
  } else if (isSuccess) {
    content = dataRows;
  } else if (isError) {
    content = errorPara;
  }

  return (
    <div className="sm:main-container">
      {children}
      <span className="fixed md:hidden bottom-1/2 left-0" />
      <table
        // onClick={handleTableClick}
        role="grid"
        className="w-full table-styling"
      >
        <thead className="hidden sm:table-header-group border-y-2 border-gray-border">
          {headerRow}
        </thead>
        <tbody>{content}</tbody>
        <tfoot>
          <tr>
            <td colSpan={3} className="w-full">
              {lowerTableComponent}
            </td>
          </tr>
        </tfoot>
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
