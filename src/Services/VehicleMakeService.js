import ApiService from "./ApiService";

class VehicleMakeService extends ApiService {
  constructor() {
    super("https://api.baasic.com/v1/test234/resources/vehicleMake");
    //env
  }

  async fetchData(queryParams) {
    try {
      const response = await this.fetch(queryParams);
      if (!response.ok) {
        throw new Error("Failed to fetch data from fetchVehicleMakes");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data from fetchVehicleMakes:", error);
      throw error;
    }
  }

  async addData(data) {
    try {
      const response = await this.add(data);
      if (!response.ok) {
        throw new Error("Failed to add vehicle make");
      }
    } catch (error) {
      console.error("Error adding vehicle make:", error);
      throw error;
    }
  }

  async updateData(id) {
    try {
      const response = await this.update(id);
      if (!response.ok) {
        throw new Error("Failed to update vehicle make");
      }
    } catch (error) {
      console.error("Error updating vehicle make:", error);
      throw error;
    }
  }

  async deleteData(id) {
    try {
      const response = await this.delete(id);
      if (!response.ok) {
        throw new Error("Failed to delete vehicle make");
      }
    } catch (error) {
      console.error("Error deleting vehicle make:", error);
      throw error;
    }
  }
}

export default VehicleMakeService;
