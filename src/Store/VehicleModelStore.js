import DataStore from "./BaseStore/DataStore";
import VehicleModelService from "../Services/VehicleModelService";

class VehicleModelStore extends DataStore {
  constructor(props) {
    super(props);
    this.services = new VehicleModelService();
    this.getData();
  }
}

export default VehicleModelStore;
