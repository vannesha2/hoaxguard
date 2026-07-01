import { Navigate } from "react-router-dom";
import { useState } from "react";
import { analyzeNews } from "../services/api"; 

function Analyze() {
  const user = localStorage.getItem("user");
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleAnalyze = async () => {
    if (!text.trim()) {
      alert("Masukkan teks terlebih dahulu");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const realResult = await analyzeNews(text);
      setResult(realResult);

      const history = JSON.parse(localStorage.getItem("analysisHistory")) || [];
      history.unshift(realResult);
      localStorage.setItem("analysisHistory", JSON.stringify(history));

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Terjadi kesalahan saat menghubungi server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        
        <div className="md:col-span-2 space-y-6">
         
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="font-semibold text-lg mb-4">
              Masukkan Konten yang Ingin Dianalisis
            </h2>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={loading}
              placeholder="Tempel teks dari media sosial atau berita di sini..."
              className="w-full h-56 border rounded-2xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            <p className="text-center text-gray-500 text-sm mt-3">
              {text.length} Karakter
            </p>

            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full mt-5 bg-indigo-400 hover:bg-indigo-500 text-white py-4 rounded-2xl transition shadow-md font-medium"
            >
              {loading ? "Sedang Menganalisis..." : "Analisis Konten"}
            </button>
          </div>

          
          {result && (() => {
            let kategoriVisual = result.status; 
            let warnaBg = "";
            let ikon = "";
            const persentase = result.confidence * 100;

            if (kategoriVisual === "Hoaks") {
              if (persentase > 75) {
                kategoriVisual = "Hoaks";
                warnaBg = "bg-red-50 border-red-200 text-red-700";
                ikon = "❌";
              } else {
                kategoriVisual = "Netral (Cenderung Hoaks)";
                warnaBg = "bg-amber-50 border-amber-200 text-amber-700";
                ikon = "ℹ️";
              }
            } else if (kategoriVisual === "Fakta") {
              if (persentase > 75) {
                kategoriVisual = "Fakta";
                warnaBg = "bg-green-50 border-green-200 text-green-700";
                ikon = "✅";
              } else {
                kategoriVisual = "Netral (Cenderung Fakta)";
                warnaBg = "bg-amber-50 border-amber-200 text-amber-700";
                ikon = "ℹ️";
              }
            }

            return (
              <div className="bg-white rounded-2xl shadow-md p-6 border border-indigo-100 animate-fade-in">
                <h2 className="text-xl font-bold text-indigo-700 mb-4">
                  Hasil Analisis Sistem
                </h2>

                
                <div className={`flex items-center gap-3 p-4 rounded-xl border mb-4 ${warnaBg}`}>
                  <span className="text-2xl">{ikon}</span>
                  <div>
                    <p className="text-sm opacity-75">Status Informasi:</p>
                    <p className="text-xl font-bold">{kategoriVisual}</p>
                  </div>
                </div>

                <p className="mt-2 text-gray-700 text-sm">
                  <strong>Tingkat Keyakinan Model:</strong>{" "}
                  <span className="font-semibold text-indigo-600">{(result.confidence * 100).toFixed(2)}%</span>
                </p>

               
                <div className="mt-5 bg-indigo-50 p-4 rounded-xl">
                  <h3 className="font-semibold text-indigo-700 text-sm mb-3">
                    Penjelasan Explainable AI (Attention Weights)
                  </h3>
                  
                  <div className="flex flex-wrap gap-2 p-3 bg-white rounded-xl border border-indigo-100">
                    {Array.isArray(result.explanation) && result.explanation.length > 0 ? (
                      result.explanation.map((item, index) => {
                        const opacity = Math.min(item.weight * 5, 1); 
                        return (
                          <span 
                            key={index} 
                            className="px-2 py-1 rounded text-sm font-medium transition-all inline-block"
                            style={{ 
                              backgroundColor: `rgba(234, 179, 8, ${opacity})`, 
                              border: item.weight > 0.08 ? '1px solid #eab308' : '1px solid #f3f4f6'
                            }}
                            title={`Bobot Atensi: ${item.weight.toFixed(4)}`}
                          >
                            {item.word}{" "}
                            <span className="text-xs text-gray-400 font-normal">
                              ({item.weight.toFixed(2)})
                            </span>
                          </span>
                        );
                      })
                    ) : (
                      <p className="text-gray-500 text-sm">
                        {typeof result.explanation === 'string' 
                          ? result.explanation 
                          : "Sistem mendeteksi pola bahasa dan kata kunci pada informasi ini."}
                      </p>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-400 mt-2 ml-1">
                    *Warna kuning yang semakin tebal menandakan kata tersebut memiliki pengaruh besar bagi model AI dalam menentukan keputusan akhir.
                  </p>
                </div>
              </div>
            );
          })()}
        </div>

        
        <div className="space-y-6">
          {/* Cara Menggunakan */}
          <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100">
            <div className="flex gap-3 items-start">
              <div className="bg-indigo-100 p-2 rounded-xl text-xl shadow-sm">📄</div>
              <div>
                <h2 className="font-bold text-base text-gray-800">Cara Menggunakan</h2>
                <ol className="text-gray-500 text-xs mt-2 list-decimal ml-4 space-y-1">
                  <li>Salin teks berita atau media sosial.</li>
                  <li>Tempel teks tersebut ke kolom input teks.</li>
                  <li>Klik tombol "Analisis Konten".</li>
                  <li>Hasil analisis instan akan langsung muncul di bawah.</li>
                </ol>
              </div>
            </div>
          </div>

          
          <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100">
            <h2 className="font-semibold text-sm text-gray-800 mb-1">
              Contoh Konten Percobaan
            </h2>
            <p className="text-xs text-gray-400 mb-4">
              Klik kotak di bawah untuk memuat teks otomatis:
            </p>

            {[
              {
                title: "Contoh 1",
                text: "WAJIB TAHU! Pemerintah akan membagikan uang 10 juta untuk semua warga! Share sebelum terlambat!!!",
              },
              {
                title: "Contoh 2",
                text: "Menurut studi terbaru dari Universitas Harvard, konsumsi kopi dapat meningkatkan produktivitas hingga 15%.",
              },
              {
                title: "Contoh 3",
                text: "BREAKING NEWS!! Artis terkenal tertangkap kasus narkoba! Polisi tutup mulut!",
              },
            ].map((item, index) => (
              <div
                key={index}
                onClick={() => setText(item.text)}
                className="border border-indigo-100 rounded-xl p-3 mb-3 cursor-pointer hover:bg-indigo-50/50 transition-all active:scale-95"
              >
                <span className="bg-indigo-100 px-3 py-0.5 rounded-full text-[11px] font-semibold text-indigo-800">
                  {item.title}
                </span>
                <p className="mt-2 text-xs text-gray-600 line-clamp-2 font-medium">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Analyze;