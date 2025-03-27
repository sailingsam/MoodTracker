import { db } from "../config/firebase.js";
import { pipeline } from "@xenova/transformers";
import admin from "firebase-admin";

// Initialize the sentiment analysis pipeline
let sentimentPipeline = null;

// Initialize the pipeline
const initializePipeline = async () => {
  if (!sentimentPipeline) {
    console.log("Initializing sentiment pipeline...");
    sentimentPipeline = await pipeline(
      "sentiment-analysis",
      "Xenova/bert-base-multilingual-uncased-sentiment"
    );
    console.log("Pipeline initialized successfully");
  }
};

export const moodController = {
  // Analyze mood and store in Firebase
  analyzeMood: async (req, res) => {
    try {
      const { text, date } = req.body;
      const userId = req.user.uid;

      // Validate inputs
      if (!text?.trim()) {
        return res.status(400).json({
          error: "text is required",
          message: "Please provide some text to analyze",
        });
      }

      if (!date) {
        return res.status(400).json({
          error: "date is required",
          message: "Please provide a date for the mood entry",
        });
      }

      // Initialize pipeline if not already initialized
      await initializePipeline();
      console.log("Running sentiment analysis on:", text);

      // Analyze the mood
      const result = await sentimentPipeline(text);
      console.log("Sentiment analysis result:", result);

      const starRating = parseInt(result[0].label.split(" ")[0]);
      console.log("Star rating:", starRating);

      // Create the mood entry
      const moodEntry = {
        userId,
        starRating,
        date: new Date(date),
      };
      console.log("Mood entry:", moodEntry);

      const querySnapshot = await db
        .collection("mood_logs")
        .where("userId", "==", userId)
        .where("date", "==", new Date(date))
        .get();

      if (querySnapshot.empty) {
        const docRef = await db.collection("mood_logs").add(moodEntry);

        return res.status(201).json({
          message: "Mood entry created successfully",
          data: moodEntry,
          id: docRef.id,
          status: "created",
        });
      } else {
        await db
          .collection("mood_logs")
          .doc(querySnapshot.docs[0].id)
          .update(moodEntry);

        return res.status(200).json({
          message: "Mood entry updated successfully",
          data: moodEntry,
          id: querySnapshot.docs[0].id,
          status: "updated",
        });
      }
    } catch (error) {
      console.error("Error analyzing mood:", error);
      return res.status(500).json({
        error: "Failed to analyze mood",
        message: error.message,
      });
    }
  },

  getMoodHistory: async (req, res) => {
    try {
      const userId = req.user.uid;

      if (!userId) {
        return res.status(401).json({
          error: "Unauthorized",
          message: "User authentication required",
        });
      }

      // Just fetch all documents and sort them client-side for now
      const querySnapshot = await db
        .collection("mood_logs")
        .where("userId", "==", userId)
        .orderBy("date", "desc")
        .get();

      // Process without date filtering
      const moodHistory = querySnapshot.docs
        .map((doc) => {
          const data = doc.data();

          return {
            id: doc.id,
            ...data,
            date: data.date?.toDate() || null,
            lastUpdated: data.lastUpdated?.toDate() || null,
          };
        })
        .filter((entry) => entry.date !== null);

      return res.status(200).json({
        message: "Mood history retrieved successfully",
        data: moodHistory,
      });
    } catch (error) {
      console.error("Error fetching mood history:", error);
      return res.status(500).json({
        error: "Failed to fetch mood history",
        message: error.message,
      });
    }
  },

  // Test endpoint
  test: async (req, res) => {
    try {
      await initializePipeline();
      const result = await sentimentPipeline(
        "I am feeling really happy today!"
      );
      return res.status(200).json({ result });
    } catch (error) {
      console.error("Test error:", error);
      return res.status(500).json({
        error: "Test failed",
        message: error.message,
      });
    }
  },
};
