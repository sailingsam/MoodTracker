import { useState, useEffect } from "react";

export default function MoodForm({ onSubmit, isLoading }) {
  const [moodData, setMoodData] = useState({
    text: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    // Check if speech recognition is supported
    if ("webkitSpeechRecognition" in window) {
      setSpeechSupported(true);
      // eslint-disable-next-line no-undef
      const recognitionInstance = new webkitSpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;

      recognitionInstance.onresult = (event) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setMoodData((prev) => ({
          ...prev,
          text: transcript,
        }));
      };

      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMoodData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(moodData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-2">
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-300"
        >
          Date
        </label>
        <input
          type="date"
          id="date"
          max={new Date().toISOString().split("T")[0]}
          name="date"
          value={moodData.date}
          onChange={handleChange}
          className="mt-1 block w-64 px-4 py-2 rounded-lg border-2 border-gray-600 
                   bg-gray-700 text-white shadow-sm 
                   focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 
                   focus:ring-opacity-50 transition duration-200 ease-in-out
                   hover:bg-gray-600"
          required
        />
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label
            htmlFor="text"
            className="block text-sm font-medium text-gray-300"
          >
            How are you feeling?
          </label>
          {speechSupported && (
            <button
              type="button"
              onClick={toggleListening}
              className={`inline-flex items-center px-4 py-2 rounded-lg text-sm 
                        font-medium shadow-sm ${
                          isListening
                            ? "bg-red-600 hover:bg-red-700 text-white"
                            : "bg-indigo-600 hover:bg-indigo-700 text-white"
                        } transition-colors duration-200 focus:outline-none focus:ring-2 
                focus:ring-offset-2 focus:ring-offset-gray-800`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 mr-2 ${isListening ? "animate-pulse" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
              {isListening ? "Stop Recording" : "Start Recording"}
            </button>
          )}
        </div>
        <div className="relative">
          <textarea
            id="text"
            name="text"
            value={moodData.text}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full px-4 py-3 rounded-lg border-2 border-gray-600 
                     bg-gray-700 text-white shadow-sm 
                     focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 
                     focus:ring-opacity-50 transition duration-200 ease-in-out resize-none
                     hover:bg-gray-600 placeholder-gray-400"
            placeholder={
              isListening ? "Listening... Speak now!" : "Describe your mood..."
            }
            required
          />
          {isListening && (
            <div className="absolute top-3 right-3">
              <span className="flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
              </span>
            </div>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-indigo-600 text-white py-4 px-6 rounded-lg 
                 font-medium text-base shadow-md hover:bg-indigo-700 
                 focus:outline-none focus:ring-2 focus:ring-indigo-500 
                 focus:ring-offset-2 focus:ring-offset-gray-800 
                 transition duration-200 ease-in-out
                 disabled:opacity-50 disabled:cursor-not-allowed
                 hover:shadow-lg transform hover:-translate-y-0.5"
      >
        {isLoading ? "Saving..." : "Record Mood"}
      </button>
    </form>
  );
}
