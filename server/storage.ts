import {
  type UserProfile,
  type AiResponse,
  type AnalysisResult,
} from "@shared/schema";

/**
 * Temporary in-memory storage
 * (used while Firebase-only setup is active)
 */

export interface IStorage {
  createAnalysis(
    userInfo: UserProfile,
    aiResponse: AiResponse
  ): Promise<AnalysisResult>;
  getAnalysis(id: number): Promise<AnalysisResult | undefined>;
}

let memoryStore: AnalysisResult[] = [];
let currentId = 1;

export class MemoryStorage implements IStorage {
  async createAnalysis(
    userInfo: UserProfile,
    aiResponse: AiResponse
  ): Promise<AnalysisResult> {
    const result: AnalysisResult = {
      id: currentId++,
      userInfo,
      aiResponse,
      createdAt: new Date(),
    };

    memoryStore.push(result);
    return result;
  }

  async getAnalysis(id: number): Promise<AnalysisResult | undefined> {
    return memoryStore.find((item) => item.id === id);
  }
}

export const storage = new MemoryStorage();
