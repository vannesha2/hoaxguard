import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleAnalyze = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      navigate("/login");
      return;
    }

    navigate("/analyze");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 antialiased">
      
      
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-gradient-to-b from-indigo-50/50 to-transparent">
        <div className="absolute inset-0 bg-[radial-gradient(#e0e7ff_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
        
        <div className="relative max-w-4xl mx-auto z-10 space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Klasifikasi Konten Hoaks pada <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-800">
              Media Sosial
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Platform berbasis web cerdas untuk mengidentifikasi keaslian konten informasi secara akurat dan transparan.
          </p>

          <div className="pt-6">
            <button
              onClick={handleAnalyze}
              className="group inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-md shadow-indigo-100 hover:shadow-lg hover:shadow-indigo-200 transition-all transform active:scale-98"
            >
              Mulai Analisis Sekarang
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </section>

      
      <section className="bg-white py-20 border-y border-slate-100 px-4">
        <div className="max-w-6xl mx-auto space-y-14">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Fitur Utama Sistem
            </h2>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              Keunggulan platform dalam mendeteksi dan menyaring berita palsu
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🔍", title: "Analisis Cepat", desc: "Periksa validitas konten media sosial dalam hitungan detik dengan performa mesin komputasi AI." },
              { icon: "🛡️", title: "Akurasi Tinggi", desc: "Arsitektur untuk meminimalisir kesalahan klasifikasi." },
              { icon: "📊", title: "Skor Kepercayaan", desc: "Transparansi penuh melalui persentase tingkat probabilitas dan keyakinan model di setiap hasil." },
              { icon: "📖", title: "Modul Edukasi", desc: "Akses materi literasi digital terpadu untuk melatih kemampuan berpikir kritis dalam membaca berita." }
            ].map((fitur, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-2xl shadow-inner mb-5">
                    {fitur.icon}
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg mb-2">
                    {fitur.title}
                  </h3>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                    {fitur.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Bagaimana Sistem Bekerja?
            </h2>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              3 langkah mudah mendeteksi kebenaran sebuah informasi
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            
            <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-indigo-100 via-indigo-200 to-indigo-100 z-0"></div>

            {[
              { num: "1", title: "Input Konten", desc: "Salin isi teks berita dari platform media sosial seperti X, Facebook, atau WhatsApp lalu tempel ke form analisis." },
              { num: "2", title: "Analisis Otomatis", desc: "Algoritma memproses ekstraksi kata kunci, mencocokkan pola bahasa, dan menghitung bobot probabilitas biner." },
              { num: "3", title: "Hasil & Edukasi", desc: "Sistem menyajikan label final berupa Hoaks atau Fakta lengkap beserta visualisasi indikator tingkat keyakinannya." }
            ].map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-xl font-extrabold shadow-md shadow-indigo-100 transform rotate-4 hover:rotate-0 transition-transform duration-300">
                  {step.num}
                </div>
                <h3 className="font-bold text-slate-800 text-lg sm:text-xl pt-2">
                  {step.title}
                </h3>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed max-w-xs">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;