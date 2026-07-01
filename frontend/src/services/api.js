import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const analyzeNews = async (textData) => {
  const response = await API.post("/api/detect-hoax", {
    text: textData,
  });

  return response.data;
};