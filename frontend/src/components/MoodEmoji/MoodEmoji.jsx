export default function MoodEmoji({ rating }) {
  const getMoodInfo = (rating) => {
    switch (rating) {
      case 5:
        return { emoji: "😄", text: "Very Happy" };
      case 4:
        return { emoji: "🙂", text: "Happy" };
      case 3:
        return { emoji: "😐", text: "Neutral" };
      case 2:
        return { emoji: "🙁", text: "Sad" };
      case 1:
        return { emoji: "😢", text: "Very Sad" };
      default:
        return { emoji: "❓", text: "Unknown" };
    }
  };

  const { emoji } = getMoodInfo(rating);

  return (
    <div className="inline-flex items-center gap-2">
      <span className="text-2xl">{emoji}</span>
    </div>
  );
}
