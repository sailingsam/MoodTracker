import { Calendar } from "react-calendar";
import MoodEmoji from "../MoodEmoji/MoodEmoji";
import "react-calendar/dist/Calendar.css";

export default function MoodCalendar({ moodData }) {
  const getMoodForDate = (date) => {
    return moodData.find(
      (mood) => new Date(mood.date).toDateString() === date.toDateString()
    );
  };

  const tileContent = ({ date }) => {
    const mood = getMoodForDate(date);
    if (!mood) return null;

    return (
      <div className="mood-tile">
        <MoodEmoji rating={mood.starRating} />
      </div>
    );
  };

  return (
    <div className="mood-calendar w-full flex items-center justify-between">
      <Calendar
        tileContent={tileContent}
        className="rounded-lg bg-gray-700 p-4"
      />
      <div className="mt-4 flex flex-col gap-4 justify-center text-gray-300 text-sm mr-6">
        <div className="flex items-center gap-2">
          <MoodEmoji rating={5} />
          <span>Very Happy</span>
        </div>
        <div className="flex items-center gap-2">
          <MoodEmoji rating={4} />
          <span>Happy</span>
        </div>
        <div className="flex items-center gap-2">
          <MoodEmoji rating={3} />
          <span>Neutral</span>
        </div>
        <div className="flex items-center gap-2">
          <MoodEmoji rating={2} />
          <span>Sad</span>
        </div>
        <div className="flex items-center gap-2">
          <MoodEmoji rating={1} />
          <span>Very Sad</span>
        </div>
      </div>
    </div>
  );
}
