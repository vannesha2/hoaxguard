import { Link, useLocation, useNavigate } from "react-router-dom";
import { Shield, LogOut } from "lucide-react";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

 const user = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  const activeClass = "text-blue-700 font-bold relative";
  const normalClass = "text-gray-700 hover:text-blue-700 transition";

   return (
  <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
    
    <div className="flex items-center gap-3">
      <div className="bg-blue-800 p-2 rounded">
        <Shield className="text-white w-5 h-5" />
      </div>

      <h1 className="text-2xl font-bold">
        HoaxGuard
      </h1>
    </div>

    
    {user && (
      <div className="flex items-center gap-4">
        <Link
          to="/dashboard"
          className={
            location.pathname === "/dashboard"
              ? activeClass
              : normalClass
          }
        >
          Dashboard
        </Link>

        <Link
          to="/profile"
          className={
            location.pathname === "/profile"
              ? activeClass
              : normalClass
          }
        >
          Profile
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 border px-4 py-2 rounded-full hover:bg-gray-100"
        >
          <LogOut size={18} />
          Keluar
        </button>
      </div>
    )}
  </div>
);
}
export default Navbar;