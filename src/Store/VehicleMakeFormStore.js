import VehicleMakeServices from '../Services/VehicleMakeServices';
import FormStore from './BaseStore/FormStore';

class VehicleMakeFormStore extends FormStore {
  constructor() {
    super();
    this.services = new VehicleMakeServices();
  }
}

export default VehicleMakeFormStore;
