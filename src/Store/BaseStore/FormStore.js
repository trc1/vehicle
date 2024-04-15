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
      validateForm: action,
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
  validateForm = (inputs) => {
    const requiredFields = inputs.filter(
      (item) => item.toLowerCase() !== "makeid"
    );
    for (const field of requiredFields) {
      if (!this.formData[field]) {
        alert(`${field} is required.`);
        return false;
      }
    }
    return true;
  };

  handleSelect = (item, value, tableData) => {
    if (item.toLowerCase() === "makeid") {
      // Get the selected make object
      const selectedMake = tableData.data.find((make) => make.id === value);
      const { id } = selectedMake;
      this.getFormData("makeId", id);
    } else {
      this.getFormData(item, value);
    }
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
