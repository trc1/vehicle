import DataStore from './BaseStore/DataStore';
import VehicleMakeService from '../Services/VehicleMakeService';

class VehicleMakeStore extends DataStore {
  constructor(props) {
    super(props);
    this.services = new VehicleMakeService();
    this.getData('fetchVehicleMakes');
  }
}
export default VehicleMakeStore;
