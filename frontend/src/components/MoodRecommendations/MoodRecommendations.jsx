export default function MoodRecommendations({ latestMood }) {
  const getRecommendations = (rating) => {
    switch (rating) {
      case 1: // Very Negative
        return {
          title: "Take Care of Yourself",
          activities: [
            {
              icon: "🧘‍♂️",
              text: "5-minute breathing exercise",
              action: "Try now",
            },
            {
              icon: "🎵",
              text: "Listen to calming music",
              action: "Play playlist",
            },
            {
              icon: "📝",
              text: "Write down your thoughts",
              action: "Start journaling",
            },
          ],
        };
      case 2: // Negative
        return {
          title: "Lift Your Spirits",
          activities: [
            {
              icon: "🚶‍♂️",
              text: "Take a short walk",
              action: "Get started",
            },
            {
              icon: "☀️",
              text: "Practice gratitude",
              action: "Write 3 things",
            },
          ],
        };
      case 3: // Neutral
        return {
          title: "Boost Your Mood",
          activities: [
            {
              icon: "💪",
              text: "Quick exercise routine",
              action: "Start workout",
            },
            {
              icon: "🎨",
              text: "Try creative activity",
              action: "Explore ideas",
            },
          ],
        };
      case 4: // Positive
        return {
          title: "Keep It Going!",
          activities: [
            {
              icon: "🎯",
              text: "Set a goal for today",
              action: "Set goal",
            },
            {
              icon: "🤝",
              text: "Share positivity",
              action: "Connect",
            },
          ],
        };
      case 5: // Very Positive
        return {
          title: "Wonderful!",
          activities: [
            {
              icon: "📸",
              text: "Capture this moment",
              action: "Take note",
            },
            {
              icon: "🌟",
              text: "Plan something exciting",
              action: "Start planning",
            },
          ],
        };
      default:
        return {
          title: "Daily Wellness",
          activities: [
            {
              icon: "🎯",
              text: "Set your first mood entry",
              action: "Start now",
            },
          ],
        };
    }
  };

  const recommendations = getRecommendations(latestMood?.starRating);

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-medium text-gray-200">
        {recommendations.title}
      </h4>
      <div className="grid gap-4">
        {recommendations.activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gray-700/50 
                     rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            <div className="flex items-center space-x-4">
              <span className="text-2xl">{activity.icon}</span>
              <span className="text-gray-300">{activity.text}</span>
            </div>
            <button
              className="px-4 py-2 text-sm font-medium text-indigo-400 
                       hover:text-indigo-300 transition-colors duration-200"
            >
              {activity.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
