import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import SplashScreen from "./components/SplashScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/home";
import Analyze from "./pages/analyze";
import Education from "./pages/education";
import About from "./pages/about";
import History from "./pages/history";
import Login from "./pages/login";
import Register from "./pages/register";
import ForgotPassword from "./pages/forgotPassword";
import Profile from "./pages/profile";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />

        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/analyze"
              element={
                <ProtectedRoute>
                  <Analyze />
                </ProtectedRoute>
              }
            />

            <Route path="/education" element={<Education />} />
            <Route path="/about" element={<About />} />

            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <History />
                </ProtectedRoute>
              }
            />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;