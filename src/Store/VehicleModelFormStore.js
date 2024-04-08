import VehicleModelServices from '../Services/VehicleModelServices';
import FormStore from './BaseStore/FormStore';

class VehicleModelFormStore extends FormStore {
  constructor() {
    super();
    this.services = new VehicleModelServices();
  }
}

export default VehicleModelFormStore;
