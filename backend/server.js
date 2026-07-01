const express = require('express');
const axios = require('axios');
const cors = require('cors'); 
const app = express();

app.use(cors()); 
app.use(express.json());

// Jalur Endpoint di Express.js yang akan dipanggil oleh Frontend
app.post('/api/detect-hoax', async (req, res) => {
    try {
        const { text } = req.body;

        // Validasi input data teks kosong
        if (!text) {
            return res.status(400).json({ error: "Teks tidak boleh kosong" });
        }

        // PERBAIKAN 1: Arahkan axios ke FastAPI lokal (Uvicorn) di laptopmu
        const fastApiResponse = await axios.post('http://127.0.0.1:8000/predict', {
            text: text
        });

        // PERBAIKAN 2: Sesuaikan destrukturisasi dengan objek baru dari FastAPI (xai_explanations)
        const { prediction, confidence, xai_explanations } = fastApiResponse.data;

        // Kirimkan respon yang sudah sinkron ke Frontend
        return res.json({
            // Menyamakan format: "HOAX" dari FastAPI dibaca Frontend menjadi "Hoaks"
            status: prediction === "HOAX" ? "Hoaks" : "Fakta",
            confidence: confidence || 0,  
            // Kirim list kata dan bobot atensi (XAI) ke Frontend agar bisa divisualisasikan
            explanation: xai_explanations || [], 
            text,
            date: new Date().toLocaleString("id-ID")
        });

    } catch (error) {
        console.error("Gagal terhubung ke FastAPI:", error.message);
        return res.status(500).json({ 
            message: "Gagal memproses data di AI Service (FastAPI) Lokal" 
        });
    }
});

// Jalankan server Express di port 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server Express berjalan di port ${PORT}`);
});