import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import MoodForm from "../components/MoodForm/MoodForm";
import DashboardCard from "../components/DashboardCard/DashboardCard";
import MoodCalendar from "../components/MoodCalendar/MoodCalendar";
import MoodChart from "../components/MoodChart/MoodChart";
import MoodRecommendations from "../components/MoodRecommendations/MoodRecommendations";
import { moodService } from "../services/moodService";

function Dashboard() {
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);

  useEffect(() => {
    fetchMoodHistory();
  }, []);

  const fetchMoodHistory = async () => {
    try {
      const token = await currentUser.getIdToken();
      const response = await moodService.getMoodHistory(token);
      setMoodHistory(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleMoodSubmit = async (moodData) => {
    setIsLoading(true);
    setError(null);

    try {
      const token = await currentUser.getIdToken();
      await moodService.analyzeMood(moodData, token);
      await fetchMoodHistory(); // Refresh mood history
      alert("Mood logged successfully!");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getLatestMood = () => {
    if (!moodHistory.length) return null;
    return moodHistory.reduce((latest, current) => {
      return new Date(current.date) > new Date(latest.date) ? current : latest;
    });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
          <h2 className="text-2xl font-bold text-white">
            Welcome to your Dashboard
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DashboardCard title="Let's log your mood for particular day">
              <MoodForm onSubmit={handleMoodSubmit} isLoading={isLoading} />
              {error && (
                <div className="text-red-400 text-sm mt-4">{error}</div>
              )}
            </DashboardCard>

            <DashboardCard title="Recommendations - Based on your latest mood">
              <MoodRecommendations latestMood={getLatestMood()} />
            </DashboardCard>

            <DashboardCard title="Mood Calendar">
              <MoodCalendar moodData={moodHistory} />
            </DashboardCard>

            <DashboardCard title="Mood Analytics">
              <MoodChart moodData={moodHistory} />
            </DashboardCard>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
