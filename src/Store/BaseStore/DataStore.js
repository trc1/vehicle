import { makeObservable, observable, action, runInAction } from 'mobx';

class DataStore {
  data = [];
  totalPages = null;
  dataParams = {};
  constructor() {
    makeObservable(this, {
      data: observable,
      totalPages: observable,
      getData: action,
    });
    this.dataParams = {
      page: 1,
      rpp: 10,
      searchQuery: null,
      sort: null,
    };
  }
  getData = async (method) => {
    const fetchedData = await this.services[method](this.dataParams);
    runInAction(() => {
      this.data = fetchedData.item;
      this.totalPages = fetchedData.totalRecords;
    });
  };

  //Pagination
  //Sorting
  //Filter
}
export default DataStore;
