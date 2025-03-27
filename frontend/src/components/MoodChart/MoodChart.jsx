import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function MoodChart({ moodData }) {
  const ratings = [1, 2, 3, 4, 5];
  const counts = ratings.map(
    (rating) => moodData.filter((mood) => mood.starRating === rating).length
  );

  const data = {
    labels: [
      "Very Negative",
      "Negative",
      "Neutral",
      "Positive",
      "Very Positive",
    ],
    datasets: [
      {
        label: "Mood Distribution",
        data: counts,
        backgroundColor: [
          "rgba(239, 68, 68, 0.5)", // red
          "rgba(251, 146, 60, 0.5)", // orange
          "rgba(250, 204, 21, 0.5)", // yellow
          "rgba(34, 197, 94, 0.5)", // green
          "rgba(59, 130, 246, 0.5)", // blue
        ],
        borderColor: [
          "rgb(239, 68, 68)",
          "rgb(251, 146, 60)",
          "rgb(250, 204, 21)",
          "rgb(34, 197, 94)",
          "rgb(59, 130, 246)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Mood Distribution",
        color: "white",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      x: {
        ticks: {
          color: "white",
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="w-full h-[300px] p-4 bg-gray-700 rounded-lg">
      <Bar data={data} options={options} />
    </div>
  );
}
