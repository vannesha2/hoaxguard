const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

const AI_SERVICE_URL = process.env.AI_SERVICE_URL;

app.use(cors());
app.use(express.json());

app.post("/api/detect-hoax", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        error: "Teks tidak boleh kosong",
      });
    }

    const fastApiResponse = await axios.post(
      `${AI_SERVICE_URL}/predict`,
      {
        text,
      }
    );

    const {
      prediction,
      confidence,
      xai_explanations,
    } = fastApiResponse.data;

    return res.json({
      status: prediction === "HOAX" ? "Hoaks" : "Fakta",
      confidence: confidence || 0,
      explanation: xai_explanations || [],
      text,
      date: new Date().toLocaleString("id-ID"),
    });

  }catch (error) {
    console.error("=== ERROR FASTAPI ===");

    if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Data:", error.response.data);
    } else {
        console.error(error.message);
    }

    return res.status(500).json({
        message: "Gagal memproses data di AI Service"
    });
}
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server Express berjalan di port ${PORT}`);
});