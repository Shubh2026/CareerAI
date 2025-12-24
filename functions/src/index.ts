import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/analyze", (req, res) => {
  console.log("ANALYZE CALLED", req.body);

  res.json({
    success: true,
    message: "Firebase Functions backend is working",
    received: req.body,
    careerFitScore: 88,
    recommendedCareers: [
      {
        title: "Software Engineer",
        matchPercentage: 88,
        reasoning: "Mock response from Firebase Functions",
      },
    ],
  });
});

export const api = functions.https.onRequest(app);
