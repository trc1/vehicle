import DataStore from './BaseStore/DataStore';
import VehicleModelServices from '../Services/VehicleModelServices';

class VehicleModelStore extends DataStore {
  constructor(props) {
    super(props);
    this.services = new VehicleModelServices();
    this.getData();
  }
}

export default VehicleModelStore;
