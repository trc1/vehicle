import { makeObservable, observable, action, runInAction } from "mobx";

class FormStore {
  formData = {};
  editedFormData = {};
  constructor() {
    makeObservable(this, {
      formData: observable,
      editedFormData: observable,
      getFormData: action,
      getEditedFormData: action,
      createNewData: action,
      deleteData: action,
    });
  }

  async getFormData(inputKey, inputValue) {
    this.formData[inputKey] = inputValue;
  }
  async getEditedFormData(inputKey, inputValue) {
    this.editedFormData[inputKey] = inputValue;
  }

  createNewData = async () => {
    try {
      await this.services.addData(this.formData);
      runInAction(() => {
        this.formData = {}; // Reset formData upon successful submission
      });
    } catch (error) {
      console.error("Error creating new data:", error);
      // Optionally, handle the error here or rethrow it to be caught elsewhere
      throw error;
    }
  };

  async deleteData(data) {
    try {
      await this.services.deleteDataService(data);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  }
  updateData(resource) {
    const data = {
      id: resource,
      data: this.editedFormData,
    };
    console.log("Update Data:", data);

    // Call updateDataService asynchronously
    this.updateDataService(data.id, data.data)
      .then(() => {
        console.log("Data updated successfully!");
        this.editedFormData = {}; // Reset inputUpdateValues after submission
      })
      .catch((error) => {
        console.error("Failed to update data:", error);
        // Optionally handle error here
      });
  }
}
export default FormStore;
