import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import type { UserProfile, AnalysisResult } from "@shared/schema";
import { useLocation } from "wouter";

export function useAnalysis(id?: number) {
  return useQuery({
    queryKey: [api.analysis.get.path, id],
    queryFn: async () => {
      if (!id) return null;
      const url = buildUrl(api.analysis.get.path, { id });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch analysis");
      // Validate with schema on receive
      return api.analysis.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}

export function useCreateAnalysis() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UserProfile) => {
      // Validate input before sending
      const validated = api.analysis.create.input.parse(data);
      
      const res = await fetch(api.analysis.create.path, {
        method: api.analysis.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.analysis.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to create analysis");
      }

      return api.analysis.create.responses[201].parse(await res.json());
    },
    onSuccess: (data) => {
      // Invalidate queries if we had a list, but here we just redirect
      setLocation(`/results/${data.id}`);
    },
  });
}
