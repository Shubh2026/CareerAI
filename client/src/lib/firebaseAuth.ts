// src/lib/firebaseAuth.ts
import app from "./firebase";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously,
  signOut,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";

export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

// 🔐 SESSION-ONLY login
const ensureSessionPersistence = async () => {
  await setPersistence(auth, browserSessionPersistence);
};

export const signInWithGoogle = async () => {
  await ensureSessionPersistence();
  await signInWithPopup(auth, provider);
};

export const signInAsGuest = async () => {
  await ensureSessionPersistence();
  await signInAnonymously(auth);
};

export const logout = async () => {
  await signOut(auth);
};
