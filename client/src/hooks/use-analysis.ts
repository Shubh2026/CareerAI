import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import type { UserProfile, AnalysisResult } from "@shared/schema";
import { useLocation } from "wouter";

import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export function useAnalysis() {
  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      const res = await fetch(api.analysis.create.path, {
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

    onSuccess: async (result) => {
  localStorage.setItem("analysis_result", JSON.stringify(result));

  const user = auth.currentUser;
  if (!user) return;

  await setDoc(
    doc(db, "analyses", `${user.uid}_${Date.now()}`),
    {
      uid: user.uid,
      result,
      createdAt: serverTimestamp(),
    }
  );
}}  );
}