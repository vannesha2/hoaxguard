import { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Silakan masukkan alamat email Anda terlebih dahulu.");
      return;
    }

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email.trim());
      alert("Tautan untuk mengatur ulang kata sandi (reset password) telah berhasil dikirim ke email Anda. Silakan periksa kotak masuk atau folder spam.");
      setEmail("");
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          alert("Alamat email tidak terdaftar di sistem kami.");
          break;
        case "auth/invalid-email":
          alert("Format alamat email tidak valid.");
          break;
        default:
          alert(`Gagal mengirim email reset: ${error.message}`);
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 antialiased">
      
     
      <div className="flex items-center gap-3 mb-8">
        <img src="/favicon.svg" alt="HoaxGuard" className="w-10 h-10 object-contain" />
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Hoax<span className="text-indigo-600">Guard</span>
        </h1>
      </div>

      
      <div className="bg-white w-full max-w-md rounded-3xl shadow-sm border border-slate-100 p-8 space-y-6">
        
        
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-slate-800">
            Reset Password
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Masukkan email terdaftar Anda. Kami akan mengirimkan tautan untuk mengatur ulang password Anda.
          </p>
        </div>

       
        <form onSubmit={handleReset} className="space-y-4">
          
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-700">
              Alamat Email
            </label>
            <input
              type="email"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="w-full text-sm border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all placeholder-slate-300 disabled:bg-slate-50 disabled:text-slate-400"
            />
          </div>

          
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full text-sm font-semibold py-3 rounded-xl transition-all shadow-sm ${
                loading
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-md"
              }`}
            >
              {loading ? "Mengirim..." : "Kirim Tautan Reset"}
            </button>
          </div>

        </form>

        
        <div className="text-center text-xs pt-2 border-t border-slate-50">
          <Link to="/login" className="inline-flex items-center gap-1 text-indigo-600 font-bold hover:underline">
            <span>←</span> Kembali ke Halaman Masuk
          </Link>
        </div>

      </div>

    </div>
  );
}

export default ForgotPassword;