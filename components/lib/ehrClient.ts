// components/lib/ehrClient.ts
import axios from "axios";

const api = axios.create({
  baseURL: "/api/ehr",
});

export default api;
