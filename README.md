# HoaxGuard — Platform Berbasis Web Cerdas Deteksi Hoaks

HoaxGuard adalah platform berbasis web cerdas yang dirancang untuk mengidentifikasi keaslian konten informasi atau berita di media sosial secara akurat dan transparan.

Berbeda dengan model deteksi konvensional yang bersifat **Black-Box**, HoaxGuard menerapkan pendekatan **Explainable Artificial Intelligence (XAI)** menggunakan arsitektur **Bidirectional Long Short-Term Memory (Bi-LSTM)** yang dipadukan dengan **Attention Mechanism** untuk memberikan penjelasan visual berupa bobot kepentingan (*Attention Weights*) pada setiap hasil klasifikasi.

---

## Live Demo

- **Frontend (Vercel)** : https://hoaxguard.vercel.app/
- **Repository GitHub** : https://github.com/vannesha2/hoaxguard
- **Dataset Kaggle** : https://www.kaggle.com/datasets/mochamadabdulazis/deteksi-berita-hoaks-indo-dataset

---

#  Fitur

- Deteksi berita hoaks menggunakan Artificial Intelligence
- Explainable AI (XAI) dengan visualisasi Attention Weights
- Menampilkan tingkat kepercayaan (Confidence Score)
- Riwayat hasil analisis pengguna
- Login, Register, dan Forgot Password menggunakan Firebase Authentication
- Halaman edukasi mengenai hoaks dan literasi digital
- Responsive User Interface

---

# Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios

## Backend

- Node.js
- Express.js
- Axios

## AI Service

- Python
- FastAPI
- TensorFlow / Keras
- Scikit-learn
- NumPy

## Database & Authentication

- Firebase Authentication
- Cloud Firestore

---

# Project Structure

```text
HOAXGUARD/
├── frontend/        # React + Vite
├── backend/         # Express.js REST API
└── ai-service/      # FastAPI + Machine Learning Model
```

---

# Metode & Arsitektur Model

## 1. Pemrosesan Dataset

### Komposisi Data

Dataset diseimbangkan menggunakan teknik **Downsampling** dengan rasio **50:50** antara kelas **Hoaks** dan **Fakta** untuk menghindari bias terhadap kelas mayoritas.

### Pipeline Preprocessing

- Case Folding
- Cleaning karakter non-alfabet
- URL Tokenization (`tautanpalsu`)
- Tokenizing
- Padding Sequence
- Maximum Length = **100 Token**

---

## 2. Arsitektur Deep Learning

Model menggunakan pendekatan **Multi-Output Neural Network**.

Komponen utama terdiri dari:

- Embedding Layer
- Bidirectional LSTM
- Attention Mechanism
- Dense Layer
- Multi Output Prediction

Output model:

1. Prediksi kelas (Hoaks / Fakta)
2. Attention Weights sebagai Explainable AI

---

# Evaluasi Model

Model diekspor ke format:

```text
hoax_detector_xai.keras
```

dengan dua output utama:

- Prediksi klasifikasi
- Attention Weight Matrix

### Hasil

- ✅ Performa sangat baik pada data internal.
- ✅ Menampilkan visualisasi kata penting menggunakan Explainable AI.
- ⚠️ Pada data real-time, tingkat keandalan sekitar **70%** karena variasi bahasa gaul, singkatan, dan istilah baru yang belum terdapat dalam kosakata model.

---

# Fitur Aplikasi

### Landing Page

Menampilkan informasi utama mengenai platform HoaxGuard.

### Authentication

- Login
- Register
- Forgot Password

menggunakan Firebase Authentication.

### Analisis Berita

- Input berita
- Prediksi Hoaks/Fakta
- Confidence Score
- Explainable AI
- Highlight kata penting

### Riwayat Analisis

- Menyimpan hasil analisis
- Search History
- Filter berdasarkan:
  - Semua
  - Fakta
  - Hoaks

---

# Instalasi

## Clone Repository

```bash
git clone https://github.com/vannesha2/hoaxguard.git
cd hoaxguard
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

## Backend

```bash
cd backend
npm install
npm start
```

## AI Service

```bash
cd ai-service

python -m venv .venv

# Windows
.venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

---


# Pengembangan Selanjutnya

- Migrasi ke model Transformer seperti **IndoBERT**.
- Penambahan dataset berita terbaru secara berkala.
- Dukungan bahasa informal dan bahasa gaul Indonesia.
- Analisis URL berita secara otomatis.
- Upload dokumen PDF atau gambar berita untuk dideteksi.

---


**TIARA VANNESHA**
