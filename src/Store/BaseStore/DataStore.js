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
    });
    this.dataParams = {
      page: 1,
      rpp: 10,
      searchQuery: null,
      sort: null,
    };
  }
  /*   getData = async () => {
    const fetchedData = await this.services.fetchVehicleModel(this.dataParams);
    runInAction(() => {
      this.data = fetchedData.item;
      this.totalPages = fetchedData.totalRecords;
    });
  }; */
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

  //Pagination
  //Sorting
  //Filter
}
export default DataStore;
