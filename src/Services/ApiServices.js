class ApiServices {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async fetchData(queryParams = {}) {
    try {
      const url = this.constructURL(this.baseUrl, queryParams);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  constructURL(baseUrl, queryParams) {
    let url = baseUrl;
    let firstParam = true;
    for (const key in queryParams) {
      if (queryParams.hasOwnProperty(key) && queryParams[key] !== null) {
        if (firstParam) {
          url += `?${key}=${queryParams[key]}`;
          firstParam = false;
        } else {
          url += `&${key}=${queryParams[key]}`;
        }
      }
    }
    return url;
  }

  async addData(data) {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to add new resource');
      }
    } catch (error) {
      console.error('Error adding resource:', error);
      throw error;
    }
  }

  async deleteDataService(id) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
        headers: this.getHeaders(),
      });
      if (!response.ok) {
        throw new Error('Failed to delete');
      }
    } catch (error) {
      console.error('Error deleting:', error);
      throw error;
    }
  }

  async updateDataService(id, data) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to update');
      }
    } catch (error) {
      console.error('Error updating:', error);
      throw error;
    }
  }
  getHeaders() {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('userToken')}`,
    };
  }
}

export default ApiServices;
