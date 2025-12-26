/**
 * Temporary in-memory storage
 * (used while Firebase-only setup is active)
 */

let memoryStore = [];
let currentId = 1;

class MemoryStorage {
  async createAnalysis(userInfo, aiResponse) {
    const result = {
      id: currentId++,
      userInfo,
      aiResponse,
      createdAt: new Date(),
    };

    memoryStore.push(result);
    return result;
  }

  async getAnalysis(id) {
    return memoryStore.find((item) => item.id === id);
  }
}

export const storage = new MemoryStorage();
