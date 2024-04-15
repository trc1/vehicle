import ApiService from "./ApiService";

class VehicleMakeService extends ApiService {
  constructor() {
    super(`${import.meta.env.VITE_API_URL}resources/vehicleMake`);
  }

  async fetchData(queryParams) {
    try {
      const response = await this.fetch(queryParams);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data from VehicleMakes:", error);
      throw error;
    }
  }
}

export default VehicleMakeService;
