import { makeObservable, observable, action, runInAction } from 'mobx';

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
      checkUpdatedValue: action,
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
      runInAction(() => {
        this.modal = false;
      });
      console.log(this.modal, 'Modal closed');
    } catch (error) {
      console.error('Failed to update data:', error);
      // Optionally handle error here
    }
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

  checkUpdatedValue = (tableData, makeData) => {
    // Check for updated value and handle accordingly
    console.log(tableData, 'table');
    console.log(makeData, 'make');
    // Check for updated values and handle accordingly
    if (makeData && makeData.length > 0) {
      // Iterate through each makeData object
      makeData.forEach((make) => {
        // Find the corresponding item in tableData with matching makeId
        const matchingItemIndex = tableData.findIndex(
          (item) => item.makeId === makeData.id
        );
        if (matchingItemIndex !== -1) {
          // Update the matching item in tableData with the data from makeData
          console.log((tableData[matchingItemIndex].abrv = makeData.abrv));
          tableData[matchingItemIndex].abrv = makeData.abrv;
          tableData[matchingItemIndex].name = makeData.make;
        }
      });
    }
  };
}
export default FormStore;
