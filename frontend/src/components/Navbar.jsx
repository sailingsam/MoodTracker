import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">Mood Tracker</h1>
        <div className="flex items-center">
          <span className="text-gray-300 mr-4">{currentUser.displayName}</span>
          <img
            src={currentUser.photoURL}
            alt="Profile"
            className="h-8 w-8 rounded-full border-2 border-indigo-500"
          />
          <button
            onClick={handleLogout}
            className="ml-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded text-sm"
          >
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
