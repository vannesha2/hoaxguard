import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Silakan masukkan nama lengkap Anda.");
      return;
    }

    if (!email.trim()) {
      alert("Silakan masukkan email Anda.");
      return;
    }

    if (!password.trim()) {
      alert("Silakan masukkan password Anda.");
      return;
    }

    if (password.length < 6) {
      alert("Password minimal harus terdiri dari 6 karakter.");
      return;
    }

    try {
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name.trim(),
        email: email.trim(),
        createdAt: new Date(),
      });

      alert("Akun berhasil dibuat!");
      navigate("/login");
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          alert("Email sudah terdaftar. Silakan gunakan email lain atau masuk.");
          break;
        case "auth/invalid-email":
          alert("Format email tidak valid.");
          break;
        case "auth/weak-password":
          alert("Password terlalu lemah.");
          break;
        default:
          alert(`Pendaftaran gagal: ${error.message}`);
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
            Buat Akun Baru
          </h2>
          <p className="text-sm text-slate-400">
            Daftar untuk mulai menggunakan HoaxGuard
          </p>
        </div>

        
        <form onSubmit={handleRegister} className="space-y-4">
          
          
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-700">
              Nama Lengkap
            </label>
            <input
              type="text"
              placeholder="Nama Lengkap"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-sm border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all placeholder-slate-300"
            />
          </div>

          
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-700">
              Email
            </label>
            <input
              type="email"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-sm border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all placeholder-slate-300"
            />
          </div>

          
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Minimal 6 karakter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-sm border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all placeholder-slate-300"
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
              {loading ? "Memproses..." : "Daftar Akun"}
            </button>
          </div>

        </form>

        
        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-50">
          Sudah punya akun?
          <Link to="/login" className="ml-1.5 text-indigo-600 font-bold hover:underline">
            Masuk di sini
          </Link>
        </div>

      </div>

      
      <p className="mt-8 text-center text-slate-400 text-xs max-w-xs leading-relaxed">
        Dengan mendaftar, Anda menyetujui <span className="hover:underline cursor-pointer font-medium">Syarat & Ketentuan</span> dan <span className="hover:underline cursor-pointer font-medium">Kebijakan Privasi</span> kami.
      </p>

    </div>
  );
}

export default Register;