import axios from 'axios';
import env from "../constants/env";

export class ApiService {
  constructor(private client = axios.create({ baseURL: env.apiUrl })) {
  }

  async get<T>(url: string) {
    return this.client.get<T>(url);
  }
}

const apiService = new ApiService();

export default apiService;
