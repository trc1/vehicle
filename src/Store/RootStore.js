import VehicleMakeFormStore from './VehicleMakeFormStore';
import VehicleMakeStore from './VehicleMakeStore';
import VehicleModelFormStore from './VehicleModelFormStore';
import VehicleModelStore from './VehicleModelStore';

class RootStore {
  constructor() {
    this.vehicleMakeStore = new VehicleMakeStore();
    this.vehicleModelStore = new VehicleModelStore();
    this.vehicleMakeFormStore = new VehicleMakeFormStore();
    this.vehicleModelFormStore = new VehicleModelFormStore();
  }
}
const rootStore = new RootStore();

export default rootStore;
