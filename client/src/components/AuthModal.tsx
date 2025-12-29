"use client";

import { signInWithGoogle, signInAsGuest, logout } from "@/lib/firebaseAuth";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

type AuthModalProps = {
  onClose: () => void;
};

export default function AuthModal({ onClose }: AuthModalProps) {
  const { toast } = useToast();
const [loggingOut, setLoggingOut] = useState(false);
  const handleGoogleSignIn = async () => {
    await signInWithGoogle();

    toast({
      title: "Signed in successfully",
      description: "Welcome to CareerAI",
    });

    onClose(); // stay on home
  };

  const handleGuest = async () => {
    await signInAsGuest();

    toast({
      title: "Guest mode",
      description: "Exploring as guest",
    });

    onClose();

    // ✅ simple, reliable navigation
    window.location.href = "/analyze";
  };

const handleLogout = async () => {
  setLoggingOut(true);

  await logout();

  toast({
    title: "Logged out",
    description: "You have been signed out successfully",
  });

  setUser(null);          // final state
  setLoggingOut(false);   // unlock UI
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl bg-[#0f1220] border border-white/10 p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-white/50 hover:text-white"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold text-white text-center">
          Sign In
        </h2>

        {/* Google */}
        <button
          onClick={handleGoogleSignIn}
          className="mt-6 w-full flex items-center justify-center gap-3 rounded-lg border border-white/15 bg-white/5 py-3 text-white hover:bg-white/10 transition"
        >
          <img src="/google.svg" className="h-5 w-5" />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-white/40">or</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Guest */}
        <button
          onClick={handleGuest}
          className="w-full rounded-lg py-2.5 text-white/70 hover:text-white transition"
        >
          Continue as Guest
        </button>

        <div className="mt-6 text-xs text-white/40 text-center">
          🔒 Authentication powered by <b>Firebase</b> (Google Cloud)
        </div>
      </div>
    </div>
  );
}
function setUser(arg0: null) {
  throw new Error("Function not implemented.");
}

