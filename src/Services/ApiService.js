class ApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
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

  getHeaders() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    };
  }

  async fetch(queryParams) {
    const url = this.constructURL(this.baseUrl, queryParams);
    return await fetch(url, {
      method: "GET",
    });
  }

  async add(data) {
    await fetch(this.baseUrl, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
  }

  async delete(id) {
    await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });
  }

  async update(id, data) {
    await fetch(`${this.baseUrl}/${id}`, {
      method: "PATCH",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
  }
}
export default ApiService;
