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

  getData = async () => {
    try {
      const fetchedData = await this.services.fetchData(this.dataParams);
      console.log('Getdata', fetchedData);
      runInAction(() => {
        this.data = fetchedData.item;
        this.totalPages = fetchedData.totalRecords;
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  /*   async getPages() {
    let numOfDocs = await this.services.fetchNumOfRecords(
      this.dataParams.searchQuery
    );
    debugger;
    console.log(numOfDocs, 'nummm2');
    this.totalPages = Math.ceil(numOfDocs / this.tableParams.rpp);
    console.log(this.totalPages, 'total');
    //Create array of numbers up to number of total pages excluding 0, for display in UI
    runInAction(() => {
      this.pagesArray = [...Array(this.totalPages + 1).keys()].slice(1);
      this.displayPages = [];
      for (let i = 0; i < this.pagesArray.length; i++) {
        if (this.displayPages.length < this.displayPagesLimit) {
          this.displayPages.push(this.pagesArray[i]);
        }
      }
    });
  } */
  //Pagination
  //Sorting
  //Filter
}
export default DataStore;
