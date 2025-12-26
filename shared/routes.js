import { z } from "zod";

/**
 * Runtime-safe API contract for Node.js
 * (No TypeScript, no aliases)
 */

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  analysis: {
    create: {
      method: "POST",
      path: "/api/analyze",
      input: z.object({
        name: z.string(),
        currentStatus: z.string(),
        yearsExperience: z.string(),
        interests: z.array(z.string()),
        skills: z.string(),
        confidence: z.number(),
        goal: z.string(),
      }),
    },
    get: {
      method: "GET",
      path: "/api/analyze/:id",
    },
  },
};

/**
 * Simple runtime URL builder
 */
export function buildUrl(path, params = {}) {
  let url = path;
  for (const [key, value] of Object.entries(params)) {
    url = url.replace(`:${key}`, String(value));
  }
  return url;
}
