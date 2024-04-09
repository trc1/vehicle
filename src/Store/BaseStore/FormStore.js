import { makeObservable, observable, action, runInAction } from 'mobx';

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
      await this.services.add(this.formData);
      runInAction(() => {
        this.formData = {};
      });
    } catch (error) {
      console.error('Error creating new data:', error);
      throw error;
    }
  };

  async deleteData(data) {
    try {
      await this.services.delete(data);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  }
  async updateData(resource) {
    const data = {
      id: resource,
      data: this.editedFormData,
    };
    console.log('Update Data:', data);

    try {
      // Call updateDataService asynchronously using await
      await this.services.update(data.id, data.data);
      console.log('Data updated successfully!');
      // Reset inputUpdateValues after submission
      this.editedFormData = {};
    } catch (error) {
      console.error('Failed to update data:', error);
      // Optionally handle error here
    }
  }
}
export default FormStore;
