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

  convertImageToBase64(fileInput, callback) {
    if (fileInput.files && fileInput.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        var base64String = e.target.result;
        callback(base64String);
      };

      reader.readAsDataURL(fileInput.files[0]);
    }
  }

  createNewData = () => {
    this.services.addData(this.formData);
    runInAction(() => {
      this.formData = {}; // Reset formData upon successful submission
    });
  };

  /*  deleteData(id) {
    this.services.deleteDataService(id);
  } */
  deleteData(data) {
    this.services.deleteDataService(data);
  }

  updateData(resource) {
    const data = {
      id: resource,
      data: this.editedFormData,
    };
    console.log('Update Data:', data);

    this.editedFormData = {}; // Reset inputUpdateValues after submission
  }
}
export default FormStore;
