import DataStore from './BaseStore/DataStore';
import VehicleMakeServices from '../Services/VehicleMakeServices';

class VehicleMakeStore extends DataStore {
  constructor(props) {
    super(props);
    this.services = new VehicleMakeServices();
    this.getData();
  }
}
export default VehicleMakeStore;
