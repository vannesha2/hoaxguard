import { Navigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase";

function Profile() {

  const user =
    JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleResetPassword = async () => {

    try {

      await sendPasswordResetEmail(
        auth,
        user.email
      );

      alert(
        "Email reset password berhasil dikirim."
      );

    } catch (error) {

      alert(error.message);

    }

  };

  return (

    <div className="px-8 py-12">

      <div className="max-w-2xl mx-auto">

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h1 className="text-3xl font-bold text-blue-800">

            Akun Saya

          </h1>

          <div className="mt-8">

            <p className="text-gray-500">
              Nama Pengguna
            </p>

            <p className="text-xl font-semibold">
              {user.name}
            </p>

          </div>

          <div className="mt-6">

            <p className="text-gray-500">
              Email
            </p>

            <p className="text-lg">
              {user.email}
            </p>

          </div>

          <button
            onClick={handleResetPassword}
            className="mt-8 bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl"
          >
            Ganti Password
          </button>

        </div>

      </div>

    </div>

  );
}

export default Profile;