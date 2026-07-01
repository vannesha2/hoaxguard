import { Navigate } from "react-router-dom";
import { useState } from "react";

function History() {
  const user = localStorage.getItem("user");
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [selectedIds, setSelectedIds] = useState([]); // Menggunakan ID unik/Timestamp untuk seleksi data aman
  const [manageMode, setManageMode] = useState(false);

  if (!user) {
    return <Navigate to="/login" />;
  }

  
  const historyData = (JSON.parse(localStorage.getItem("analysisHistory")) || []).map((item, idx) => ({
    ...item,
    id: item.id || item.timestamp || `${idx}-${item.confidence}`
  }));

  
  const filteredHistory = historyData.filter((item) => {
    const matchSearch = (item.text || "").toLowerCase().includes(search.toLowerCase());
    const statusSistem = item.status || "Fakta";

    const matchFilter = activeFilter === "Semua" ? true : statusSistem.toLowerCase() === activeFilter.toLowerCase();

    return matchSearch && matchFilter;
  });

  const handleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const deleteSelected = () => {
    if (selectedIds.length === 0) {
      alert("Pilih riwayat yang ingin dihapus.");
      return;
    }

    const confirmDelete = window.confirm(`Hapus ${selectedIds.length} riwayat yang dipilih?`);
    if (!confirmDelete) return;

    
    const newHistory = historyData.filter((item) => !selectedIds.includes(item.id));

    localStorage.setItem("analysisHistory", JSON.stringify(newHistory));
    setSelectedIds([]);
    setManageMode(false);
  };

  
  const getStatusStyle = (status) => {
    const normalized = (status || "").toLowerCase();

    if (normalized === "fakta") {
      return {
        badge: "bg-green-100 text-green-700 border-green-200",
        icon: "✅",
        label: "Fakta"
      };
    }
    return {
      badge: "bg-red-100 text-red-700 border-red-200",
      icon: "❌",
      label: "Hoaks"
    };
  };

  
  const countByStatus = (status) => {
    if (status === "Semua") return historyData.length;
    return historyData.filter((item) => (item.status || "").toLowerCase() === status.toLowerCase()).length;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">

        
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Riwayat Analisis Konten
        </h1>

        
        <div className="bg-white rounded-2xl shadow-md p-4 mb-6 border border-gray-100 flex items-center gap-3">
          <span className="text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Cari kata kunci dalam riwayat berita..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400 text-sm"
          />
        </div>

        
        <div className="flex gap-3 mb-8 flex-wrap">
          {["Semua", "Fakta", "Hoaks"].map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setActiveFilter(filter);
                setSelectedIds([]); // Reset seleksi tiap kali pindah tab filter
              }}
              className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                activeFilter === filter
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {filter} <span className="text-xs opacity-70 ml-1">({countByStatus(filter)})</span>
            </button>
          ))}
        </div>

        
        <div className="mb-6 flex gap-3">
          {!manageMode ? (
            <button
              onClick={() => setManageMode(true)}
              className="bg-gray-800 hover:bg-gray-900 text-white px-5 py-2 text-sm font-medium rounded-xl transition"
            >
              Kelola Riwayat
            </button>
          ) : (
            <>
              <button
                onClick={deleteSelected}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 text-sm font-medium rounded-xl transition"
              >
                Hapus Terpilih ({selectedIds.length})
              </button>

              <button
                onClick={() => {
                  setManageMode(false);
                  setSelectedIds([]);
                }}
                className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 text-sm font-medium rounded-xl transition"
              >
                Batal
              </button>
            </>
          )}
        </div>

       
        <div className="space-y-4">
          {filteredHistory.length === 0 ? (
            <div className="bg-white rounded-2xl shadow p-12 text-center text-gray-400 border border-gray-200 text-sm">
              📭 Tidak ada data riwayat analisis yang cocok.
            </div>
          ) : (
            filteredHistory.map((item) => {
              const style = getStatusStyle(item.status);
              const isChecked = selectedIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => manageMode && handleSelect(item.id)}
                  className={`bg-white rounded-2xl shadow-sm p-5 border transition-all ${
                    manageMode ? "cursor-pointer hover:bg-slate-50 select-none" : ""
                  } ${isChecked ? "border-indigo-400 bg-indigo-50/20" : "border-gray-100"}`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex gap-4 flex-1">
                      <div className="text-2xl mt-0.5">{style.icon}</div>
                      
                      <div className="flex-1">
                        {/* Menampilkan isi text berita */}
                        <p className="text-gray-800 text-sm font-medium leading-relaxed break-words line-clamp-3">
                          {item.text || "Tidak ada teks informasi"}
                        </p>

                        <div className="flex gap-5 mt-3 text-xs text-gray-400 flex-wrap items-center">
                          <span>
                            📅 {item.date || "Baru Saja"}
                          </span>
                          <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded font-medium">
                            Akurasi AI: {item.confidence ? (item.confidence * 100).toFixed(1) : 0}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Sisi Kanan Badge Status & Checkbox */}
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${style.badge}`}>
                        {style.label}
                      </span>

                      {manageMode && (
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}} // Di-handle oleh onClick div induk di atas
                          className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                        />
                      )}
                    </div>

                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}

export default History;