import ApiService from './ApiService';

class VehicleMakeService extends ApiService {
  constructor() {
    super('https://api.baasic.com/v1/test234/resources/vehicleMake');
    //env
  }

  async fetchVehicleMakes(queryParams) {
    try {
      const response = await this.fetch(queryParams);
      if (!response.ok) {
        throw new Error('Failed to fetch data from fetchVehicleMakes');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data from fetchVehicleMakes:', error);
      throw error;
    }
  }
}

export default VehicleMakeService;
