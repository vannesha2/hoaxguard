import { Navigate } from "react-router-dom";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase";

function Profile() {
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" />;
  }

  
  const dapatkanInisial = (nama) => {
    if (!nama) return "U";
    return nama
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, user.email);
      alert("Email tautan untuk reset password telah berhasil dikirim ke email Anda. Silakan periksa kotak masuk atau spam.");
    } catch (error) {
      alert(`Gagal mengirim email: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-8 flex items-center justify-center">
      <div className="w-full max-w-xl">
        
        
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          
          
          <div className="h-24 bg-gradient-to-r from-indigo-800 to-indigo-600 relative"></div>
          
          
          <div className="px-6 pb-8 pt-0 relative flex flex-col items-center text-center sm:text-left sm:items-start sm:px-8">
            
            
            <div className="-mt-12 w-24 h-24 bg-indigo-100 border-4 border-white rounded-2xl flex items-center justify-center text-indigo-700 font-bold text-2xl shadow-sm mb-4">
              {dapatkanInisial(user.name)}
            </div>

            
            <div className="mb-6 w-full">
              <h1 className="text-2xl font-extrabold text-gray-800">
                Profil Akun Saya
              </h1>
              <p className="text-xs text-gray-400 mt-0.5">
                Kelola informasi akun dan keamanan autentikasi Anda
              </p>
            </div>

            
            <div className="w-full space-y-4 border-y border-gray-100 py-5">
              
              
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Nama Pengguna
                </span>
                <span className="text-sm font-medium text-gray-700 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100 min-w-[200px] text-center sm:text-right">
                  {user.name || "Pengguna"}
                </span>
              </div>

              
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Alamat Email
                </span>
                <span className="text-sm font-medium text-gray-600 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100 min-w-[200px] text-center sm:text-right break-all">
                  {user.email}
                </span>
              </div>

            </div>

            
            <div className="w-full mt-6 flex justify-end">
              <button
                onClick={handleResetPassword}
                disabled={loading}
                className={`w-full sm:w-auto text-sm font-semibold px-5 py-3 rounded-xl transition-all shadow-sm ${
                  loading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow"
                }`}
              >
                {loading ? "Memproses..." : "Ganti Password Melalui Email"}
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Profile;