import { makeObservable, observable, action, runInAction } from "mobx";

class DataStore {
  data = [];
  totalPages = null;
  dataParams = {};
  currentPage = 1;
  itemsPerPageOptions = [5, 10, 20];
  loading = false;
  constructor() {
    makeObservable(this, {
      data: observable,
      totalPages: observable,
      currentPage: observable,
      loading: observable,
      getData: action,
      setSortOrder: action,
      setTableFilter: action,
      setCurrentPage: action,
      setItemsPerPage: action,
    });
    this.dataParams = {
      page: 1,
      rpp: 10,
      searchQuery: null,
      sort: null,
    };
    this.sortOrder = "asc";
    this.sortBy = "";
  }

  getData = async () => {
    try {
      const fetchedData = await this.services.fetchData(this.dataParams);
      runInAction(() => {
        this.data = fetchedData.item;
        this.totalPages = Math.ceil(
          fetchedData.totalRecords / this.dataParams.rpp
        );
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  setSortOrder(newSort) {
    if (this.sortBy !== newSort) {
      this.sortOrder = "asc";
    } else {
      if (this.sortOrder === "asc") {
        this.sortOrder = "desc";
      } else this.sortOrder = "asc";
    }
    this.dataParams.page = 1;
    this.currentPage = 1;
  }
  setTableFilter(text) {
    let textCombined = text.replace(/[^a-zA-Z0-9\s]+/g, "");
    if (textCombined === "") {
      if (text === "") {
        this.dataParams.page = 1;
        this.dataParams.searchQuery = null;
        this.getData();
      } else {
        return null;
      }
    } else {
      this.dataParams.page = 1;
      this.dataParams.searchQuery = textCombined;
      this.getData();
    }
  }

  setCurrentPage(pageNumber) {
    if (this.totalPages !== 0) {
      if (pageNumber < 1) {
        pageNumber = 1;
      } else if (pageNumber > this.totalPages) {
        pageNumber = this.totalPages;
      }
      this.dataParams.page = pageNumber;
      this.currentPage = pageNumber;
      this.getData();
    } else {
      return null;
    }
  }

  goToPrevPage = () => {
    this.setCurrentPage(this.dataParams.page - 1);
  };

  goToNextPage = () => {
    this.setCurrentPage(this.dataParams.page + 1);
  };

  setItemsPerPage(itemsPerPage) {
    this.dataParams.rpp = itemsPerPage;
    this.dataParams.page = 1;
    this.getData();
  }
}
export default DataStore;
