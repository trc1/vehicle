import { makeObservable, observable, action, runInAction } from "mobx";

class FormStore {
  formData = {};
  editedFormData = {};
  modal = false;
  selectedItem = null;
  constructor() {
    makeObservable(this, {
      formData: observable,
      editedFormData: observable,
      modal: observable,
      selectedItem: observable,
      getFormData: action,
      getEditedFormData: action,
      createNewData: action,
      deleteData: action,
      handleSelect: action,
      handleSort: action,
    });
  }

  async getFormData(inputKey, inputValue) {
    this.formData[inputKey] = inputValue;
  }
  async getEditedFormData(inputKey, inputValue) {
    this.editedFormData[inputKey] = inputValue;
  }

  async createNewData() {
    const data = this.formData;
    try {
      await this.services.add(data);
      this.formData = {};
    } catch (error) {
      console.error("Error creating new data:", error);
      throw error;
    }
  }

  async deleteData(data) {
    try {
      await this.services.delete(data);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  }
  async updateData(id) {
    const data = this.editedFormData;
    try {
      // Call updateDataService asynchronously using await
      await this.services.update(id, data);
      // Reset inputUpdateValues after submission
      this.editedFormData = {};
      runInAction(() => {
        this.modal = false;
      });
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  }

  handleSelect = (item, value, tableData) => {
    if (item.toLowerCase() === "makeid") {
      // Get the selected make object
      const selectedMake = tableData.data.find((make) => make.id === value);
      const { id, name, abrv } = selectedMake;
      this.getFormData("makeId", id);
      /*       this.getFormData("make", name);
      this.getFormData("make-abrv", abrv); */
    } else {
      this.getFormData(item, value);
    }
  };

  resetForm = (inputs) => {
    // Reset all input fields to empty values
    inputs.forEach((item) => {
      document.getElementsByName(item)[0].value = ""; // Reset input value to empty string
    });
  };

  handleSort = (header, dataStore) => {
    const newSortBy = header.toLowerCase();
    dataStore.setSortOrder((dataStore.sortBy = newSortBy));
    dataStore.dataParams.sort = `${newSortBy}|${dataStore.sortOrder}`;
    dataStore.getData();
  };

  extractHeaders(data, headers) {
    if (!data || data.length === 0 || !headers) return [];
    const dataObject = data[0];
    return Object.keys(dataObject).filter((header) => headers.includes(header));
  }

  openModal(item) {
    runInAction(() => {
      this.modal = true;
      this.selectedItem = item;
      this.editedFormData = this.selectedItem;
    });
  }

  closeModal() {
    runInAction(() => {
      this.modal = false;
    });
  }
}
export default FormStore;
