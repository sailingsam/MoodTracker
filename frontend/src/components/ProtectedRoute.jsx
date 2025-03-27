import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute({ children }) {
  const { currentUser, loadingUserData } = useAuth();

  if (loadingUserData)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        Loading...
      </div>
    );

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
