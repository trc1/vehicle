import ApiService from "./ApiService";

class VehicleModelService extends ApiService {
  constructor() {
    super(`${import.meta.env.VITE_API_URL}resources/vehicleModel`);
  }

  async fetchData(queryParams) {
    try {
      const response = await this.fetch(queryParams);
      if (!response.ok) {
        throw new Error("Failed to fetch data from fetchVehicleModels");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data from fetchVehicleModels:", error);
      throw error;
    }
  }

  async addData(data) {
    try {
      const response = await this.add(data);
      if (!response.ok) {
        throw new Error("Failed to add vehicle model");
      }
    } catch (error) {
      console.error("Error adding vehicle model:", error);
      throw error;
    }
  }

  async updateData(id, data) {
    try {
      const response = await this.update(id, data);
      if (!response.ok) {
        throw new Error("Failed to update vehicle model");
      }
    } catch (error) {
      console.error("Error updating vehicle model:", error);
      throw error;
    }
  }

  async deleteData(id) {
    try {
      const response = await this.delete(id);
      if (!response.ok) {
        throw new Error("Failed to delete vehicle model");
      }
    } catch (error) {
      console.error("Error deleting vehicle model:", error);
      throw error;
    }
  }
}

export default VehicleModelService;
