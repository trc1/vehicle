import { observer } from "mobx-react";
import Search from "../Icons/Search";
import "./SearchForm.scss";

function SearchForm({ tableData }) {
  return (
    <div className="search-wrapper">
      <Search />
      <input
        type="text"
        placeholder="Search here..."
        onChange={(e) => tableData.setTableFilter(e.target.value)}
      />
    </div>
  );
}

export default observer(SearchForm);
