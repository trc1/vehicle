import { observer } from "mobx-react";
import Arrow from "../Icons/Arrow";
import "./Pagination.scss";
import { runInAction } from "mobx";

function Pagination({ tableData }) {
  return (
    <div className="pagination-wrapper">
      <div className="pagination-wrapper__paging">
        <button
          onClick={tableData.goToPrevPage}
          disabled={tableData.currentPage === 1}
        >
          <Arrow rotation={180} />
        </button>
        <span>
          Page {tableData.currentPage} / {tableData.totalPages}
        </span>
        <button
          onClick={tableData.goToNextPage}
          disabled={tableData.currentPage === tableData.totalPages}
        >
          <Arrow />
        </button>
      </div>
      <span className="pagination-wrapper__rpp">
        <select
          onChange={(e) => {
            runInAction(() => {
              tableData.setItemsPerPage(e.target.value);
              tableData.currentPage = 1;
            });
          }}
          value={tableData.dataParams.rpp}
        >
          {tableData.itemsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </span>
    </div>
  );
}

export default observer(Pagination);
