import axios from "axios";

const AdminAPI = axios.create({
  baseURL:
    `${import.meta.env.VITE_API_URL}/api/admin`,
});

export default AdminAPI;