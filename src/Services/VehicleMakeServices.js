import ApiServices from './ApiServices';

class VehicleMakeServices extends ApiServices {
  constructor() {
    super('https://api.baasic.com/v1/test234/resources/vehicleMake');
    //env
  }
}

export default VehicleMakeServices;
