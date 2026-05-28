import axios from "axios";

export const fetchAnalytics =
async (userId) => {

  const res =
    await axios.get(

      `${import.meta.env.VITE_API_URL}/api/analytics/${userId}`
    );

  return res.data;
};