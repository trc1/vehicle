import { makeObservable, observable, action, runInAction } from 'mobx';

class DataStore {
  data = [];
  totalPages = null;
  dataParams = {};
  name = '';
  constructor() {
    makeObservable(this, {
      data: observable,
      name: observable,
      totalPages: observable,
      getData: action,
      setName: action,
      setSortOrder: action,
      setTableFilter: action,
    });
    this.dataParams = {
      page: 1,
      rpp: 10,
      searchQuery: null,
      sort: null,
    };
    this.sortOrder = 'asc';
    this.sortBy = '';
  }

  getData = async () => {
    if (!this.services) {
      throw new Error('No services defined for data fetching.');
    }

    if (this.name === 'VehicleMake') {
      const fetchedData = await this.services.fetchVehicleMakes(
        this.dataParams
      );
      runInAction(() => {
        this.data = fetchedData.item;
        this.totalPages = fetchedData.totalRecords;
      });
    } else if (this.name === 'VehicleModel') {
      const fetchedData = await this.services.fetchVehicleModels(
        this.dataParams
      );
      runInAction(() => {
        this.data = fetchedData.item;
        this.totalPages = fetchedData.totalRecords;
      });
    } else {
      throw new Error(`Unsupported name: '${this.name}'.`);
    }
  };

  setName(newName) {
    this.name = newName;
  }
  setSortOrder(newSort) {
    if (this.sortBy !== newSort) {
      this.sortOrder = 'asc';
    } else {
      if (this.sortOrder === 'asc') {
        this.sortOrder = 'desc';
      } else this.sortOrder = 'asc';
    }
  }
  setTableFilter(text) {
    let textCombined = text.replace(/[^a-zA-Z0-9\s]+/g, '');
    if (textCombined === '') {
      if (text === '') {
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
  //Pagination
}
export default DataStore;
