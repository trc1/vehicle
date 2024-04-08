import ApiServices from './ApiServices';

class VehicleModelServices extends ApiServices {
  constructor() {
    super('https://api.baasic.com/v1/test234/resources/vehicleModel');
    //env
  }
}

export default VehicleModelServices;
