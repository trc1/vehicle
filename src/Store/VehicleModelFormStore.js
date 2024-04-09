import VehicleModelService from '../Services/VehicleModelService';
import FormStore from './BaseStore/FormStore';

class VehicleModelFormStore extends FormStore {
  constructor() {
    super();
    this.services = new VehicleModelService();
  }
}

export default VehicleModelFormStore;
