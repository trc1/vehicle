import VehicleMakeService from '../Services/VehicleMakeService';
import FormStore from './BaseStore/FormStore';

class VehicleMakeFormStore extends FormStore {
  constructor() {
    super();
    this.services = new VehicleMakeService();
  }
}

export default VehicleMakeFormStore;
