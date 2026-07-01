import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Silakan masukkan email.");
      return;
    }

    if (!password.trim()) {
      alert("Silakan masukkan password.");
      return;
    }

    try {
      setLoading(true);

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.data();

      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: user.uid,
          email: user.email,
          name: userData?.name || "Pengguna",
        })
      );

      alert("Login berhasil.");
      navigate("/dashboard");
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          alert("Email belum terdaftar. Silakan daftar akun terlebih dahulu.");
          break;
        case "auth/invalid-credential":
          alert("Email atau password salah.");
          break;
        case "auth/wrong-password":
          alert("Password yang dimasukkan salah.");
          break;
        case "auth/invalid-email":
          alert("Format email tidak valid.");
          break;
        case "auth/too-many-requests":
          alert("Terlalu banyak percobaan login. Silakan coba lagi beberapa saat.");
          break;
        default:
          alert("Login gagal. Periksa email dan password Anda.");
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
            Masuk ke Akun Anda
          </h2>
          <p className="text-sm text-slate-400">
            Masukkan kredensial Anda untuk melanjutkan
          </p>
        </div>

       
        <form onSubmit={handleLogin} className="space-y-4">
          
          
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
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-sm border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all placeholder-slate-300"
            />
          </div>

          
          <div className="text-right">
            <Link to="/forgot-password" className="text-xs font-medium text-indigo-600 hover:underline">
              Lupa password?
            </Link>
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
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </div>

        </form>

        
        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-50">
          Belum punya akun?
          <Link to="/register" className="ml-1.5 text-indigo-600 font-bold hover:underline">
            Daftar Sekarang
          </Link>
        </div>

      </div>

      
      <p className="mt-8 text-center text-slate-400 text-xs max-w-xs leading-relaxed">
        Dengan masuk, Anda menyetujui <span className="hover:underline cursor-pointer font-medium">Syarat & Ketentuan</span> dan <span className="hover:underline cursor-pointer font-medium">Kebijakan Privasi</span> kami.
      </p>

    </div>
  );
}

export default Login;