import { db } from "./db";
import {
  analysisResults,
  type UserProfile,
  type AiResponse,
  type AnalysisResult
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  createAnalysis(userInfo: UserProfile, aiResponse: AiResponse): Promise<AnalysisResult>;
  getAnalysis(id: number): Promise<AnalysisResult | undefined>;
}

export class DatabaseStorage implements IStorage {
  async createAnalysis(userInfo: UserProfile, aiResponse: AiResponse): Promise<AnalysisResult> {
    const [result] = await db.insert(analysisResults).values({
      userInfo,
      aiResponse,
    }).returning();
    return result;
  }

  async getAnalysis(id: number): Promise<AnalysisResult | undefined> {
    const [result] = await db.select().from(analysisResults).where(eq(analysisResults.id, id));
    return result;
  }
}

export const storage = new DatabaseStorage();
