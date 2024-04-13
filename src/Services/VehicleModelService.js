import ApiService from "./ApiService";

class VehicleModelService extends ApiService {
  constructor() {
    super(`${import.meta.env.VITE_API_URL}resources/vehicleModel`);
  }

  async fetchData(queryParams) {
    try {
      const response = await this.fetch(queryParams);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data from fetchVehicleModels:", error);
      throw error;
    }
  }
}

export default VehicleModelService;
