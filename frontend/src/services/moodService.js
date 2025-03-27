const API_URL = import.meta.env.VITE_API_URL;

export const moodService = {
  async analyzeMood(moodData, token) {
    const response = await fetch(`${API_URL}/moods/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(moodData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to save mood");
    }
    return data;
  },

  async getMoodHistory(token) {
    const response = await fetch(`${API_URL}/moods/history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch mood history");
    }
    return data;
  },
};
