import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import type { UserProfile, AnalysisResult } from "@shared/schema";
import { useLocation } from "wouter";



export function useAnalysis() {
  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      const res = await fetch(`http://localhost:5000${api.analysis.create.path}`, {
        method: api.analysis.create.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });

      if (!res.ok) {
        throw new Error("Failed to generate analysis");
      }

      return await res.json();
    },

    onSuccess: (result) => {
      // persist for Results page
      localStorage.setItem("analysis_result", JSON.stringify(result));
    },
  });
}
