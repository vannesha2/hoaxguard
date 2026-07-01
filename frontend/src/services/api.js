import axios from "axios";

const API = axios.create({
  // Diubah ke port 3000 (Express.js), bukan 8000 (FastAPI)
  baseURL: "http://localhost:3000", 
});

export const analyzeNews = async (textData) => {
  // Panggil endpoint milik Express.js kamu
  const response = await API.post("/api/detect-hoax", { text: textData });
  return response.data;
};