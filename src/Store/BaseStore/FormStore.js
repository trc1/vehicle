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
    try {
      // Check if formData is empty
      if (Object.keys(this.formData).length === 0) {
        alert("Form data is empty. Cannot submit.");
        return; // Prevent submission if formData is empty
      }

      await this.services.addData(this.formData);
      runInAction(() => {
        this.formData = {};
      });
    } catch (error) {
      console.error("Error creating new data:", error);
      throw error;
    }
  }

  async deleteData(data) {
    try {
      await this.services.deleteData(data);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  }
  async updateData(resource) {
    const data = {
      id: resource,
      data: this.editedFormData,
    };
    try {
      // Call updateDataService asynchronously using await
      await this.services.updateData(data.id, data.data);
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

  handleSort = (header, dataStore) => {
    const newSortBy = header.toLowerCase();
    dataStore.setSortOrder((dataStore.sortBy = newSortBy));
    dataStore.dataParams.sort = `${newSortBy}|${dataStore.sortOrder}`;
    dataStore.getData();
  };

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
