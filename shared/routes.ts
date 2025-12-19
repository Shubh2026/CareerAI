import { z } from 'zod';
import { userProfileSchema, analysisResults } from './schema';

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
      method: 'POST' as const,
      path: '/api/analyze',
      input: userProfileSchema,
      responses: {
        201: z.custom<typeof analysisResults.$inferSelect>(), // Returns the DB record
        400: errorSchemas.validation,
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/analyze/:id',
      responses: {
        200: z.custom<typeof analysisResults.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
