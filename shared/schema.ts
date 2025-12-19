import { pgTable, text, serial, integer, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===
export const analysisResults = pgTable("analysis_results", {
  id: serial("id").primaryKey(),
  userInfo: jsonb("user_info").notNull(), // Storing the full input profile
  aiResponse: jsonb("ai_response").notNull(), // Storing the full AI output
  createdAt: timestamp("created_at").defaultNow(),
});

// === SCHEMAS ===

// 1. Profile Input Schema (What the user fills out)
export const userProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  currentStatus: z.enum(["Student", "Beginner", "Working Professional"]),
  yearsExperience: z.string(), // e.g., "0-1", "1-3", "3-5", "5+"
  interests: z.array(z.string()).min(1, "Select at least one interest"),
  skills: z.string().min(1, "List at least one skill"),
  confidence: z.number().min(1).max(5),
  goal: z.enum(["Job", "Internship", "Upskilling"]),
});

export type UserProfile = z.infer<typeof userProfileSchema>;

// 2. AI Response Schema (Strict Structure from Spec)
export const aiResponseSchema = z.object({
  profileSummary: z.string(),
  careerFitScore: z.number(),
  recommendedCareers: z.array(z.object({
    title: z.string(),
    matchPercentage: z.number(),
    reasoning: z.string(),
    marketDemand: z.string(),
    salaryIndia: z.string(),
  })),
  skillsGap: z.object({
    strengths: z.array(z.string()),
    needsImprovement: z.array(z.string()),
    missingCritical: z.array(z.string()),
  }),
  roadmap: z.array(z.object({
    phase: z.string(),
    timeline: z.string(),
    focus: z.array(z.string()),
    outcome: z.string(),
  })),
  nextAction: z.string(),
});

export type AiResponse = z.infer<typeof aiResponseSchema>;

// 3. Database Type
export type AnalysisResult = typeof analysisResults.$inferSelect;
