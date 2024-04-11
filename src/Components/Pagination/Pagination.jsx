import { observer } from "mobx-react";

function Pagination({ tableData }) {
  return (
    <div>
      <button
        onClick={tableData.goToPrevPage}
        disabled={tableData.currentPage === 1}
      >
        Prev
      </button>
      <span>
        Page {tableData.currentPage} / {tableData.totalPages}
      </span>
      <button
        onClick={tableData.goToNextPage}
        disabled={tableData.currentPage === tableData.totalPages}
      >
        Next
      </button>
      <select
        onChange={(e) => tableData.setItemsPerPage(e.target.value)}
        value={tableData.dataParams.rpp}
      >
        {tableData.itemsPerPageOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default observer(Pagination);
