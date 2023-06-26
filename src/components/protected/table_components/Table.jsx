import React from 'react';

function Table({
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
    <table role="grid" className="w-full table-styling">
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
  );
}

export default Table;
