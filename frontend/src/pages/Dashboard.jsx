import { Search, BookOpen, History } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  
  const user = JSON.parse(localStorage.getItem("user"));
  const namaUser = user?.name ? `, ${user.name.split(" ")[0]}` : "";

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 antialiased">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-8 space-y-10">
        
        {/* Header Section */}
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Selamat Datang Kembali{namaUser}!
          </h1>
          <p className="text-sm md:text-base text-slate-500 max-w-2xl">
            Lindungi diri Anda, keluarga, dan orang terdekat dari bahaya hoaks serta penyebaran informasi yang menyesatkan di media sosial.
          </p>
        </div>

       
        <div className="space-y-5">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <span></span> Menu Utama Aplikasi
          </h2>

          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
            
            
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 lg:p-8 flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div>
                <div className="bg-indigo-50 text-indigo-600 w-fit p-4 rounded-xl mb-6 shadow-inner">
                  <Search size={26} />
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-slate-800 mb-2">
                  Analisis Konten Baru
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  Salin dan periksa teks informasi dari media sosial atau portal berita untuk mendeteksi kebenaran fakta menggunakan kecerdasan buatan AI.
                </p>
              </div>
              <button
                onClick={() => navigate("/analyze")}
                className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-indigo-700 active:scale-[0.99] transition-all shadow-sm"
              >
                Mulai Analisis Konten
              </button>
            </div>

            
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 lg:p-8 flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div>
                <div className="bg-slate-100 text-slate-600 w-fit p-4 rounded-xl mb-6 shadow-inner">
                  <History size={26} />
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-slate-800 mb-2">
                  Riwayat Analisis
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  Buka dan kelola kembali kumpulan data hasil klasifikasi informasi biner (Fakta atau Hoaks) yang pernah Anda lakukan sebelumnya.
                </p>
              </div>
              <button
                onClick={() => navigate("/history")}
                className="w-full bg-slate-700 text-white py-3 rounded-xl font-semibold text-sm hover:bg-slate-800 active:scale-[0.99] transition-all shadow-sm"
              >
                Lihat Semua Riwayat
              </button>
            </div>

          </div>
        </div>

        
        <div className="space-y-5 pt-4">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <span></span> Pusat Literasi Digital
          </h2>

          <div
            onClick={() => navigate("/education")}
            className="group bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-5 cursor-pointer hover:shadow-md hover:border-indigo-200 transition-all max-w-2xl"
          >
            <div className="bg-indigo-50 p-4 rounded-xl text-indigo-600 group-hover:bg-indigo-100 transition-colors">
              <BookOpen size={24} />
            </div>

            <div className="flex-1 space-y-0.5">
              <h3 className="font-bold text-slate-800 text-base group-hover:text-indigo-600 transition-colors">
                Panduan Lengkap Mengenali Hoaks
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                Pelajari indikator ciri-ciri berita palsu, taktik pembuat hoaks, serta langkah taktis memverifikasi kevalidan tim medis secara mandiri.
              </p>
            </div>
            
            <div className="text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all text-xl pr-1 hidden sm:block">
              →
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;