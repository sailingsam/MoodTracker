import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  const { currentUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-lg shadow-lg">
        <div>
          <h1 className="text-3xl font-bold text-center text-white">
            Mood Tracker
          </h1>
          <p className="mt-2 text-center text-gray-300">
            Track your mood and get personalized recommendations
          </p>
        </div>

        <button
          onClick={signInWithGoogle}
          className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign in with Google
        </button>

        <div className="mt-6 text-center text-sm text-gray-300">
          <p>Sign in to get started on your wellness journey</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
