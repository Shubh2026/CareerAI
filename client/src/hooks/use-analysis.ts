import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import type { UserProfile } from "@shared/schema";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { queryClient } from "@/lib/queryClient";

export function useAnalysis() {
  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      const res = await fetch(
        api.analysis.create.path,
        {
          method: api.analysis.create.method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profile),
        }
      );

      if (!res.ok) throw new Error("Failed to generate analysis");

      return res.json();
    },

    onSuccess: async (result) => {
      localStorage.setItem("analysis_result", JSON.stringify(result));
      queryClient.setQueryData(["analysis-result"], result);

      // Firestore persistence
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
    },
  });
}
