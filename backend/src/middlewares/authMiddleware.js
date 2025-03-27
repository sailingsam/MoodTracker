import { auth } from "../config/firebase.js";

export const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "No token provided",
      });
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.split("Bearer ")[1];

    try {
      // Verify token using Firebase Admin SDK
      const decodedToken = await auth.verifyIdToken(token);

      // Add user data to request object
      req.user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
        name: decodedToken.name,
        picture: decodedToken.picture,
      };

      next();
    } catch (error) {
      console.error("Token verification failed:", error);
      return res.status(403).json({
        error: "Forbidden",
        message: "Invalid token",
      });
    }
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "Authentication failed",
    });
  }
};
